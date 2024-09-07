import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, Button } from "antd";
import Navbar from "./pages/components/Navbar";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="content">
      <Navbar />

      <div className="site-layout-content">
        <span className="titleText">Oúnje - A Recipe Sharing Platform</span>
        <div className="recipe-content">
          <List
            bordered
            dataSource={recipes}
            renderItem={(recipe) => (
              <List.Item>
                <span className="recipeName">{recipe.name}</span>
                <Button className="ratingBtn">{recipe.rating}</Button>
                <Button className="useBtn">
                  <Link to={`/recipes/${recipe._id}`}>View Recipe 😋</Link>
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="footer">
        Oúnje Recipe Platform ©2024 Created by Dein & Mide
      </div>
    </div>
  );
}

export default App;
