const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const connectDB = require('./config/db');

dotenv.config();

//Connecting to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/recipes', recipeRoutes);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
