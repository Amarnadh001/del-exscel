import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://amarnadh:369082@cluster0.wbhb7.mongodb.net/food-fusion').then(()=>console.log("DB Connected"));
}