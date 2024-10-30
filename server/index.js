const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const connectDB = require('./config/db');
const axios = require('axios'); // <-- Add this line to import axios

dotenv.config();

// Connecting to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/recipes', recipeRoutes);
app.post('/api/generateInstructions', async (req, res) => {
  const { model, messages } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use your OpenAI API key
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).send("Failed to generate cooking instructions");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
