import mariadb from "mariadb";
import "dotenv/config";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
});

const conn = await pool.getConnection();
console.log(`Terhubung ke basis data (${process.env.DB_NAME})`);

export default conn;
