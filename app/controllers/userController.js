import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al obtener los usuarios" });
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al obtener el usuario" });
	}
};

export const createUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const newUser = new User({ email, password });

		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al crear el usuario" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { email, password } = req.body;

		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		if (email) user.email = email;
		if (password) user.password = password;

		await user.save();
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al actualizar el usuario" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		await user.remove();
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al eliminar el usuario" });
	}
};

export const searchUserByEmail = async (req, res) => {
	try {
		const { email } = req.query;
		const users = await User.find({ email: { $regex: email } });

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Ha ocurrido un error al buscar los usuarios" });
	}
};
