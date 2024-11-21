import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AddRecipePage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState(""); 
  const [servingSize, setServingSize] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    axios
      .post("/api/recipes", {
        name,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        steps,
        servingSize: servingSize !== "" ? parseInt(servingSize, 10) : null,
        dietaryPreferences: dietaryPreferences.split(",").map((preference) => preference.trim()),
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error adding recipe:", error));
  };

  const generateCookingInstructions = async () => {
    setLoading(true); 
    setError("");

    try {
      const response = await axios.post("/api/generateInstructions", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate cooking instructions for the following recipe:\n\nRecipe Name: ${name}\nIngredients: ${ingredients}\nServing Size: ${servingSize}\nDietary Preferences: ${dietaryPreferences}`,
          },
        ],
      });

      setSteps(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error generating cooking instructions:", error);
      setError("Failed to generate cooking instructions. Please try again.");
    } finally {
      setLoading(false); 
    }
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
                placeholder="...and what ingredients do we need, Chef?"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Serving Size:
              <input
                type="number"
                placeholder="For how many people is this recipe?"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
              />
            </label>
            <br />
            <label>
              Dietary Preferences (comma-separated):
              <input
                type="text"
                placeholder="E.g., Vegan, Gluten-Free"
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
              />
            </label>
            <br />
            <label>
              Cooking Instructions:
              <textarea
                value={steps}
                placeholder="Help us with details in how to cook it?"
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
                <button
                  className="aiBtn"
                  type="button"
                  onClick={generateCookingInstructions}
                  disabled={loading}
                >
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

          {/* Display error message if exists */}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AddRecipePage;
