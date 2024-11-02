import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, Button, Input } from "antd";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import "antd/dist/reset.css";
import { debounce } from "lodash";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const sortRecipesByRating = useCallback((recipes) => {
    return [...recipes].sort((a, b) => findAverage(b.ratings) - findAverage(a.ratings));
  }, []); 

  // Directly fetch from the full URL
useEffect(() => {
  axios
    .get("https://ounje-ywkz.onrender.com/api/recipes")
    .then((response) => {
      console.log("API Response:", response);
      const sortedRecipes = sortRecipesByRating(response.data);
      setRecipes(sortedRecipes);
      setFilteredRecipes(sortedRecipes);
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}, [sortRecipesByRating]);


  // useEffect(() => {
   // axios
    //  .get("/api/recipes")
    //  .then((response) => {
     //   console.log("API Response:", response);
     //   const sortedRecipes = sortRecipesByRating(response.data);
      //  setRecipes(sortedRecipes);
      //  setFilteredRecipes(sortedRecipes);
     // })
    //  .catch((error) => {
     //   console.error("Error fetching recipes:", error);
    //    if (error.response) {
    //      console.error("Error response data:", error.response.data);
    //      console.error("Error response status:", error.response.status);
    //    }
    //  });
 // }, [sortRecipesByRating]);
  

  // Handle search input, debounced to prevent excessive API calls
  const handleSearch = debounce((value) => {
    if (value.length >= 3) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecipes(sortRecipesByRating(filtered));
    } else {
      setFilteredRecipes(sortRecipesByRating(recipes));
    }
  }, 300);

    

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options).replace(",", "");
  };


  const findAverage = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };


  const englishWord = (recipe) => {
    if (recipe.ratings.length === 1) {
      return "Person";
    } else if (recipe.ratings.length === 0) {
      return "No one";
    } else {
      return "People";
    }
  };


  if (!recipes) return <p>Loading...</p>;

  return (
    <div className="content">
      <Navbar />

      <div className="site-layout-content">
        <span className="titleText">
          <span className="ounje">Oúnje</span> - A Recipe Sharing Platform 🌮
        </span>
        <div className="recipe-content">
          <div className="searchBarContainer">
            <Input
              placeholder="Search for a Recipe"
              onChange={(e) => handleSearch(e.target.value)}
              className="searchBar"
            />
          </div>
          <div className="listContainer">
            <List
              bordered
              style={{ border: "none" }}
              dataSource={filteredRecipes}
              renderItem={(recipe) => (
                <List.Item className="listItem">
                  <div className="recipeAbout">
                    <span className="recipeName">{recipe.name}</span> -{" "}
                    <span className="recipeName">Created {formatDate(recipe.createdAt)}</span> -{" "}
                    <span>
                      <span className="recipeName">
                        Rated by{" "}
                        {recipe.ratings.length === 0
                          ? ""
                          : recipe.ratings.length}{" "}
                        {englishWord(recipe)}
                      </span>
                    </span>
                  </div>
                  <div className="recipeDetails">
                    <Button className="ratingBtn">
                      {findAverage(recipe.ratings).toFixed(1)} ⭐️
                    </Button>
                    <Button className="useBtn">
                      <Link to={`/recipes/${recipe._id}`}>View Recipe 😋</Link>
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <div>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
