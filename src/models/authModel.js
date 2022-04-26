import knex from 'knex'
import {petsAppDb} from '../server.js'
import bcrypt from 'bcrypt'

// async function login(email, password) {
//     try{    
//         const user = await petsAppDb.from('users_2').where({email: email, password: password})
//         return user[0]
//     } catch(err){
//         console.log(err)
//     }
// }

async function login(email, password) {
    const user = await petsAppDb.from("users_2").where({ email }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return false;
    }
  }



async function addUser(newUser) {
    try{    
        const queryResult  = await petsAppDb.from('users_2').insert(newUser)
        console.log(queryResult)
        return queryResult 
    } catch(err){
        console.log(err)
    }
}






export default {login, addUser}