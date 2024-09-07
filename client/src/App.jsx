import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <header>
        <h1>Oúnje Recipe Platform</h1>
        <nav>
          <Link to="/add-recipe">Add New Recipe</Link>
        </nav>
      </header>
      <main>
        <h2>All Recipes</h2>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
