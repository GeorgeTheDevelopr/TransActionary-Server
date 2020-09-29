const express = require("express");
const xss = require("xss");
const { requireAuth } = require("../middleware/jwt-auth");

const ItemsService = require("./item-service");
const itemsRouter = express.Router();
const jsonParser = express.json();

const serializeItem = (items) => ({
  id: items.id,
  vendor: xss(items.vendor),
  items: xss(items.items),
  fullPrice: xss(items.full_price),
  altId: items.alt_id,
  altId2: items.alt_id2,
  ownerId: items.owner_id
});

// Root
itemsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ItemsService.getAllItems(knexInstance)
      .then((items) => {
        if (!items) {
          return res.status(404).json({
            error: {message: `Items doesn't exist` }
          })
        }
        res.status(200).json(items.map(serializeItem));
      })
      .catch(next);
  })
  .post(jsonParser, requireAuth, (req, res, next) => {
    const { vendor, items, full_price } = req.body;
    const newItem = {
      owner_id: req.user.id,
      vendor,
      items,
      full_price,
    };

    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

      ItemsService.createItem(req.app.get("db"), newItem)
        .then((items) => {
          res.status(201).location(`/items/${items.id}`).json(items);
        })
        .catch(next);
  });
  
  // By ID
  itemsRouter
    .route("/:id")
    .all((req, res, next) => {
      const { id } = req.params
      const knexInstance = req.app.get("db");
      
      ItemsService.getById(knexInstance, id)
        .then((item) => {
          if (!item) {
            return res.status(404).json({
              error: {message: `Item doesn't exist` }
            })
          }
        res.status(200).json(item);
        next();
        })
        .catch(next)       
    })

    .delete((req, res, next) => {
      const { id } = req.params
      const knexInstance = req.app.get('db')

      ItemsService.deleteItem(knexInstance, id)
        .then(() => {
          res.status(204)
          next();
          })
      });

 module.exports = itemsRouter;
    
