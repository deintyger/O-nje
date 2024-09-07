# Oúnje Recipe Platform

Oúnje is a recipe-sharing platform where users can view, add, and rate recipes. The application does not require user logins, making it easy for users to interact with the recipes directly.

## Features

- **View All Recipes**: Browse through a list of recipes available on the platform.
- **Add New Recipes**: Add new recipes through a dedicated form.
- **View Recipe Details**: See detailed information about a recipe, including ingredients and steps.
- **Rate Recipes**: Rate recipes from 1 to 5 stars. Recipes are sorted by average rating, with the highest ratings shown first.

## Technologies Used

- **Frontend**: Vite with React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **API Documentation**: Swagger UI

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Setting Up the Backend

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Navigate to the backend folder:**

   ```bash
   cd backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add your MongoDB connection string:

   ```
   MONGO_URI=xx
   PORT=xx
   ```

5. **Run the backend server:**

   ```bash
   npm run dev
   ```

   The backend server will be running on `http://localhost:5000`.

### Setting Up the Frontend

1. **Navigate to the frontend folder:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend server:**

   ```bash
   npm run dev
   ```

   The frontend will be accessible at `http://localhost:5173`.

## API Endpoints

- **GET /api/recipes**
  - Get all recipes.

- **POST /api/recipes**
  - Add a new recipe.

- **GET /api/recipes/{id}**
  - Get a recipe by ID.

- **PUT /api/recipes/{id}/rate**
  - Rate a recipe.

## Swagger Documentation

API documentation is available at `http://localhost:5000/api-docs`.

## Development

### Running the Backend

```bash
cd backend
npm run dev
```

### Running the Frontend

```bash
cd frontend
npm run dev
```

### Testing

Ensure you have MongoDB running and both backend and frontend servers are up before testing the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Vite for a fast development environment.
- React for building the user interface.
- Node.js and Express for server-side logic.
- MongoDB for database storage.
- Swagger UI for API documentation.

```