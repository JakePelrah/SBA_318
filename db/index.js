import sqlite3 from 'sqlite3'
export const  db = new sqlite3.Database('ttd.db');

db.serialize(() => {
    db.run("CREATE TABLE parks (name TEXT, info TEXT, lat REAL, lon REAL)");
    db.run("CREATE TABLE restaurants (name TEXT, info TEXT, cuisine TEXT, lat REAL, lng REAL)");
    db.run("CREATE TABLE art (name TEXT, info TEXT, lat REAL, lng REAL)");
    db.run("CREATE TABLE attractions (name TEXT, info TEXT, lat REAL, lng REAL)");


    // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    // for (let i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();

    // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    //     console.log(row.id + ": " + row.info);
    // });
});

db.close();