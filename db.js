import pg from "pg";
import dotEnv from "dotenv";
dotEnv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Only use this if you trust the server
  },
});


const query = (text, params) => pool.query(text, params)
export default query;