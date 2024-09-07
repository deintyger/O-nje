import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
      </ul>
      <h3>Steps</h3>
      <p>{recipe.steps}</p>
      <h3>Average Rating</h3>
      <p>{recipe.averageRating}</p>
    </div>
  );
};

export default RecipePage;
