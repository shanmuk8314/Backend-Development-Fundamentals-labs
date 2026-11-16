# Lab 2: SQLite Database and CRUD Routes

## Subject Details

| Field       | Details                          |
| ----------- | -------------------------------- |
| Subject     | Backend Development Fundamentals |
| Year / Term | Year II, Term II                 |
| University  | Aurora Deemed to be University   |
| Faculty     | Mr. Joel Prashanth D             |

## Student Details

| Field               | Details           |
| ------------------- | ----------------- |
| Name                | Shanmuk Shahith   |
| Registration Number | 252U1R9137        |
| Section             | CSE - GEN-AI - 2C |

# Live Deployment

Deployed Application: https://backend-lab-2-r9dc.onrender.com/

The application is deployed using Render. You can access the home page and test the available API endpoints using the deployed URL.
## Project Objective

The objective of this lab is to connect an Express.js application with an SQLite database and implement CRUD (Create, Read, Update, Delete) operations through HTTP API endpoints.

The application manages book records stored in an SQLite database. It demonstrates database connectivity, SQL queries, asynchronous operations using async/await, parameterized queries, and REST API development.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript (CommonJS)
- Thunder Client
- npm (Node Package Manager)
- Git and GitHub

## Project Folder Structure

```text
lab-02/
├── README.md
├── app.js
├── database.js
├── books.db
├── package.json
├── package-lock.json
├── .gitignore
└── Screenshots/
    ├── home.png
    ├── get-all-books.png
    ├── get-book-by-id.png
    ├── post-book.png
    ├── put-book.png
    ├── delete-book.png
    └── not-found.png
```

## Database Structure

Database Name: `books.db`

Table Name: `book`

| Column | Data Type                         | Description            |
| ------ | --------------------------------- | ---------------------- |
| id     | INTEGER PRIMARY KEY AUTOINCREMENT | Unique book identifier |
| title  | TEXT                              | Book title             |
| author | TEXT                              | Author name            |
| price  | INTEGER                           | Book price             |
| pages  | INTEGER                           | Number of pages        |

The database contains sample book records used to test the CRUD operations.

## Installation and Execution

### Prerequisites

- Node.js and npm installed.
- Visual Studio Code or another code editor.
- Git installed.
- Thunder Client extension installed in VS Code.

### 1. Install Dependencies

Navigate to the project directory and run:

```bash
npm install
```

### 2. Start the Application

Run:

```bash
node app.js
```

The server runs at:

`http://localhost:3000/`

### 3. Database Connection

The application connects to the SQLite database using the `sqlite` and `sqlite3` packages.

The database connection is established before the Express server starts.

## API Endpoints

| HTTP Method | Endpoint          | Description                           |
| ----------- | ----------------- | ------------------------------------- |
| GET         | `/books/`         | Retrieve all books                    |
| GET         | `/books/:bookId/` | Retrieve a specific book using its ID |
| POST        | `/books/`         | Add a new book                        |
| PUT         | `/books/:bookId/` | Update an existing book               |
| DELETE      | `/books/:bookId/` | Delete a book using its ID            |

### 1. GET All Books

**Endpoint:** `GET /books/`

Retrieves all book records stored in the database.

### 2. GET Book by ID

**Endpoint:** `GET /books/:bookId/`

Retrieves a specific book using its unique ID.

### 3. POST a New Book

**Endpoint:** `POST /books/`

Adds a new book to the database.

Example JSON request body:

```json
{
  "title": "The Power of Habit",
  "author": "Charles Duhigg",
  "price": 420,
  "pages": 371
}
```

### 4. PUT Update Book

**Endpoint:** `PUT /books/:bookId/`

Updates the details of an existing book using its ID.

Example JSON request body:

```json
{
  "title": "Atomic Habits Updated",
  "author": "James Clear",
  "price": 500,
  "pages": 350
}
```

### 5. DELETE Book

**Endpoint:** `DELETE /books/:bookId/`

Deletes a specific book from the database using its ID.

## Screenshots

The following screenshots demonstrate the working application and API testing performed using Thunder Client.

### 1. Application Home Page

![Home Page](./Screenshots/home.png.png)

### 2. GET All Books

![GET All Books](./Screenshots/get-all-books.png.png)

### 3. GET Book by ID

![GET Book by ID](./Screenshots/get-book-by-id.png.png)

### 4. POST a New Book

![POST Book](./Screenshots/post-book.png.png)

### 5. PUT Update Book

![PUT Book](./Screenshots/put-book.png.png)

### 6. DELETE Book

![DELETE Book](./Screenshots/delete-book.png.png)

## Important Concepts Learned

- Connecting an Express.js application to an SQLite database.
- Creating database tables using SQL.
- Performing CRUD operations through HTTP methods.
- Using `async` and `await` for asynchronous database operations.
- Retrieving records using `db.all()` and `db.get()`.
- Inserting, updating, and deleting records using `db.run()`.
- Using parameterized SQL queries with `?` placeholders.
- Accessing URL parameters through `request.params`.
- Accessing JSON request data through `request.body`.
- Testing REST API endpoints using Thunder Client.
- Handling HTTP status codes and errors.

## Git Hygiene

The following entries should be included in `.gitignore`:

```gitignore
node_modules/
.env
```

Do not commit `node_modules/`, environment files, API keys, passwords, or other sensitive credentials.

## Viva Questions and Answers

### 1. What is Node.js?
Node.js is a JavaScript runtime environment that allows us to execute JavaScript outside the browser.

### 2. What is Express.js?
Express.js is a Node.js framework used to build web servers and REST APIs easily.

### 3. What is SQLite?
SQLite is a lightweight, file-based relational database that stores data in a single database file.

### 4. What is CRUD?
CRUD stands for Create, Read, Update, and Delete. These are the four basic database operations.

### 5. What is the purpose of `server.js`?
`server.js` contains the Express server configuration, middleware, database connection, and API routes.

### 6. What is the purpose of `init-db.js`?
It creates the database table and inserts initial sample book records.

### 7. What is a REST API?
A REST API allows applications to communicate using HTTP methods and resource-based URLs.

### 8. Which HTTP methods are used for CRUD operations?
- POST – Create
- GET – Read
- PUT – Update
- DELETE – Delete

### 9. What is middleware in Express.js?
Middleware is a function that executes during the request-response cycle. It can process requests, modify responses, or pass control to the next middleware.

### 10. What is `express.json()`?
It is built-in Express middleware that parses incoming JSON request bodies and makes the data available through `req.body`.

### 11. What is a route parameter?
A route parameter is a dynamic value in a URL. For example, `/books/:id` uses `id` to identify a particular book.

### 12. What is the difference between GET and POST?
GET retrieves data from the server, whereas POST sends data to the server to create a new resource.

### 13. What is the difference between PUT and DELETE?
PUT updates an existing resource, whereas DELETE removes a resource.

### 14. What is a primary key?
A primary key is a column that uniquely identifies each record in a database table.

### 15. What is the purpose of `books.db`?
It is the SQLite database file that stores the book records.

### 16. What is an SQL query?
An SQL query is a command used to communicate with a relational database to retrieve or modify data.

### 17. What is HTTP status code 404?
It means the requested resource was not found.

### 18. What is HTTP status code 201?
It indicates that a new resource has been successfully created.

### 19. Why do we use Postman?
Postman is used to send HTTP requests and test API endpoints without building a frontend.

### 20. What happens if a book ID does not exist?
The API should return a 404 Not Found response.

## Conclusion

This lab provided practical experience in integrating SQLite with an Express.js backend application. It helped develop an understanding of relational database operations and implementing REST APIs to create, retrieve, update, and delete book records.
