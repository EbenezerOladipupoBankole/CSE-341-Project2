# Art Gallery API

This project is a REST API for managing an Art Gallery management system, built for CSE 341.

## Collections
- **Artworks**: Manages individual art pieces with fields for title, artist, medium, year, dimensions, price, availability, image URL, and museum ID.
- **Museums**: Manages museum information with fields for name, location, founded year, director, website, collection size, bio, and admission fee.

## Features
- Full CRUD operations for both collections.
- Data validation using `express-validator`.
- Centralized error handling.
- API documentation with Swagger.

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ArtGallery
PORT=8080
```

### 2. Installations
Run the following command to install dependencies:
```bash
npm install
```

### 3. Generate Swagger Documentation
```bash
npm run swagger-gen
```

### 4. Run the Project
```bash
npm start
```
Or for development with automatic restarts:
```bash
npm run dev
```

## API Documentation
Once the server is running, you can access the Swagger UI at:
`http://localhost:8080/api-docs`

## Render Deployment
1. Push this project to a GitHub repository.
2. Create a new Web Service on Render.
3. Add `MONGODB_URI` to the environment variables in the Render dashboard.
4. Set the build command to `npm install` and start command to `npm start`.
