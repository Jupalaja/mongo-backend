import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { decrypt } from "../utilities/encryption.js";

const API_URL = process.env.API_URL;

export async function bookVirtual(user) {
	const { eventTypeId, apiKey, title, start, email, name, userId } = user;

	const newEvent = {
		eventTypeId,
		title,
		start,
		timeZone: "America/Bogota",
		language: "es",
		responses: {
			email,
			name,
		},
		metadata: {},
	};

	console.log(newEvent);
	try {
		const response = await axios.post(
			`${API_URL}/bookings?apiKey=${decrypt(apiKey)}`,
			newEvent
		);
		if (response.data) {
			console.info(response.data.message);
		}
	} catch (err) {
		console.error(`Failed to create booking:`, err);
	}
}

export function getVirtualEventInfo(events) {
	return events[0].slug === "virtual" ? events[0].eventId : events[1].eventId;
}
