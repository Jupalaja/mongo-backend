import express from "express";
import userRoutes from "./routes/userRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import sheetsRoutes from "./routes/sheetsRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/apikey", apiRoutes);
app.use("/sheets", sheetsRoutes);
app.use("/bookings", bookingRoutes);

export default app;
