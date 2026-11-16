# Lab 3: RESTful API Development and Validation

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

## Live Deployment

The RESTful Book Management API is deployed on Render.

**Live API URL:** [https://backend-lab-3-ziaw.onrender.com](https://backend-lab-3-ziaw.onrender.com)

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/about/` | API information |
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |


## Project Objective

The objective of this lab is to develop a RESTful API using Express.js and SQLite to manage book records.

The application implements CRUD (Create, Read, Update, Delete) operations and provides additional features such as searching, sorting, filtering, and pagination through query parameters.

This lab demonstrates database connectivity, asynchronous operations using async/await, parameterized SQL queries, request validation, error handling, and REST API development.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript (CommonJS)
- Postman
- npm (Node Package Manager)
- Git and GitHub

## Project Folder Structure

```text
lab-3/
├── README.md
├── app.js
├── database.js
├── books.db
├── books.json
├── insertBooks.js
├── package.json
├── package-lock.json
├── node_modules/
└── Screenshots/
    ├── DELETE a book that doesn't exist.png
    ├── Delete a book.png
    ├── Filter books by price range.png
    ├── Get a book by its ID.png
    ├── GET All Books.png
    ├── get the first 5 books.png
    ├── Getallbooks.png
    ├── Search books by title.png
    ├── Sort books by price, highest to lowest.png
    ├── Test invalid order_by value.png
    ├── Test invalid POST data.png
    ├── Test invalid price.png
    ├── Test invalid sorting order.png
    ├── Test PUT with a book ID that doesn't exist.png
    ├── Update a book.png
    └── Verify deletion.png
```

## Database Structure

**Database Name:** `books.db`

**Table Name:** `book`

| Column | Data Type                         | Description            |
| ------ | --------------------------------- | ---------------------- |
| id     | INTEGER PRIMARY KEY AUTOINCREMENT | Unique book identifier |
| title  | TEXT                              | Book title             |
| author | TEXT                              | Author name            |
| price  | INTEGER                           | Book price             |
| pages  | INTEGER                           | Number of pages        |

The database contains sample book records used to test the API operations. The final verification returned 14 remaining book records after the deletion test.

## Installation and Execution

### Prerequisites

- Node.js and npm installed.
- Visual Studio Code or another code editor.
- Git installed.
- Postman installed.

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

```text
http://localhost:3000/
```

### 3. Database Connection

The application connects to the SQLite database using the `sqlite` and `sqlite3` packages.

The database connection is established before the Express server starts. The `book` table is created if it does not already exist.

## API Endpoints

| HTTP Method | Endpoint          | Description                                                              |
| ----------- | ----------------- | ------------------------------------------------------------------------ |
| GET         | `/`               | Displays the welcome message                                             |
| GET         | `/about/`         | Displays information about Lab 3                                         |
| GET         | `/books/`         | Retrieves books with optional search, sorting, filtering, and pagination |
| GET         | `/books/:bookId/` | Retrieves a specific book using its ID                                   |
| POST        | `/books/`         | Adds a new book                                                          |
| PUT         | `/books/:bookId/` | Updates an existing book                                                 |
| DELETE      | `/books/:bookId/` | Deletes a book using its ID                                              |

## Query Parameters

The `GET /books/` endpoint supports the following query parameters.

| Parameter   | Description                               | Example           |
| ----------- | ----------------------------------------- | ----------------- |
| `search_q`  | Searches books by title                   | `?search_q=harry` |
| `order_by`  | Selects the column used for sorting       | `?order_by=price` |
| `order`     | Sets the sorting order to ASC or DESC     | `?order=DESC`     |
| `limit`     | Specifies the number of records to return | `?limit=5`        |
| `offset`    | Specifies the number of records to skip   | `?offset=5`       |
| `min_price` | Sets the minimum price                    | `?min_price=400`  |
| `max_price` | Sets the maximum price                    | `?max_price=600`  |

### Example Requests

**Search books by title**

```text
GET /books/?search_q=harry
```

**Sort books by price, highest to lowest**

```text
GET /books/?order_by=price&order=DESC
```

**Retrieve the first five books**

```text
GET /books/?limit=5&offset=0
```

**Filter books by price range**

```text
GET /books/?min_price=400&max_price=600
```

## CRUD Operations

### 1. GET All Books

**Endpoint:** `GET /books/`

Retrieves book records stored in the database. The endpoint also supports query parameters for searching, sorting, filtering, and pagination.

### 2. GET Book by ID

**Endpoint:** `GET /books/:bookId/`

Retrieves a specific book using its unique ID. If the requested book does not exist, the API returns a not-found response.

### 3. POST a New Book

**Endpoint:** `POST /books/`

Adds a new book record to the database.

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

If the requested book does not exist, the API returns a not-found response.

## Validation and Error Handling

The application validates incoming request data and handles invalid requests.

The following validation tests were performed:

- POST request with missing required data.
- POST request with an invalid price.
- Request with an invalid `order_by` value.
- Request with an invalid sorting order.
- PUT request using a book ID that does not exist.
- DELETE request using a book ID that does not exist.

The API returns appropriate HTTP status codes and error messages for invalid input and missing book records.

## Postman Testing

The application was tested using Postman. The following screenshots demonstrate the API functionality and validation.

### 1. GET All Books

The endpoint retrieves the available book records from the database.

![GET All Books](Screenshots/GET%20All%20Books.png)

### 2. Get a Book by Its ID

Retrieves a specific book using its ID.

![Get a book by its ID](Screenshots/Get%20a%20book%20by%20its%20ID.png)

### 3. Search Books by Title

Searches for books using the `search_q` query parameter.

![Search books by title](Screenshots/Search%20books%20by%20title.png)

### 4. Sort Books by Price

Sorts books from highest price to lowest price.

![Sort books by price](Screenshots/Sort%20books%20by%20price%2C%20highest%20to%20lowest.png)

### 5. Filter Books by Price Range

Retrieves books whose prices fall within the specified range.

![Filter books by price range](Screenshots/Filter%20books%20by%20price%20range.png)

### 6. Pagination

Retrieves the first five books using the `limit` and `offset` query parameters.

![Get the first 5 books](Screenshots/get%20the%20first%205%20books.png)

### 7. Update a Book

Updates an existing book record.

![Update a book](Screenshots/Update%20a%20book.png)

### 8. Delete a Book

Deletes an existing book record.

![Delete a book](Screenshots/Delete%20a%20book.png)

### 9. Verify Deletion

Checks that the deleted book is no longer available.

![Verify deletion](Screenshots/Verify%20deletion.png)

### 10. Test Invalid POST Data

Checks the API response when required fields are missing.

![Test invalid POST data](Screenshots/Test%20invalid%20POST%20data.png)

### 11. Test Invalid Price

Checks the API response when the price value is invalid.

![Test invalid price](Screenshots/Test%20invalid%20price.png)

### 12. Test Invalid Sorting Order

Checks the API response when the sorting order is not ASC or DESC.

![Test invalid sorting order](Screenshots/Test%20invalid%20sorting%20order.png)

### 13. Test Invalid order_by Value

Checks the API response when an unsupported sorting column is provided.

![Test invalid order_by value](Screenshots/Test%20invalid%20order_by%20value.png)

### 14. Delete a Non-Existing Book

Checks the API response when a DELETE request uses a book ID that does not exist.

![DELETE a book that doesn't exist](Screenshots/DELETE%20a%20book%20that%20doesn't%20exist.png)

## Important Concepts Learned

- Connecting an Express.js application to an SQLite database.
- Creating database tables using SQL.
- Performing CRUD operations through HTTP methods.
- Using async and await for asynchronous database operations.
- Retrieving records using `db.all()` and `db.get()`.
- Inserting, updating, and deleting records using `db.run()`.
- Using parameterized SQL queries with `?` placeholders.
- Accessing URL parameters through `request.params`.
- Accessing JSON request data through `request.body`.
- Accessing query parameters through `request.query`.
- Implementing searching, sorting, filtering, and pagination.
- Validating user input and handling errors.
- Testing REST API endpoints using Postman.

## Git Hygiene

The following entries should be included in `.gitignore`:

```text
node_modules/
.env
```

Do not commit `node_modules/`, environment files, API keys, passwords, or other sensitive credentials.

## Viva Questions and Answers

### 1. What is a RESTful API?
A RESTful API is an API that follows REST principles and uses HTTP methods to perform operations on resources.

### 2. What is the difference between Lab 2 and Lab 3?
Lab 2 focuses on basic SQLite CRUD operations. Lab 3 extends the API with searching, sorting, pagination, price filtering, input validation, and error handling.

### 3. What are query parameters?
Query parameters are optional values passed in a URL after a question mark to filter or customize the requested data.

Example:
`/books?search_q=Atomic`

### 4. What is the difference between route parameters and query parameters?
Route parameters identify a specific resource, while query parameters filter or customize the results.

Example:
- Route parameter: `/books/5`
- Query parameter: `/books?search_q=Atomic`

### 5. What is searching in an API?
Searching allows users to find records based on a particular keyword or value.

### 6. What is sorting?
Sorting arranges records in ascending or descending order based on a selected column.

### 7. What is the difference between ASC and DESC?
ASC sorts records in ascending order, while DESC sorts records in descending order.

### 8. What is pagination?
Pagination divides a large set of records into smaller pages instead of returning all records at once.

### 9. What is the purpose of LIMIT?
LIMIT specifies the maximum number of records returned by an SQL query.

### 10. What is the purpose of OFFSET?
OFFSET specifies how many records should be skipped before returning results.

### 11. What is price filtering?
Price filtering retrieves books within a specified price range using minimum and maximum price values.

### 12. What is input validation?
Input validation checks whether the data received from a user is correct and acceptable before processing it.

### 13. Why is input validation important?
It prevents invalid data from entering the database and helps maintain data consistency.

### 14. What is SQL injection?
SQL injection is an attack where malicious SQL statements are inserted through user input to manipulate a database.

### 15. How can SQL injection be prevented?
By using parameterized SQL queries instead of directly inserting user input into SQL statements.

### 16. Why do we validate sorting columns?
To prevent invalid column names and unsafe SQL query construction.

### 17. What is HTTP status code 200?
It indicates that the request was successful.

### 18. What is HTTP status code 201?
It indicates that a resource was successfully created.

### 19. What is HTTP status code 400?
It indicates that the client sent an invalid request.

### 20. What is HTTP status code 404?
It indicates that the requested resource was not found.

### 21. What is HTTP status code 500?
It indicates an internal server error.

### 22. What is error handling?
Error handling manages unexpected situations and returns appropriate error responses instead of allowing the application to fail unexpectedly.

### 23. What is the purpose of `req.params`?
It accesses route parameters from the URL.

### 24. What is the purpose of `req.query`?
It accesses query parameters from the URL.

### 25. What is the purpose of `req.body`?
It accesses data sent in the request body, usually in JSON format.

### 26. What is the purpose of parameterized queries?
They safely pass user-provided values into SQL statements and help prevent SQL injection.

### 27. Which database is used in Lab 3?
SQLite is used to store the book records in the `books.db` database file.

### 28. Which query parameters are supported in Lab 3?
- `search_q` – Search books
- `order_by` – Select sorting column
- `order` – ASC or DESC
- `limit` – Number of records
- `offset` – Number of records to skip
- `min_price` – Minimum price
- `max_price` – Maximum price

### 29. What happens when an invalid sorting column is provided?
The API returns a validation error instead of executing an unsafe or invalid sorting query.

### 30. How did you test your REST API?
I tested the API using HTTP requests and checked the responses, CRUD operations, query parameters, validation, and error handling.

## Conclusion

This lab provided practical experience in developing a RESTful API using Express.js and SQLite. It helped develop an understanding of database connectivity, CRUD operations, query parameters, searching, sorting, filtering, pagination, and request validation.

The API was tested using Postman, including successful requests and error-handling scenarios.
