import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";
import _ from "lodash";

let auth;
async function authenticate() {
	if (!auth) {
		auth = await google.auth.fromJSON({
			type: process.env.TYPE,
			project_id: process.env.PROJECT_ID,
			private_key_id: _.unescape(process.env.PRIVATE_KEY_ID),
			private_key: process.env.PRIVATE_KEY,
			client_email: process.env.CLIENT_EMAIL,
			client_id: process.env.CLIENT_ID,
			auth_uri: process.env.AUTH_URI,
			token_uri: process.env.TOKEN_URI,
			auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
			client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
		});

		auth.scopes = ["https://www.googleapis.com/auth/spreadsheets"];
	}
	return auth;
}

async function getUser() {
	const auth = await authenticate();
	const sheets = google.sheets({ version: "v4", auth });
	const range = `Horarios!A2:O`;

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
			active,
			school,
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
			active,
			school,
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
