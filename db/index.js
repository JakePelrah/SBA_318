import sqlite3 from 'sqlite3'
export const db = new sqlite3.Database('db/sba318.db');
import { v4 as uuidv4 } from 'uuid'


// db.run("CREATE TABLE user (userId TEXT, userName TEXT, password TEXT)");
// db.run("CREATE TABLE posts (userId TEXT, postId TEXT, title TEXT, category TEXT, text TEXT, tags TEXT)");

// id, title, category, text, tags

export function createPost(userId, title, category, text, tags) {
    db.run("INSERT INTO posts VALUES(?,?,?,?,?,?)", [userId, uuidv4(), title, category, text, tags])
}

// export async function findOrCreateUser(profile) {

//     const { sub, refreshToken, given_name, family_name, picture } = profile._json;
  
//     // set new refresh token on user if it exists
//     let { rows } = await pool.query(
//       "UPDATE google_profile SET refresh_token = $1 WHERE id = $2 RETURNING *",
//       [refreshToken, sub]
//     );
//     let user = rows[0];
  
//     // if user doesn't exist
//     if (!user) {
//       let { rows } = await pool.query(
//         "INSERT INTO google_profile(id, refresh_token, first_name, last_name, picture) VALUES($1, $2, $3, $4, $5) RETURNING *",
//         [sub, refreshToken, given_name, family_name, picture]
//       );
//       user = rows[0]
//     }
  
//     return user;
//   }