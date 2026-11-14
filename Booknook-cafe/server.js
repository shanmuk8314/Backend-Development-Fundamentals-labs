const express = require("express");

const app = express();
const PORT = 3000;

require("./db");

const bookingsRouter = require("./routes/bookings");
const gamesRouter = require("./routes/games");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to BookNook Cafe API");
});

app.use("/bookings", bookingsRouter);
app.use("/games", gamesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
