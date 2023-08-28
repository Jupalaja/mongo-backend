import mongoose from "mongoose";

const availSchema = new mongoose.Schema(
	{
		startTime: { type: String },
		endTime: { type: String },
	},
	{ _id: false }
);

const keySchema = new mongoose.Schema(
	{
		iv: { type: String },
		encryptedData: { type: String },
	},
	{ _id: false }
);

const userSchema = new mongoose.Schema({
	userId: { type: Number, required: true, unique: true },
	apiKey: keySchema,
	username: { type: String, required: true },
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	userAvail: { type: Map, of: [availSchema] },
});

const User = mongoose.model("User", userSchema);

export default User;
