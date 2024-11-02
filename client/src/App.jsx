import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, Button, Input } from "antd";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import "antd/dist/reset.css";
import Fuse from "fuse.js"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [dataLoaded, setDataLoaded] = useState(false);

  const sortRecipesByRating = useCallback(
    (recipes) => {
      return [...recipes].sort((a, b) => findAverage(b.ratings) - findAverage(a.ratings));
    },
    [] 
  );

  // Fetch recipes
  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => {
        console.log("API Response:", response);
        const sortedRecipes = sortRecipesByRating(response.data);
        setRecipes(sortedRecipes);
        setFilteredRecipes(sortedRecipes);
      })
      .catch((error) => console.error("Error fetching recipes:", error))
      .finally(() => {
        setLoading(false); 
      });
  }, [sortRecipesByRating]);

  // Fuzzy search function using Fuse.js
  const fuzzySearch = useCallback((query) => {
    const fuseOptions = {
      keys: ["name"],
      threshold: 0.4, 
    };
    const fuse = new Fuse(recipes, fuseOptions);
    return fuse.search(query).map((result) => result.item);
  }, [recipes]);

  // Update filtered recipes based on search input
  useEffect(() => {
    if (searchInput.length >= 3) {
      const filtered = fuzzySearch(searchInput);
      setFilteredRecipes(sortRecipesByRating(filtered));
    } else {
      setFilteredRecipes(sortRecipesByRating(recipes));
    }
  }, [searchInput, fuzzySearch, recipes, sortRecipesByRating]);

  const handleSearchInputChange = (e) => setSearchInput(e.target.value);

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setSearchInput(transcript);
    };

    recognition.onend = () => setIsListening(false);

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening]);

  const handleMicClick = () => {
    setIsListening((prev) => !prev);
  };

  // Utility functions
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

  // Set a timeout to change loading state after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoaded(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  // Loader and no data logic
  if (loading) return (
    <div className="content">
      <Navbar />
      <div className="site-layout-content">
        <div className="addRecipe">
          <div className="loader"></div>
          <p style={{color: "#522f15"}}>Please wait while the recipe loads...</p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );

  if (dataLoaded && recipes.length === 0) return (
    <div className="content">
      <Navbar />
      <div className="site-layout-content">
        <div className="addRecipe">
          <p style={{color: "#522f15"}}>No recipes available at the moment.</p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );

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
              value={searchInput}
              onChange={handleSearchInputChange}
              className="searchBar"
              addonAfter={
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size="lg"
                  style={{ color: isListening ? "red" : "#522f15", cursor: "pointer" }}
                  onClick={handleMicClick}
                />
              }
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
                        Rated by {recipe.ratings.length} {englishWord(recipe)}
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
      <Footer />
    </div>
  );
}

export default App;
