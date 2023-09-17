export function formatDate(date) {
	return date.toISOString().split("T")[0];
}

/**
 * @param {*} inputDate
 * @returns {Array} [start, end] dates of the next week
 */
function findRange(inputDate) {
	let date;
	if (inputDate) {
		date = new Date(inputDate);
	} else {
		date = new Date();
	}
	const daysUntilendOfNextWeek = 14 - date.getDay();

	let endOfNextWeek = new Date();
	endOfNextWeek.setDate(date.getDate() + daysUntilendOfNextWeek);

	return [formatDate(date), formatDate(endOfNextWeek)];
}

console.log(findRange());
