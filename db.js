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


export async function logRouteTime(req, res) {
  const start = Date.now()
  res.on('finish', async () => {
    const end = Date.now()
    try {
      await pool.query(`INSERT INTO route_stats
        (method, url, ms )
        VALUES ($1, $2, $3)`, [req.method, req.originalUrl, end - start])
    }
    catch (e) {
      console.log('Error writing to log', e)
    }
  })
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

export async function insertPost(userId, title, text, tags) {
  try {
    await pool.query(`INSERT INTO posts 
      (post_id, user_id, title, text, tags, timestamp)
      VALUES ($1, $2, $3, $4, $5, $6)`, [uuidv4(), userId, title, text, tags.map(tag=>tag.trim()), new Date().toLocaleString()])
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}

export async function getPostById(postId) {
  try {
    const res = await pool.query(` SELECT 
    u.user_id,
    u.username,
    p.post_id,
    p.title,
    p.text,
    p.tags,
    p.timestamp
FROM 
    users AS u
JOIN 
    posts AS p ON u.user_id = p.user_id
WHERE 
    p.post_id = $1`, [postId])
    return res.rows[0]
  }
  catch (e) {
    console.log(e)
    return {}
  }
}

export async function getAllPosts() {
  try {
    const res = await pool.query(`SELECT 
    u.user_id,
    u.username,
    p.post_id,
    p.title,
    p.text,
    p.tags,
    p.timestamp
FROM 
    users AS u
JOIN 
    posts AS p ON u.user_id = p.user_id;`, [])
    return res.rows
  }
  catch (e) {
    console.log(e)
    return []
  }
}

export async function getUsers(params) {
  try {
    const res = await pool.query("SELECT user_id, username FROM users", [])
    return res.rows
  }
  catch (e) {
    return []
  }
}

export async function getCommentsByPostId(id) {
  try {
    const res = await pool.query(`SELECT 
    c.comment_id,
    c.text,
    c.timestamp,
    c.user_id,
    u.username
FROM 
    comments c
JOIN 
    users u ON u.user_id = c.user_id
WHERE 
    c.post_id = $1;`, [id])
    return res.rows
  }
  catch (e) {
    console.log(e)
    return []
  }
}

export async function insertComment(userId, postId, text) {
  try {
    await pool.query(`INSERT INTO comments 
      (user_id, comment_id, post_id, text, timestamp)
      VALUES ($1, $2, $3, $4, $5)`, [userId, uuidv4(), postId, text, new Date().toLocaleString()])
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}

export async function patchComment(text, comment_id) {
  try {
    await pool.query(`UPDATE comments SET text = $1 WHERE comment_id = $2`, [text, comment_id])
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}

export async function deleteComment(comment_id) {
  try {
    await pool.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}

export async function deletePost(post_id) {
  console.log(post_id)
  try {
    await pool.query(`DELETE FROM posts WHERE post_id = $1`, [post_id])
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}


export async function getTags() {

  try {
    const res = await pool.query(`SELECT TRIM(tag) AS tag, COUNT(*) AS frequency
FROM (
    SELECT unnest(tags) AS tag
    FROM posts
) AS unnested_tags
GROUP BY TRIM(tag)
ORDER BY frequency DESC`)
    return res.rows
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}

export async function getPostsByTag(tag) {
  try {
    const res = await pool.query(`
    SELECT *
FROM posts
WHERE $1 = ANY(tags);`, [tag])
    return res.rows
  }
  catch (e) {
    console.log('Error writing post', e)
  }
}