const { Client } = require("knex");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../../../.env" });
//dotenv.config({ path: "./.env" });

// console.log("CONEXAO", process.env.DB_URL);
// console.log(
//   "===================================================================="
// );
module.exports = {
  client: "pg",
  connection: "postgres://postgres:1234@localhost:5432/arquitetura",
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    min: 2,
    max: 10,
  },
};
