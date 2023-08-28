import express from "express";
import { useApiKey } from "../controllers/apiController.js";
import { updateUserAvail } from "../controllers/apiController.js";
const router = express.Router();

router.post("/", useApiKey);
router.patch("/update-avail/:id", updateUserAvail);

export default router;
