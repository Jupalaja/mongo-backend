import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(config.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		connection.connection.on("connected", () => {
			console.log("Conexión exitosa a MongoDB");
		});

		connection.connection.on("error", (error) => {
			console.error(`Error al conectar con MongoDB: ${error.message}`);
		});

		connection.connection.on("disconnected", () => {
			console.log("Desconexión de MongoDB");
		});

		connection.connection.on("reconnected", () => {
			console.log("Reconexión exitosa a MongoDB");
		});
	} catch (error) {
		console.error(`Error al conectar con MongoDB: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
