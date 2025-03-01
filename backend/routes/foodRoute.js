import express from "express";
import { addFood, listFood, removeFood, getFoodById } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood); // Add food item
foodRouter.get("/list", listFood); // List all food items
foodRouter.post("/remove", removeFood); // Remove food item
foodRouter.get("/:id", getFoodById); // Get food item by ID

export default foodRouter;