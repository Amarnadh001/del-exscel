import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const { name, description, price, category, ingredients, recipe } = req.body;

    // Convert ingredients from string to array
    const ingredientsArray = ingredients.split(",").map((ingredient) => ingredient.trim());

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
      ingredients: ingredientsArray, // Add ingredients as an array
      recipe, // Add recipe
    });

    await food.save();
    res.json({ success: true, message: "Food Added", data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get food item by ID
const getFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood, getFoodById };