import User from "../models/userModel.js";
import { transformObject } from "../cal-com/handlers/utilities/transformObject.js";
import { addUserRow } from "../cal-com/handlers/services/googleSheetsService.js";

export const sendUsers = async (req, res) => {
	try {
		const usersList = await User.find();

		const users = usersList.map((user) => {
			const data = JSON.parse(JSON.stringify(user));
			const { userId, name, email, userAvail } = data;
			return { userId, name, email, userAvail };
		});

		const transformedUsers = users.map((user) => transformObject(user));

		for (const user of transformedUsers) {
			await addUserRow(user);
		}

		res.status(200).json({ message: "Data processed and sent successfully " });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while processing and sending the data",
		});
	}
};
