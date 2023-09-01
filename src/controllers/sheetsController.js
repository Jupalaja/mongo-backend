import { getUsers } from "../controllers/userController.js";
import { transformObject } from "../cal-com/handlers/utilities/transformObject.js";
import { addStudentRow } from "../cal-com/handlers/services/googleSheetsService.js";

export const sendUsers = async (req, res) => {
	try {
		const usersList = await getUsers(req, res);

		console.log("The students Object");
		console.log(usersList);

		// const users = usersList.map((user) => {
		// 	const { userId, apiKey, name, email, userAvail } = user;
		// 	return { userId, apiKey, name, email, userAvail };
		// });

		// console.log(users);

		//const transformedUsers = users.map((user) => transformObject(user));

		//console.log(transformedUsers);

		res.status(200).json({ message: "Data processed and sent successfully " });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while processing and sending the data",
		});
	}
};
