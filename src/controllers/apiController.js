import User from "../models/userModel.js";
import {
	idFromApiKey,
	createApiKey,
	addUsersBasicInfo,
} from "../cal-com/handlers/getUserReady.js";
import verifyEvents from "../cal-com/handlers/eventsHandler.js";
import patchUserSchedule from "../cal-com/handlers/setAvailability.js";
import { decrypt } from "../cal-com/utils/encryptionUtils.js";

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

async function validateUserExist(userId) {
	const userExists = await User.findOne({ userId });
	if (userExists) {
		throw new Error("El usuario ya está en la base de datos");
	}
}
