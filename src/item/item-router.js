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

itemsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ItemsService.getAllItems(knexInstance)
      .then((items) => {
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
        res.status(201).location(`/item/${items.id}`).json(items);
      })
      .catch(next);
  });

  itemsRouter.route("/by_user").get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");
    ItemsService.getAllItemsByUser(knexInstance, req.user.id)
      .then((items) => {
        res.status(200).json(items.map(serializeItem));
      })
      .catch(next);
  });
  
  // EACH ITEM
  itemsRouter
    .route("/:id")
    .all((req, res, next) => {
      const { id } = req.params
      const knexInstance = req.app.get("db");
      ItemsService.getById(knexInstance, id)
        .then((item) => {
        res.status(200).json(item);
        next();
        })
      //   .catch(next)
        
 })
    .patch(jsonParser, requireAuth, (req, res) => {
      const updatedItem = {
        owner_id: req.user.id,
        items: req.user.items,
        full_price: req.user.full_price
      };
  
      ItemsService.updateItem(
        req.app.get("db"),
        req.params.id,
        updatedItem
      ).then((item) => res.status(200).json(serializeItem(item)));
    });

 module.exports = itemsRouter;
    
