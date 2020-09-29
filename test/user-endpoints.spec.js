const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");
const supertest = require("supertest");
const { seedTables } = require("./test-helpers");

describe("Items Endpoints", () => {
  let db;

  const { testUsers, testItems } = helpers.makeItemsFixtures();

  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET /users", () => {
    context("given users", () => {
      const bearerToken = helpers.makeBearerToken(testUser);
      beforeEach("insert users", () => {
        helpers.seedTables(db, testUsers, testItems);
      });
      it("should return an array of items", () => {
        return supertest(app)
          .get("/users")
          .set("Authorization", `Bearer ${bearerToken}`)
          .expect(200);
      });
    });
  });
});