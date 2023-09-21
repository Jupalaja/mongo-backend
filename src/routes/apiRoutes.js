import express from "express";
import { useApiKey } from "../controllers/apiController.js";

const router = express.Router();

router.post("/", useApiKey);

export default router;
