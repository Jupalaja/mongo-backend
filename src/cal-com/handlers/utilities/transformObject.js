export function transformObject(obj) {
	const days = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];

	let transformedObj = {
		name: obj.name,
		email: obj.email,
	};

	for (let i = 0; i <= 6; i++) {
		if (obj.userAvail && obj.userAvail[i] && obj.userAvail[i].length > 0) {
			transformedObj[days[i]] = obj.userAvail[i]
				.map(
					(timeframe) =>
						`${timeframe.startTime.slice(0, -3)}-${timeframe.endTime.slice(
							0,
							-3
						)}`
				)
				.join(", ");
		}
	}

	return transformedObj;
}
