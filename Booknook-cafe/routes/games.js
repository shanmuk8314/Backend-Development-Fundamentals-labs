const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
    const sql = "SELECT * FROM games";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

router.get("/search", (req, res) => {
    const { name } = req.query;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            error: "Search name is required"
        });
    }

    const sql = `
        SELECT * FROM games
        WHERE name LIKE ?
    `;

    db.all(sql, [`%${name.trim()}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ error: "Invalid game ID" });
    }

    const sql = "SELECT * FROM games WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: "Game not found" });
        }

        res.status(200).json(row);
    });
});

router.post("/", (req, res) => {
    const { name, players } = req.body;

    if (
        !name ||
        typeof name !== "string" ||
        name.trim() === "" ||
        !Number.isInteger(players) ||
        players <= 0
    ) {
        return res.status(400).json({
            error: "Invalid game details"
        });
    }

    const sql = `
        INSERT INTO games (name, players)
        VALUES (?, ?)
    `;

    db.run(sql, [name.trim(), players], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Game added successfully",
            game_id: this.lastID,
            name: name.trim(),
            players
        });
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, players } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ error: "Invalid game ID" });
    }

    if (
        !name ||
        typeof name !== "string" ||
        name.trim() === "" ||
        !Number.isInteger(players) ||
        players <= 0
    ) {
        return res.status(400).json({
            error: "Invalid game details"
        });
    }

    const sql = `
        UPDATE games
        SET name = ?, players = ?
        WHERE id = ?
    `;

    db.run(sql, [name.trim(), players, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Game not found" });
        }

        res.status(200).json({
            message: "Game updated successfully",
            game_id: Number(id),
            name: name.trim(),
            players
        });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ error: "Invalid game ID" });
    }

    const sql = "DELETE FROM games WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            if (err.message.includes("FOREIGN KEY")) {
                return res.status(400).json({
                    error: "Cannot delete game because bookings exist"
                });
            }

            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Game not found" });
        }

        res.status(200).json({
            message: "Game deleted successfully"
        });
    });
});

module.exports = router;