const app = require('./app')
const knex = require("knex");
const { PORT, NODE_ENV, DATABASE_URL } = require('./config')

// const PORT = process.env.PORT || 8000

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);
app.set("port", PORT);

app.listen(PORT, () => {
  console.log(`Server listening in ${NODE_ENV} at http://localhost:${PORT}`)
})