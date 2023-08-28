import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { encrypt } from "../utils/encryptionUtils.js";

const API_URL = process.env.BASE_URL;
const randomString = Math.random().toString(36).substring(2, 7);

export async function createApiKey() {
	try {
		const response = await axios.post(`${API_URL}/api-keys?apiKey=${apiKey}`, {
			note: `sherpalKey-${randomString}`,
			expiresAt: null,
		});

		if (response.data) {
			const { userId, key } = response.data.api_key;
			console.info(response.data.message);

			return {
				userId,
				apiKey: encrypt(key),
			};
		}
	} catch (err) {
		console.error(`Failed to register key for user:`, err);
	}
}
