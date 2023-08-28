import axios from "axios";
import { API_URL } from "./apiKeys.js";

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
