import server from "./src/server.js";
import connectDB from "./src/db.js";

connectDB();
server.listen(3000, () => {
	console.log("Servidor iniciado en el puerto 3000");
});
