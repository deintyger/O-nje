const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  steps: {
    type: String,
    required: true
  },
  ratings: {
    type: [Number],
    default: [] 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//this schema method will calculate the average rating of each recipe
recipeSchema.virtual('averageRating').get(function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rating) => sum + rating, 0);
  return total / this.ratings.length;
});

module.exports = mongoose.model('Recipe', recipeSchema);
