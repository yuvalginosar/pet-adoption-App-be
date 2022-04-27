import petsAppDb from '../server.js'


async function getUserByEmail(email) {
    try {
    const user = await petsAppDb.from("users_2").where({ email }).first();
      return user;
    } catch {
      return false;
    }
  }


async function addUser(newUser) {
    try{    
        const [newUserId]  = await petsAppDb('users_2').insert(newUser)
        // const userAdded = await petsAppDb('users_2').where({id: newUserId})
        const userAdded = await petsAppDb('users_2').where({email: newUser.email})

        console.log(userAdded)
        return userAdded[0]
    } catch(err){
        console.log(err)
    }
}


export default {getUserByEmail, addUser}