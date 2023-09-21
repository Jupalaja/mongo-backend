import User from "../models/userModel.js";
import { createApiKey, idFromApiKey } from "../cal-com/handlers/apiKeys.js";
import { addUsersBasicInfo } from "../cal-com/handlers/userInfo.js";
import { getUserEvents, verifyEvents } from "../cal-com/handlers/events.js";
import patchUserSchedule from "../cal-com/handlers/schedules.js";
import { decrypt } from "../cal-com/utilities/encryption.js";

async function validateUserExist(userId) {
	const userExists = await User.findOne({ userId });
	if (userExists) {
		throw new Error("El usuario ya está en la base de datos");
	}
}

async function createNewUser(apiKey) {
	const userId = await idFromApiKey(apiKey);
	apiKey = await createApiKey(apiKey);

	let user = {
		userId,
		apiKey,
	};

	const userBasicInfo = await addUsersBasicInfo(decrypt(apiKey));
	user = { ...user, ...userBasicInfo };

	await verifyEvents(user);

	let userEvents = await getUserEvents(user);
	console.log(userEvents);
	user = { ...user, userEvents };

	let userAvail = await patchUserSchedule(user);
	console.log(userAvail);

	user = { ...user, userAvail };

	return user;
}

export const useApiKey = async (req, res) => {
	let { apiKey } = req.body;
	try {
		const userId = await idFromApiKey(apiKey);
		await validateUserExist(userId);

		const user = await createNewUser(apiKey);
		const newUser = new User(user);
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: `${error}`,
		});
	}
};
