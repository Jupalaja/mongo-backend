import User from "../models/userModel.js";
import {
	idFromApiKey,
	createApiKey,
	addUsersBasicInfo,
} from "../cal-com/handlers/getUserReady.js";
import verifyEvents from "../cal-com/handlers/eventsHandler.js";
import patchUserSchedule from "../cal-com/handlers/setAvailability.js";
import { decrypt } from "../cal-com/utils/encryptionUtils.js";

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al obtener los usuarios" });
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al obtener el usuario" });
	}
};

export const createUser = async (req, res) => {
	try {
		const { userId, apiKey, username, name, email, userAvail } = req.body;

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res
				.status(400)
				.json({ message: "El usuario ya está en la base de datos" });
		}
		const newUser = new User({
			userId,
			apiKey,
			username,
			name,
			email,
			userAvail,
		});
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al crear el usuario" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { email } = req.body;
		let user = await User.findOne({ email: email });
		if (user) {
			user = await User.findOneAndUpdate({ email: email }, req.body, {
				new: true,
			});
			res.status(200).json(user);
		} else {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al actualizar el usuario" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { email } = req.params;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		await User.findOneAndRemove({ email: email });
		res.status(200).json({ message: "Usuario eliminado con éxito" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al eliminar el usuario" });
	}
};

export const searchUserByEmail = async (req, res) => {
	try {
		const { email } = req.query;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al buscar los usuarios" });
	}
};

export const useApiKey = async (req, res) => {
	let { apiKey } = req.body;
	const userId = await idFromApiKey(apiKey);

	try {
		const userExists = await User.findOne({ userId });
		if (userExists) {
			return res
				.status(400)
				.json({ message: "El usuario ya está en la base de datos" });
		}

		apiKey = await createApiKey(apiKey);

		console.log(apiKey);

		let user = {
			userId,
			apiKey,
		};

		let userBasicInfo = await addUsersBasicInfo(decrypt(apiKey));

		user = { ...user, ...userBasicInfo };

		await verifyEvents(user);

		let userAvail = await patchUserSchedule(user);

		user = { ...user, userAvail };

		console.log(user);
		const newUser = new User(user);
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al crear el usuario" });
	}
};
