import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import {searchUserByEmail} from "../../controllers/userController.js";

const API_URL = process.env.API_URL;
const BASE_URL = process.env.BASE_URL;

export async function addUsersBasicInfo(apiKey) {
	try {
		const response = await axios.get(`${API_URL}/me?apiKey=${apiKey}`);

		if (response.data) {
			const { username, name, email } = response.data.user;

			console.info("User updated in usersdb.json successfully!");
			return {
				username,
				name,
				email,
			};
		}
	} catch (err) {
		console.error(`Failed to get Basic informatin for user:`, err);
	}
}

export async function getUserByEmail(tutorEmail)	{
	try{
		const response = await axios.get(`${BASE_URL}/users/search?email=${tutorEmail}`);
		if (response.data) {
			return response.data
		}
	} catch (error) {
		console.info("There was an error getting the Users information by email");
		console.error(error)
	}
}