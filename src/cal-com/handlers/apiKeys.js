import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { encrypt } from "../utilities/encryption.js";

const API_URL = process.env.API_URL;

const randomString = Math.random().toString(36).substring(2, 7);

export async function idFromApiKey(apiKey) {
	try {
		const response = await axios.get(`${API_URL}/me?apiKey=${apiKey}`);
		if (response.data) {
			const userId = response.data.user.id;
			return userId;
		}
	} catch (err) {
		console.error(`Failed to get User information:`, err);
	}
	return false;
}

export async function createApiKey(apiKey) {
	try {
		const response = await axios.post(`${API_URL}/api-keys?apiKey=${apiKey}`, {
			note: `sherpalKey-${randomString}`,
			expiresAt: null,
		});

		if (response.data) {
			const { userId, key } = response.data.api_key;
			console.info(response.data.message);

			return encrypt(key);
		}
	} catch (err) {
		console.error(`Failed to register key for user:`, err);
	}
}
