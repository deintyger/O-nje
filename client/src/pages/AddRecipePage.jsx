import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const AddRecipePage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/recipes", {
        name,
        ingredients: ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
        steps,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error adding recipe:", error));
  };

  return (
    <div className="content">
      <Navbar />
      <div className="site-layout-content">
        <div className="addRecipe">
          <h1 className="addTitle">Add a New Recipe 📝</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Recipe Name:
              <input
                type="text"
                placeholder="Type in the recipe name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Ingredients (comma-separated):
              <input
                type="text"
                placeholder="...and what ingredients do we need, Chef? 🤭"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Steps:
              <textarea
                value={steps}
                placeholder="Could you also help us with details in how to cook it? 🥹"
                onChange={(e) => setSteps(e.target.value)}
                required
              />
            </label>
            <br />
            <button  className="searchBtn" type="submit">Add Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipePage;
