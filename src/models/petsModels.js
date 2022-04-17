import knex from 'knex'
import {petsAppDb} from '../server.js'

async function addPet(newPet) {
    try{    
        const queryResult  = await petsAppDb.from('pets').insert(newPet)
        return queryResult 
    } catch(err){
        console.log(err)
    }
}

async function GetPetById(id) {
    try{    
        const queryResult  = await petsAppDb.from('pets').where({id: id})
        return queryResult 
    } catch(err){
        console.log(err)
    }
}
async function GetPets(filter) {
    try{    
        const queryResult  = await petsAppDb.from('pets').where(filter)
        return queryResult 
    } catch(err){
        console.log(err)
    }
}
export default {addPet, GetPetById, GetPets}