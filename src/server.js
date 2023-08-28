import express from "express";
import userRoutes from "./routes/userRoutes.js";

const server = express();

// Middleware
server.use(express.json());

// Routes
server.use("/users", userRoutes);

export default server;
