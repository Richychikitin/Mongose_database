const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URL);

client
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const db = client.db(process.env.DATABASE);

module.exports = db;