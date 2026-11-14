const db = require("./db");

db.serialize(() => {
    db.run(`
        INSERT OR IGNORE INTO guests (name, email)
        VALUES
            ('Rahul Sharma', 'rahul@gmail.com'),
            ('Priya Reddy', 'priya@gmail.com'),
            ('Arjun Kumar', 'arjun@gmail.com'),
            ('Sneha Rao', 'sneha@gmail.com'),
            ('Kiran Patel', 'kiran@gmail.com')
    `);

    db.run(`
        INSERT INTO games (name, players)
        SELECT 'Chess', 2
        WHERE NOT EXISTS (
            SELECT 1 FROM games WHERE name = 'Chess'
        )
    `);

    db.run(`
        INSERT INTO games (name, players)
        SELECT 'Monopoly', 4
        WHERE NOT EXISTS (
            SELECT 1 FROM games WHERE name = 'Monopoly'
        )
    `);

    db.run(`
        INSERT INTO games (name, players)
        SELECT 'Scrabble', 4
        WHERE NOT EXISTS (
            SELECT 1 FROM games WHERE name = 'Scrabble'
        )
    `);

    db.run(`
        INSERT INTO games (name, players)
        SELECT 'Ludo', 4
        WHERE NOT EXISTS (
            SELECT 1 FROM games WHERE name = 'Ludo'
        )
    `);

    db.run(`
        INSERT INTO games (name, players)
        SELECT 'Uno', 4
        WHERE NOT EXISTS (
            SELECT 1 FROM games WHERE name = 'Uno'
        )
    `, (err) => {
        if (err) {
            console.error("Error inserting sample data:", err.message);
        } else {
            console.log("Sample guests and games inserted successfully");
        }

        db.close();
    });
});
