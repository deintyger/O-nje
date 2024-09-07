import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Rate, message } from 'antd'; // Ant Design components for rate

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [id]);

  const handleRate = (value) => {
    axios.put(`/api/recipes/${id}/rate`, { rating: value })
      .then(response => {
        setRecipe(prevRecipe => ({
          ...prevRecipe,
          averageRating: response.data.averageRating,
        }));
        message.success('Rating submitted successfully!');
        setUserRating(value);
      })
      .catch(error => {
        console.error('Error rating recipe:', error);
        message.error('Failed to submit rating.');
      });
  };
  

  if (!recipe) return <p>Loading...</p>;

  const averageRating = recipe.averageRating || 0;

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
      <p>{averageRating.toFixed(1)} ⭐️</p>
      <h3>Rate this recipe</h3>
      <Rate
        allowHalf
        value={userRating}
        onChange={handleRate}
        style={{ fontSize: '24px' }}
      />
    </div>
  );
};

export default RecipePage;
