import pg from "pg";
import dotEnv from "dotenv";
import { v4 as uuidv4 } from 'uuid'
dotEnv.config();


const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgres://u3lpng759h87ju:pb4bbc996e8da7006b53f469c4bae575523fcc937ffff54e66b5905545f749992@cbdhrtd93854d5.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d26c2qlbhpcaav',
  ssl: {
    rejectUnauthorized: false,
  },
});


export async function findUser(username, password) {
  try {
    let { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    return rows[0];
  }
  catch (e) { return {} }
}

export async function createUser(username, password) {
  try {
    let { rows } = await pool.query(
      "INSERT into users(user_id, username, password) VALUES($1, $2, $3) RETURNING *", [uuidv4(), username, password])
    return rows[0]
  }
  catch (e) { return {} }
}

export async function logRequest(req) {
  const userAgent = req.get('User-Agent');
  const ip = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();
  const referrer = req.get('Referrer') || req.get('Referer');
  const isAuthenticated = req.isAuthenticated ? req.isAuthenticated() : false;
  const sessionId = req.session ? req.session.id : null;

  try {
    await pool.query(`INSERT INTO logs 
      (user_agent, ip_address, request_method, request_url, timestamp, referrer, is_authenticated, session_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [userAgent, ip, method, url, timestamp, referrer, isAuthenticated, sessionId])
  }
  catch (e) {
    console.log('Error writing to log', e)
  }


}