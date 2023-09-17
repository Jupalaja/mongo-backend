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
		if (obj.userAvail && obj.userAvail[i]) {
			let times = obj.userAvail[i].map((timeFrame) => {
				let startTime = timeFrame.startTime.slice(0, -3),
					endTime = timeFrame.endTime.slice(0, -3);

				return `${startTime}-${endTime}`;
			});

			transformedObj[days[i]] = times.join(", ");
		}
	}

	return transformedObj;
}
