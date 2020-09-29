const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");
const supertest = require("supertest");

describe("Protected Endpoints", () => {
  let db;

  const { testUsers, testTickets } = helpers.makeTicketsFixtures();

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

  const protectedEndpoints = [
    {
      path: "/",
      method: supertest(app).post,
      describe: "GET /",
    },
    {
      path: "/items",
      method: supertest(app).post,
      describe: "POST /items",
    },
    {
      path: "/:id",
      method: supertest(app).get,
      describe: "GET /items/:id",
    },
  ];

  protectedEndpoints.forEach((pe) => {
    describe(pe.describe, () => {
      context("with no bearer token", () => {
        it("should return 401 {'error':'Missing bearer token'}", () => {
          return pe
            .method(pe.path)
            .expect(401, { error: "Missing bearer token" });
        });
      });
      context("with invalid bearer token", () => {
        const tokenInvalid = "invalidTOKEN";
        it("should return 401 {'error':'Unauthorized request'}", () => {
          return pe
            .method(pe.path)
            .set({ Authorization: `bearer ${tokenInvalid}` })
            .expect(401, { error: "Unauthorized request" });
        });
      });
    });
  });
});
