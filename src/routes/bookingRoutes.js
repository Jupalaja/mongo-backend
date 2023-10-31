import express from "express";
import { virtualBooking, inPersonBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/virtual", virtualBooking);
router.post("/inperson", inPersonBooking);



export default router;
