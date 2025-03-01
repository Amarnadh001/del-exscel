import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams(); // Get the food ID from the URL
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/food/${id}`);
        if (response.data.success) {
          setFood(response.data.data);
        } else {
          setError("Food item not found");
        }
      } catch (error) {
        console.error("Error fetching food details:", error);
        setError("Failed to fetch food details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!food) {
    return <div className="error">No food item found.</div>;
  }

  return (
    <div className="food-details">
      <img src={`http://localhost:4000/uploads/${food.image}`} alt={food.name} className="food-image" />
      <h1>{food.name}</h1>
      <p>{food.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {food.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Recipe</h2>
      <p>{food.recipe}</p>
    </div>
  );
};

export default FoodDetails;