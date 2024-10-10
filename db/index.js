import sqlite3 from 'sqlite3'
export const db = new sqlite3.Database('db/sba318.db');
import { v4 as uuidv4 } from 'uuid'


// db.run("CREATE TABLE user (userId TEXT, userName TEXT, password TEXT)");
// db.run("CREATE TABLE posts (userId TEXT, postId TEXT, title TEXT, category TEXT, text TEXT, tags TEXT)");

// id, title, category, text, tags

export function createPost(userId, title, category, text, tags) {
    db.run("INSERT INTO posts VALUES(?,?,?,?,?,?)", [userId, uuidv4(), title, category, text, tags])
}