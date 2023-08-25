import server from "./app/server.js";
import connectDB from "./app/db.js";

connectDB();
server.listen(3000, () => {
	console.log("Servidor iniciado en el puerto 3000");
});
