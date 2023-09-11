import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

let auth;
async function authenticate() {
	if (!auth) {
		auth = await google.auth.getClient({
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});
	}
	return auth;
}

async function getUser() {
	const auth = await authenticate();
	const sheets = google.sheets({ version: "v4", auth });
	const range = `Horarios!A2:M`;

	const { data } = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range,
	});

	const students = data.values.map((row) => {
		const [
			name,
			email,
			monday,
			tuesday,
			wednesday,
			thursday,
			friday,
			saturday,
			sunday,
			elementary,
			middle,
			high,
			zone,
		] = row;

		return {
			name,
			email,
			monday,
			tuesday,
			wednesday,
			thursday,
			friday,
			saturday,
			sunday,
			elementary,
			middle,
			high,
			zone,
		};
	});

	return students;
}

async function addUserRow(newRow) {
	const auth = await authenticate();
	const sheetAPI = google.sheets({ version: "v4", auth });

	const { data } = await sheetAPI.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range: "Horarios",
	});

	const days = [
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];

	const newRowArray = [
		newRow.name,
		newRow.email,
		...days.map((day) => newRow[day] || ""),
	];

	// Compute the cell address where the new row should be inserted
	const rowNumber = data.values.length + 1;
	const rangeToUpdate = `Horarios!A${rowNumber}:I${rowNumber}`;

	await sheetAPI.spreadsheets.values.update({
		spreadsheetId: process.env.SHEET_ID,
		range: rangeToUpdate,
		valueInputOption: "RAW",
		resource: {
			values: [newRowArray],
		},
	});
	return { message: "Row added successfully" };
}

export { getUser, addUserRow };
