import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import axios, { AxiosError } from 'axios';
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import orderRoute from "./routes/OrderRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});


const keepAlive = () => {
  setInterval(async () => {
    try {
      const res = await axios.get('https://merneats-backend-fumi.onrender.com/health');
      console.log(`Self-ping success: ${res.data}`);
    } catch (error: AxiosError) { 
      console.error('Self-ping failed:', error.message);
    }
  }, 13 * 60 * 1000);
};
app.listen(7000, () => {
  console.log("server started on localhost:7000");
  keepAlive();
});
    
