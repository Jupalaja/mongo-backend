import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { decrypt } from "../utilities/encryption.js";

const API_URL = process.env.API_URL;

export async function getScheduleId(user) {
	if (user.schedule) {
		console.info("User already Schedule setted up");
		return user.schedule.id;
	}

	const { apiKey } = user;

	try {
		const response = await axios.get(`${API_URL}/schedules`, {
			params: {
				apiKey: decrypt(apiKey),
			},
		});

        if (response.data && response.data.schedules && response.data.schedules.length > 0) {
            return response.data.schedules[0].id;
        } else {
            return null;
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
