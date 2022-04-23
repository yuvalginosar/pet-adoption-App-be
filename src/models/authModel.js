import knex from 'knex'
import {petsAppDb} from '../server.js'

async function login(email, password) {
    try{    
        const user = await petsAppDb.from('users_2').where({email: email, password: password})
        return user[0]
    } catch(err){
        console.log(err)
    }
}


async function addUser(newUser) {
    try{    
        const queryResult  = await petsAppDb.from('users_2').insert(newUser)
        return queryResult 
    } catch(err){
        console.log(err)
    }
}






export default {login, addUser}