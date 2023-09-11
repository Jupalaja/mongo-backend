import express from "express";
import { virtualBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/virtual", virtualBooking);

export default router;
