import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { decrypt } from "./utilities/encryption.js";
import { events } from "./utilities/paramObjects.js";

const API_URL = process.env.BASE_URL;

async function userHasTheCorrectEvents(user) {
	const { apiKey } = user;
	let hasVirtual;
	let hasInPerson;
	let slugs = [];

	try {
		const response = await axios.get(
			`${API_URL}/event-types?apiKey=${decrypt(apiKey)}`
		);

		if (response.data) {
			const eventTypes = response.data.event_types;

			if (response.data.event_types.length === 0) {
				console.info("User has no events");
				return false;
			}

			slugs = eventTypes.map((event) => event.slug);
			hasVirtual = eventTypes.some((event) => event.slug === "virtual");
			hasInPerson = eventTypes.some((event) => event.slug === "presencial");
		}
	} catch (err) {
		console.error(`Failed to verify events for user:`, err);
	}
	return hasVirtual && hasInPerson && slugs.length === 2;
}

async function deleteEvents(user) {
	const { apiKey } = user;

	try {
		const response = await axios.get(
			`${API_URL}/event-types?apiKey=${decrypt(apiKey)}`
		);

		if (response.data) {
			const eventTypes = response.data.event_types;

			let deleteOldEvents = eventTypes.map((event) => {
				return axios.delete(
					`${API_URL}/event-types/${event.id}?apiKey=${decrypt(apiKey)}`
				);
			});
			console.info("All old events deleted successfully!");
			return Promise.all(deleteOldEvents);
		}
	} catch (err) {
		console.error(`Failed to delete events for user:`, err);
	}
}

async function addNewEvents(user) {
	const { apiKey } = user;

	try {
		let newEvents = events.map((event) => {
			return axios.post(
				`${API_URL}/event-types?apiKey=${decrypt(apiKey)}`,
				event
			);
		});

		console.info("All New events added successfully!");
		return Promise.all(newEvents);
	} catch (err) {
		console.error(`Failed to delete events for user:`, err);
	}
}

async function verifyEvents(user) {
	const userHasEvents = await userHasTheCorrectEvents(user);

	if (!userHasEvents) {
		await deleteEvents(user);
		await addNewEvents(user);
	} else {
		console.info("User already has the correct events");
	}
}

export default verifyEvents;
