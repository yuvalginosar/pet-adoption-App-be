import knex from 'knex'
import petsAppDb from '../server.js'

// async function addPet(newPet, dietary) {
//     try{    
//         const queryResult  = await petsAppDb.from('pets').insert(newPet)
//         const newPetRestrictions = 
//         return queryResult 
//     } catch(err){
//         console.log(err)
//     }
// }
async function addPet(newPet) {
    try{    
        const [queryResult]  = await petsAppDb.from('pets').insert(newPet)
        console.log(queryResult) 
    } catch(err){
        console.log(err)
    }
}




// async function GetPetById(id) {
//     try{    
//         const queryResult  = await petsAppDb.from('pets').where({id: id})
//         return queryResult 
//     } catch(err){
//         console.log(err)
//     }
// }
async function GetPets(filter) {
    // try{    
    //     const queryResult  = await petsAppDb.from('pets').where(filter)
    //     return queryResult 
    // } catch(err){
    //     console.log(err)
    // }
    try{    
        const queryResult  = await petsAppDb.from('pets').where(filter)
        .select('user_pets.status', 'user_pets.userid','pets.*')
        .leftJoin('user_pets', 'pets.id', 'user_pets.petid')
        return queryResult 
    } catch(err){
        console.log(err)
    }
}
function AlterAdoptionStatus(action) {
    let adoption_status = ''
    switch(action) {
        case 'adopt':
            adoption_status = 'Adopted'
          break;
        case 'foster':
            adoption_status = 'Fostered'
          break;
        default:
            adoption_status = 'Available'
      }
    return adoption_status
}
async function addPetToUser(aloPet, currStatus) {
    try{  
        console.log(currStatus)
        const petMod = await petsAppDb.from('pets').where({id: aloPet.petid}).update({adoption_status: AlterAdoptionStatus(aloPet.status)})
        if (!currStatus){
            const queryResult  = await petsAppDb.from('user_pets').insert(aloPet)
            return queryResult 
        }
        else {
            const queryResult  = await petsAppDb.from('user_pets').where({petid: aloPet.petid, userid: aloPet.userid}).update({status: aloPet.status})
            return queryResult 

        }
    } catch(err){
        console.log(err)
    }
}

async function RemovePetFromUser(petId, userId) {
    try{  
        const petMod = await petsAppDb.from('pets').where({id: petId}).update({adoption_status: 'Available'})
        const queryResult  = await petsAppDb.from('user_pets').where({petid:petId, userid: userId}).del()
    } catch(err){
        console.log(err)
    }
}
async function GetPetsByUserId(userId) {
    try{    
        const queryResult  = await petsAppDb.from('user_pets')
            .join('pets', 'user_pets.petid', 'pets.id')
            .select('user_pets.status', 'pets.*')
            .where(userId)
            console.log(queryResult)
        return queryResult 
    } catch(err){
        console.log(err)
    }
}
async function addSavedPetToUser(savePetDetails) {
    try{    
        const queryResult  = await petsAppDb.from('user_pets').insert(savePetDetails)
        return queryResult 
    } catch(err){
        console.log(err)
    }
}

async function removeSavedPet(petToDelete) {
    console.log(petToDelete)
    try{    
        console.log(petToDelete.petId, petToDelete.userId)
        const queryResult  = await petsAppDb.from('user_pets').where({petid: petToDelete.petId, userid: petToDelete.userId}).del()
        return queryResult 
    } catch(err){
        console.log(err)
    }
}
export default {addPet, GetPets, addPetToUser, GetPetsByUserId, addSavedPetToUser, removeSavedPet, RemovePetFromUser}