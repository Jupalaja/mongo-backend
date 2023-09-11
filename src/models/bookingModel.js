import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		name: { type: String, required: true },
		metadata: { type: Object },
		location: { type: String },
	},
	{ _id: false }
);

const bookingSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	start: { type: String, required: true },
	eventTypeId: { type: Number, required: true },
	title: { type: String, required: true },
	start: { type: String, required: true },
	timeZone: { type: String, required: true },
	language: { type: String },
	metadata: { type: Object },
	responses: responseSchema,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
