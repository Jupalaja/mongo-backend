import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { decrypt } from "./utilities/encryption.js";

const API_URL = process.env.BASE_URL;

async function getScheduleId(user) {
	if (user.schedule) {
		console.info("User already Schedule setted up");
		return;
	}

	const { apiKey } = user;
	let scheduleId;

	try {
		const response = await axios.get(`${API_URL}/schedules`, {
			params: {
				apiKey: decrypt(apiKey),
			},
		});

		if (response.data) {
			const { schedules } = response.data;
			scheduleId = schedules[0].id;
			return scheduleId;
		}
	} catch (err) {
		console.error(`Failed to get schedule information from user:`, err);
	}
}

async function patchUserSchedule(user) {
	const { apiKey } = user;
	const scheduleId = await getScheduleId(user);

	try {
		const response = await axios.patch(
			`${API_URL}/schedules/${scheduleId}`,
			{
				name: "Horario Sherpal",
				timeZone: "America/Bogota",
			},
			{
				params: {
					apiKey: decrypt(apiKey),
				},
			}
		);

		if (response.data) {
			const { id, availability } = response.data.schedule;

			let userAvail = availability.reduce((acc, curr) => {
				curr.days.forEach((day) => {
					if (!acc[day]) {
						acc[day] = [];
					}
					acc[day].push({
						startTime: curr.startTime,
						endTime: curr.endTime,
					});
				});
				return acc;
			}, {});

			console.log("Availability added successfully!");
			return userAvail;
		}
	} catch (err) {
		console.error(`Failed to edit schedule for user:`, err);
	}
}

export default patchUserSchedule;
