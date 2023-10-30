import axios from "axios";

async function updateAllUsers() {
    try{
        const users = await axios.get('https://mongo-backend-production.up.railway.app/users');
        for(let user of users.data){
            const result = await axios.patch(`https://mongo-backend-production.up.railway.app/users/update-avail/${user._id}`);
            if(result.status === 200) {  // Check if the POST request was successful
                console.log(`User ${user._id} updated successfully.`);
            } else {
                console.log(`Unable to update User ${user._id}.`);
            }
        }
    }catch(error){
        // handle error
        console.log('An error occurred: ', error);
    }
}

updateAllUsers();