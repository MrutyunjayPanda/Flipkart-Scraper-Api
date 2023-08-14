# Flipkart-Scraper-Api

This project provides a backend API that allows users to scrape data from a given URL and save it in a database. It uses Express.js for handling routes, Axios for making HTTP requests, and MongoDB for data storage. JWT-based authentication is used for secure access to the API.

## Setup

1. Clone the repository to your local machine:


2. Install dependencies using npm: npm i express/jwt/mongoose/body-parser


3. Configure your MongoDB database by updating the `db/mongo.js` file.

4. Create a `.env` file in the root directory and set your secret key:


5. Run the server: node index.js

6. 
## API Endpoints

### Signup

- **Route:** `POST /signup`
- **Description:** Sign up a new user.
- **Request Body:**
```json
{
 "email": "user@example.com",
 "password": "password123"
}

Login
Route: POST /login
Description: Log in a user and receive a JWT token.
Request Body:{
  "email": "user@example.com",
  "password": "password123"
}
Response Body:
{
   "userId": "",
  "token": "yourJWTToken"
}

Scrape Data
Route: POST /scrape
Description: Scrape data from a given URL and save it in the database.
Authentication: Include the JWT token in the Authorization header.
Request Body: {
  "url": "https://www.flipkart.com/product-url"
}

