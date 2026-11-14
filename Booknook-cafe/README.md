# BookNook Cafe – Backend API

## 1. Project Overview

BookNook Cafe is a backend application designed to manage board game bookings. It allows users to manage games, create bookings, retrieve booking information, and update booking statuses.

The application uses Node.js and Express.js to build RESTful APIs and SQLite to store and manage relational data.

## 2. Project Objectives

- Manage guest and board game information.
- Create and retrieve board game bookings.
- Update booking statuses with validation.
- Perform CRUD operations on games.
- Retrieve related information using SQL JOIN operations.
- Search games by name.
- Validate user input and handle errors appropriately.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| SQLite | Relational database |
| sqlite3 | Database connectivity |
| JavaScript | Application programming language |
| Postman | API testing |
| Git and GitHub | Version control |

## 4. Project Structure

```text
BookNook Cafe/
│
├── routes/
│   ├── bookings.js
│   └── games.js
│
├── screenshots/
│
├── postman/
│
├── db.js
├── seed.js
├── server.js
├── validation.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### File Descriptions

- **server.js:** Initializes the Express server and registers API routes.
- **db.js:** Establishes the SQLite database connection and creates the required tables.
- **seed.js:** Initializes the database with sample records.
- **validation.js:** Contains validation logic for booking information.
- **routes/bookings.js:** Contains APIs for creating, retrieving, and updating bookings.
- **routes/games.js:** Contains APIs for managing and searching games.
- **screenshots/:** Stores screenshots of API testing.
- **postman/:** Stores the exported Postman collection.

## 5. Database Design

The application uses an SQLite database named `booknook.db`.

It contains three related tables:

### Guests Table

| Column | Type |
|---|---|
| id | INTEGER |
| name | TEXT |
| email | TEXT |

### Games Table

| Column | Type |
|---|---|
| id | INTEGER |
| name | TEXT |
| players | INTEGER |

### Bookings Table

| Column | Type |
|---|---|
| id | INTEGER |
| guest_id | INTEGER |
| game_id | INTEGER |
| status | TEXT |

### Table Relationships

- Each booking references a guest through `guest_id`.
- Each booking references a game through `game_id`.
- Foreign keys maintain relationships between the tables.
- The default booking status is `pending`.

## 6. Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code
- Postman

### Step 1: Clone the Repository

```bash
git clone https://github.com/shanmuk8314/BookNook-Cafe.git
```

### Step 2: Navigate to the Project Directory

```bash
cd BookNook-Cafe
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Initialize the Database

```bash
node seed.js
```

This creates the required database tables and inserts sample data.

### Step 5: Start the Server

```bash
npm start
```

For development with automatic server restarts:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3000
```

## 7. API Documentation

Base URL:

```text
http://localhost:3000
```

### A. Booking APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/bookings` | Retrieve all bookings |
| GET | `/bookings/:id` | Retrieve a booking by ID |
| GET | `/bookings/details` | Retrieve booking details using JOIN |
| POST | `/bookings` | Create a new booking |
| PATCH | `/bookings/:id/status` | Update booking status |

### 1. Get All Bookings

**Method:** GET

```http
/bookings
```

Retrieves all bookings along with guest and game information.

### 2. Get Booking by ID

**Method:** GET

```http
/bookings/1
```

Retrieves a specific booking using its ID.

### 3. Get Booking Details Using JOIN

**Method:** GET

```http
/bookings/details
```

Uses SQL INNER JOIN operations to retrieve related information from the bookings, guests, and games tables.

### 4. Create a Booking

**Method:** POST

```http
/bookings
```

**Request Body:**

```json
{
    "guest_id": 1,
    "game_id": 1
}
```

**Expected Response:** `201 Created`

A new booking is created with the default status `pending`.

### 5. Update Booking Status

**Method:** PATCH

```http
/bookings/1/status
```

**Request Body:**

```json
{
    "status": "approved"
}
```

**Expected Response:** `200 OK` for a valid status transition.

### Booking Status Rules

Supported statuses:

- `pending`
- `approved`
- `done`

Valid transitions:

```text
pending → approved → done
```

Invalid status transitions return `400 Bad Request`.

Example error response:

```json
{
    "error": "Invalid status change"
}
```

### B. Games APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/games` | Retrieve all games |
| GET | `/games/:id` | Retrieve a game by ID |
| GET | `/games/search?name=chess` | Search games by name |
| POST | `/games` | Add a new game |
| PUT | `/games/:id` | Update game information |
| DELETE | `/games/:id` | Delete a game |

### 1. Get All Games

**Method:** GET

```http
/games
```

Retrieves all available games.

### 2. Get Game by ID

**Method:** GET

```http
/games/1
```

Retrieves a specific game using its ID.

### 3. Search Games

**Method:** GET

```http
/games/search?name=chess
```

Searches for games using their names and supports partial name matching.

### 4. Add a New Game

**Method:** POST

```http
/games
```

**Request Body:**

```json
{
    "name": "Carrom",
    "players": 4
}
```

**Expected Response:** `201 Created`

### 5. Update Game Information

**Method:** PUT

```http
/games/1
```

**Request Body:**

```json
{
    "name": "Chess Deluxe",
    "players": 2
}
```

**Expected Response:** `200 OK`

### 6. Delete a Game

**Method:** DELETE

```http
/games/1
```

Deletes a game using its ID. A game referenced by existing bookings cannot be deleted.

## 8. Validation and Error Handling

### Booking Validation

- Guest ID must be a valid positive integer.
- Game ID must be a valid positive integer.
- Referenced guest and game records must exist.
- Booking status must be one of the supported values.
- Invalid booking status transitions are rejected.

### Game Validation

- Game name must be a non-empty string.
- Number of players must be a positive integer.
- Invalid game information is rejected during creation and updating.

### HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Invalid request or validation error |
| 404 | Requested resource not found |
| 500 | Internal server error |

## 9. API Testing

The APIs are tested using Postman.

Testing covers:

- Creating bookings successfully.
- Retrieving all bookings.
- Retrieving bookings by ID.
- Retrieving joined booking details.
- Updating booking statuses.
- Testing valid and invalid status transitions.
- Adding games.
- Updating games.
- Deleting games.
- Searching games.
- Testing invalid input and missing records.

Screenshots of API testing are available in the `screenshots/` directory.

The exported Postman collection is available in the `postman/` directory.

## 10. Future Improvements

- Add authentication and authorization.
- Implement booking date and time management.
- Add pagination and sorting.
- Improve input validation.
- Add automated API testing.
- Develop a frontend interface for guests and administrators.

## 11. Conclusion

BookNook Cafe demonstrates the development of a RESTful backend application using Node.js, Express.js, and SQLite.

The project provides functionality for managing games and bookings, maintaining relationships between database tables, validating requests, handling errors, and retrieving related information using SQL JOIN operations.

## 12. Team Members

| S. No. | Team Member | Registration Number |
|---|---|---|
| 1 | S. Thrisha | 252U1R9143 |
| 2 | P. Kaveri | 252U1R9131 |
| 3 | Y. Jaisai | 252U1R9172 |
| 4 | V. Venkat Shiva | 252U1R1965 |
| 5 | R. Shanmuk Shahith | 252U1R9137 |

## 13. Project Information

**Project Name:** BookNook Cafe

**Project Type:** Backend Development Group Assignment

**Technologies:** Node.js, Express.js, SQLite, JavaScript

**API Testing Tool:** Postman

**GitHub Repository:** https://github.com/shanmuk8314/BookNook-Cafe

