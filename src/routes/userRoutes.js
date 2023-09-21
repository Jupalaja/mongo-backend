import express from "express";
import {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	searchUserByEmail,
} from "../controllers/userController.js";
import { updateUserAvail } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search", searchUserByEmail);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/update-avail/:id", updateUserAvail);

export default router;
