const { Client } = require("knex");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../../../.env" });

// console.log(process.env.DB_URL);
module.exports = {
  client: "pg",
  connection: process.env.DB_URL, //"postgres://postgres:1234@localhost:5432/arquitetura",
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    min: 2,
    max: 10,
  },
};
