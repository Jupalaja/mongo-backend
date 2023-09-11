import { getUserEvents } from "../cal-com/handlers/events.js";
import {
	getVirtualEventInfo,
	bookVirtual,
} from "../cal-com/handlers/bookings.js";

export const virtualBooking = async (req, res) => {
	const { apiKey, title, start, email, name } = req.body;

	try {
		const events = await getUserEvents({ apiKey });

		console.log(events);
		const eventTypeId = getVirtualEventInfo(events);

		const newBooking = await bookVirtual({
			eventTypeId,
			apiKey,
			title,
			start,
			email,
			name,
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
