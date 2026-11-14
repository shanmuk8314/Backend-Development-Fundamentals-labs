
function validateGuest(name, email) {
    if (!name || !email) {
        return "Name and email are required";
    }

    if (typeof name !== "string" || typeof email !== "string") {
        return "Name and email must be strings";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Enter a valid email address";
    }

    return null;
}

function validateGame(name, players) {
    if (!name || players === undefined || players === null) {
        return "Game name and number of players are required";
    }

    if (typeof name !== "string") {
        return "Game name must be a string";
    }

    if (!Number.isInteger(players) || players <= 0) {
        return "Players must be a positive integer";
    }

    return null;
}

function validateBooking(guest_id, game_id) {
    if (guest_id === undefined || game_id === undefined) {
        return "Guest ID and game ID are required";
    }

    if (!Number.isInteger(guest_id) || guest_id <= 0 ||
        !Number.isInteger(game_id) || game_id <= 0) {
        return "Guest ID and game ID must be positive integers";
    }

    return null;
}

module.exports = {
    validateGuest,
    validateGame,
    validateBooking
};
