import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import Footer from "./Footer";

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
          <div className="recipeHeader">
            <div className="backBtn">
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="lg"
                style={{ color: "#522f15", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </div>
            <div className="recipeName2">
              <h1 className="addTitle">Add a New Recipe 📝</h1>
            </div>
          </div>

          <form className="recipeForm" onSubmit={handleSubmit}>
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
              Cooking Instructions:
              <textarea
                value={steps}
                placeholder="Could you also help us with details in how to cook it? 🥹"
                onChange={(e) => setSteps(e.target.value)}
                required
              />
            </label>
            <br />
            <div className="buttons">
              <button className="searchBtn" type="submit">
                Add Recipe
              </button>
              <div className="aiButtonSection">
              <span className="comingSoon">Coming Soon</span>
                <button className="aiBtn" type="button" disabled>
                  <FontAwesomeIcon
                    icon={faWandMagicSparkles}
                    size="lg"
                    style={{ color: "#522f15" }}
                  />
                  Generate Cooking Instructions
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AddRecipePage;
