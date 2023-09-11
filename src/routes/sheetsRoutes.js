import express from "express";
import { getUsers, sendUsers } from "../controllers/sheetsController.js";

const router = express.Router();

router.post("/", sendUsers);

router.get("/", getUsers);

export default router;
