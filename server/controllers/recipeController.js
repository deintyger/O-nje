const Recipe = require("../models/recipeModel");

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().exec();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

// Add a new recipe
exports.addRecipe = async (req, res) => {
  try {
    const { name, ingredients, steps, image } = req.body;
    const newRecipe = new Recipe({
      name,
      ingredients,
      steps,
      image,
    });
    await newRecipe.save();
    res.json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: "Error adding recipe" });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Rate a recipe
exports.rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.ratings.push(rating);
    await recipe.save();

    res.json({ averageRating: recipe.averageRating });
  } catch (error) {
    res.status(400).json({ message: "Error rating recipe" });
  }
};
