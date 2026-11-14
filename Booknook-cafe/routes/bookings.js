const express = require("express");
const router = express.Router();

const db = require("../db");
const { validateBooking } = require("../validation");

router.get("/", (req, res) => {
    const sql = `
        SELECT
            bookings.id,
            guests.name AS guest_name,
            guests.email,
            games.name AS game_name,
            games.players,
            bookings.status
        FROM bookings
        JOIN guests ON bookings.guest_id = guests.id
        JOIN games ON bookings.game_id = games.id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

router.get("/details", (req, res) => {
    const sql = `
        SELECT
            bookings.id AS booking_id,
            guests.id AS guest_id,
            guests.name AS guest_name,
            guests.email,
            games.id AS game_id,
            games.name AS game_name,
            games.players,
            bookings.status
        FROM bookings
        INNER JOIN guests
            ON bookings.guest_id = guests.id
        INNER JOIN games
            ON bookings.game_id = games.id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid booking ID"
        });
    }

    const sql = `
        SELECT
            bookings.id,
            guests.name AS guest_name,
            guests.email,
            games.name AS game_name,
            games.players,
            bookings.status
        FROM bookings
        JOIN guests ON bookings.guest_id = guests.id
        JOIN games ON bookings.game_id = games.id
        WHERE bookings.id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({
                error: "Booking not found"
            });
        }

        res.status(200).json(row);
    });
});

router.post("/", (req, res) => {
    const { guest_id, game_id } = req.body;

    const validationError = validateBooking(guest_id, game_id);

    if (validationError) {
        return res.status(400).json({
            error: validationError
        });
    }

    const sql = `
        INSERT INTO bookings (guest_id, game_id)
        VALUES (?, ?)
    `;

    db.run(sql, [guest_id, game_id], function (err) {
        if (err) {
            if (err.message.includes("FOREIGN KEY")) {
                return res.status(400).json({
                    error: "Guest or game does not exist"
                });
            }

            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Booking created successfully",
            booking_id: this.lastID,
            status: "pending"
        });
    });
});

router.patch("/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid booking ID"
        });
    }

    if (
        !status ||
        !["pending", "approved", "done"].includes(status)
    ) {
        return res.status(400).json({
            error: "Invalid status"
        });
    }

    db.get(
        "SELECT status FROM bookings WHERE id = ?",
        [id],
        (err, booking) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!booking) {
                return res.status(404).json({
                    error: "Booking not found"
                });
            }

            const validTransition =
                (booking.status === "pending" && status === "approved") ||
                (booking.status === "approved" && status === "done");

            if (!validTransition) {
                return res.status(400).json({
                    error: "Invalid status change"
                });
            }

            db.run(
                "UPDATE bookings SET status = ? WHERE id = ?",
                [status, id],
                function (updateErr) {
                    if (updateErr) {
                        return res.status(500).json({
                            error: updateErr.message
                        });
                    }

                    res.status(200).json({
                        message: "Booking status updated successfully",
                        status: status
                    });
                }
            );
        }
    );
});

module.exports = router;