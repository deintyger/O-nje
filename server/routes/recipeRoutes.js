const express = require('express');
const {
  getAllRecipes,
  addRecipe,
  getRecipeById,
  rateRecipe
} = require('../controllers/recipeController');

const router = express.Router();

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve a list of all recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllRecipes);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Add a new recipe
 *     description: Submit a new recipe to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 */
router.post('/', addRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     description: Retrieve a single recipe by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', getRecipeById);

/**
 * @swagger
 * /api/recipes/{id}/rate:
 *   put:
 *     summary: Rate a recipe
 *     description: Rate a recipe from 1 to 5 stars
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The rating value (1-5)
 *     responses:
 *       200:
 *         description: Recipe rated successfully
 */
router.put('/:id/rate', rateRecipe);

module.exports = router;
