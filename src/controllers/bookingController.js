import { getUserEvents } from "../cal-com/handlers/events.js";
import {
	getVirtualEventInfo,
	bookVirtual,
} from "../cal-com/handlers/bookings.js";
import { getUserByEmail } from "../cal-com/handlers/userInfo.js";
import { findDate } from "../cal-com/utilities/dateHelper.js";

export const virtualBooking = async (req, res) => {
	const { tutorEmail, title, day, hour, studentEmail, studentName } = req.body;

	const tutor = await getUserByEmail(tutorEmail);
	const apiKey = tutor.apiKey;
	const isoDate = findDate(day, hour);
	try {
		const events = await getUserEvents({ apiKey });

		console.log(events);
		const eventTypeId = getVirtualEventInfo(events);

		const newBooking = await bookVirtual({
			eventTypeId,
			apiKey,
			title,
			start: isoDate,
			email: studentEmail,
			name: studentName,
		});
		console.log(newBooking);
		res.status(201).json({ message: "Clase creada con éxito" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al agendar la clase" });
	}
};
