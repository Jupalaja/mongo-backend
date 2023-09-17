import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-ctr";

const secretKey = crypto
	.createHash("sha256")
	.update(String(process.env.SECRET))
	.digest("base64")
	.slice(0, 32);
const iv = crypto.randomBytes(16); // iv should be unique but not secret

function encrypt(text) {
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString("hex"),
		encryptedData: encrypted.toString("hex"),
	};
}

function decrypt(hash) {
	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(hash.iv, "hex")
	);
	const decrypted = Buffer.concat([
		decipher.update(Buffer.from(hash.encryptedData, "hex")),
		decipher.final(),
	]);

	return decrypted.toString();
}


export { encrypt, decrypt };
