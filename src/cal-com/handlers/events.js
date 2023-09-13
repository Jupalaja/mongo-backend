import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { decrypt } from "./utilities/encryption.js";
import { events } from "./utilities/paramObjects.js";

const API_URL = process.env.BASE_URL;

async function getUserEvents(user) {
	const { apiKey } = user;
	try {
		const response = await axios.get(
			`${API_URL}/event-types?apiKey=${decrypt(apiKey)}`
		);

		const events = response.data.event_types;

		if (response.data && events.length !== 0) {
			return events.map((event) => ({
				eventId: event.id,
				title: event.title,
				slug: event.slug,
				description: event.description,
				length: event.length,
				slotInterval: event.slotInterval,
			}));
		} else {
			console.info("User has no events");
		}
	} catch (err) {
		console.error(`Failed to get events for user:`, err);
	}
}

async function deleteEvents(user) {
	const { apiKey } = user;

	try {
		const response = await axios.get(
			`${API_URL}/event-types?apiKey=${decrypt(apiKey)}`
		);

		if (response.data) {
			if (response.data.event_types.length === 0) {
				console.info("User has no events to delete");
				return;
			}
			const deleteOldEvents = response.data.event_types.map((event) => {
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
		const newEvents = events.map((event) => {
			return axios.post(
				`${API_URL}/event-types?apiKey=${decrypt(apiKey)}`,
				event
			);
		});

		console.info("All New events added successfully!");
		return Promise.all(newEvents);
	} catch (err) {
		console.error(`Failed to add events for user:`, err);
	}
}

async function verifyEvents(user) {
	const userEvents = await getUserEvents(user);

	const hasVirtual = userEvents.some((event) => event.slug === "virtual");
	const hasPresencial = userEvents.some((event) => event.slug === "presencial");
	const slugs = userEvents.map((event) => event.slug);

	if (!hasVirtual || !hasPresencial || slugs.length !== 2) {
		await deleteEvents(user);
		await addNewEvents(user);
	} else {
		console.info("User already has the correct events");
	}
}

export { getUserEvents, verifyEvents };
