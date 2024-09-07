import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipePage = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/recipes', {
      name,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      steps
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  return (
    <div>
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Ingredients (comma-separated):
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>
        <br />
        <label>
          Steps:
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
