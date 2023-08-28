import express from "express";
import {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	searchUserByEmail,
	useApiKey,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/search", searchUserByEmail);
router.post("/apikey", useApiKey);

export default router;
