import dotenv from "dotenv";
dotenv.config();

export default {
	mongoURI: process.env.MONGO_URL,
};
