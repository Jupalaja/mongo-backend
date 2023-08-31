import { getUsers } from "../controllers/userController.js";

export const sendUsers = async (req, res) => {

    try {
        const usersList = await getUsers(req, res, true);

        console.log("The students Object")

        const users = usersList.map((user) => {
            const { userId, apiKey, name, email, userAvail } = user
            return { userId, apiKey, name, email, userAvail }
        })

        console.log(users)

        res.status(200).json({ message: "Data processed and sent successfully "});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while processing and sending the data" });
    }
};

function processData(data){

}