const { JWT_SECRET } = require("../src/config");

const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return (users = [
    {
      id: 1,
      first_name: "Thinkful",
      last_name: "Studen",
      email: "thinkful@fakestudent.email.com",
      password: "password",
    },
  ]);
}

function makeItemsArray() {
  return (items = [
    {
      id: 1,
      vendor: "Kroger",
      items: "Bananas",
      full_price: "$1.99"
    },
    {
      id: 2,
      vendor: "Game Stop",
      items: "GTA V",
      full_price: "$69.99"
    },
  ]);
}

function makeItemsFixtures() {
  const testUsers = makeUsersArray();
  const testItems = makeItemsArray();
  return { testUsers, testItems };
}

function seedUsers(db, testUsers) {
  return db.into("users").insert(testUsers);
}

function seedItems(db, testItems) {
  return db.into("help_items").insert(testItems);
}

function seedTables(db, testUsers, testItems) {
  return db.transaction(async (trx) => {
    await seedUsers(trx, testUsers);
    await seedItems(trx, testItems);
  });
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx.raw(
      `TRUNCATE
        users,
        help_items
      RESTART IDENTITY`
    )
  );
}

function makeBearerToken(testUser) {
  const token = jwt.sign({ user_id: testUser.id }, process.env.JWT_SECRET, {
    subject: testUser.email,
  });
  return token;
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ["HS256"],
  });
}

module.exports = {
  makeUsersArray,
  makeItemsArray,
  makeItemsFixtures,

  seedUsers,
  seedItems,
  seedTables,

  cleanTables,
  makeBearerToken,
  verifyJwt,
};
