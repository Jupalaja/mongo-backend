export const WEEK_DAYS = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
};

export function findDate(day, hour) {
	const today = new Date();
	const targetDay = WEEK_DAYS[day.toLowerCase()];
	const [givenHours, givenMinutes] = hour.split(":");

	let date = new Date();
	if (today.getDay() === targetDay && today.getHours() >= Number(givenHours)) {
		date.setDate(today.getDate() + 7);
	} else {
		date.setDate(today.getDate() + ((targetDay - today.getDay() + 7) % 7));
	}
	date.setHours(Number(givenHours) + 5, Number(givenMinutes), 0, 0);

	return new Date(
		date.getTime() - date.getTimezoneOffset() * 60000
	).toISOString();
}
