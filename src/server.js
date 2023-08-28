import express from "express";
import userRoutes from "./routes/userRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

const server = express();

// Middleware
server.use(express.json());

// Routes
server.use("/users", userRoutes);
server.use("/apikey", apiRoutes);

export default server;
