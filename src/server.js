import express from "express";
import userRoutes from "./routes/userRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import sheetsRoutes from "./routes/sheetsRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";
const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Routes
server.use("/users", userRoutes);
server.use("/apikey", apiRoutes);
server.use("/sheets", sheetsRoutes);
server.use("/bookings", bookingRoutes);

export default server;
