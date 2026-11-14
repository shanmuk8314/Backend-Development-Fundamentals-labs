
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./booknook.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to BookNook Cafe database");
    }
});

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON");
    db.run(`
        CREATE TABLE IF NOT EXISTS guests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            players INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guest_id INTEGER NOT NULL,
            game_id INTEGER NOT NULL,
            status TEXT DEFAULT 'pending'
                CHECK(status IN ('pending', 'approved', 'done')),

            FOREIGN KEY (guest_id) REFERENCES guests(id),
            FOREIGN KEY (game_id) REFERENCES games(id)
        )
    `);

    console.log("Database tables created successfully");
});

module.exports = db;
