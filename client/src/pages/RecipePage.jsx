import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
import Footer from "./Footer";
import { Rate, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [recipe, setRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  const handleRate = (value) => {
    axios
      .put(`/api/recipes/${id}/rate`, { rating: value })
      .then((response) => {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          averageRating: response.data.averageRating,
        }));
        message.success("Rating submitted successfully!");
        setUserRating(value);
      })
      .catch((error) => {
        console.error("Error rating recipe:", error);
        message.error("Failed to submit rating.");
      });
  };

  const handleShare = () => {
    const shareData = {
      title: recipe.name,
      text: `Check out this recipe: ${recipe.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          message.success("Recipe shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing recipe:", error);
          message.error("Failed to share recipe.");
        });
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          message.success("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Could not copy link:", error);
          message.error("Failed to copy link.");
        });
    } else {
      message.warning(
        "Share not supported on this browser. Please copy the link manually."
      );
    }
  };

  if (!recipe) return <p>Loading...</p>;

   const findAverage = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
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
              <h1 className="addTitle">{recipe.name} 🍱</h1>
            </div>
          </div>

          <div className="recipeInstructions">
            <h3>Ingredients</h3>
            <ul className="recipeMap">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Cooking Instructions</h3>
            <p>{recipe.steps}</p>
            <h3>Average Rating</h3>
            <p>{findAverage(recipe.ratings).toFixed(1)} ⭐️</p>
            <div className="sharenRateRecipe">
              <div className="rateRecipe">
                <h3>Rate this recipe:</h3>
                <Rate
                  allowHalf
                  value={userRating}
                  onChange={handleRate}
                  style={{ fontSize: "24px" }}
                />
              </div>
              <div className="shareRecipe">
                <FontAwesomeIcon
                  onClick={handleShare}
                  icon={faArrowUpFromBracket}
                  size="xl"
                  style={{ color: "#522f15", cursor: "pointer" }}
                  title="Share this recipe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <Footer/>
      </div>
    </div>
  );
};

export default RecipePage;
