import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, Button, Input } from "antd";
import Navbar from "./pages/components/Navbar";
import "antd/dist/reset.css";
import { debounce } from "lodash";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch all recipes initially
    axios
      .get("/api/recipes")
      .then((response) => {
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initialize filtered list
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Handle search input, debounced to prevent excessive API calls
  const handleSearch = debounce((value) => {
    if (value.length >= 3) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes); // Show all if the search query is cleared or less than 3 characters
    }
  }, 300);
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
            <Button type="primary" className="searchBtn" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div className="listContainer">
            <List
              bordered
              dataSource={filteredRecipes}
              renderItem={(recipe) => (
                <List.Item className="listItem">
                  <span className="recipeName">{recipe.name}</span>
                  <Button className="ratingBtn">{recipe.rating} ⭐️⭐️⭐️⭐️⭐️</Button>
                  <Button className="useBtn">
                    <Link to={`/recipes/${recipe._id}`}>View Recipe 😋</Link>
                  </Button>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        Oúnje Recipe Platform ©2024 Created by Dein & Mide
      </div>
    </div>
  );
}

export default App;
