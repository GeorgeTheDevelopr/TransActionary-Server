const ItemsService = {
  getAllItems(db) {
    return db.from("items").select("*");
  },

  getAllItemsByUser(db, userID) {
    return db.from("items").select("*").where("owner_id", userID);
  },

  getById(db, id) {
    return db.from("items").select("*").where("id", id).first()
  },

  createItem(db, newItem) {
    return db
      .insert(newItem)
      .into("items")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  updateItem(db, id, updateItem) {
    return db("items")
      .where({ id })
      .update(updateItem)
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = ItemsService;
