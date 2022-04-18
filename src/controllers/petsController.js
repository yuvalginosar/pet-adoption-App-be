import petsModel from '../models/petsModels.js'


async function addNewPet(req, res, next) {
    try{
        const newPet = {
            type: req.body.type,
            name: req.body.name,
            adoption_status: req.body.adoptionStatus,
            picture: req.body.picture,
            height: req.body.height,
            weight: req.body.weight,
            color: req.body.color,
            bio: req.body.bio,
            hypoallergenic: req.body.hypoallergnic,
            breed: req.body.breed,
        }
        const pet = await petsModel.addPet(newPet)
        res.send(pet)
    } catch (err) {
        next(err)
    }
}

async function editPet(req, res, next) {
    try{
        const newPet = JSON.stringify(req.body)
        res.send(newPet)
    } catch (err) {
        next(err)
    }
}

async function fetchPets(req, res, next) {
    try{
        const q = req.query;
        const fetchedPets = await petsModel.GetPets(q)
        res.send(fetchedPets)
    } catch (err) {
        next(err)
    }
}
async function fetchPetById(req, res, next) {
    try{
        const {id} = req.params
        const pet = await petsModel.GetPets({'pets.id': id})
        res.send(pet)
    } catch (err) {
        next(err)
    }
}
async function adoptOrFoster(req, res, next) {
    try{
        const petid = req.params.id
        const userid = req.body.id
        const type = req.body.type
        const aloPet = {
            userid,
            petid,
            status: type
        }
        console.log(petid, userid, type)
        const action = await petsModel.addPetToUser(aloPet)
        res.send({petid, userid, adoption_status: type})
    } catch (err) {
        next(err)
    }
}

async function returnPet(req, res, next) {
    try{
        const newPet = JSON.stringify(req.body)
        res.send(newPet)
    } catch (err) {
        next(err)
    }
}

async function savePet(req, res, next) {
    try{
        const newPet = JSON.stringify(req.body)
        res.send(newPet)
    } catch (err) {
        next(err)
    }
}

async function deleteSavedPet(req, res, next) {
    try{
        const newPet = JSON.stringify(req.body)
        res.send(newPet)
    } catch (err) {
        next(err)
    }
}

async function fetchUsersPets(req, res, next) {
    try{
        const {id} = req.params
        const usersPets = await petsModel.GetPetsByUserId({userid: id})
        res.send(usersPets)
    } catch (err) {
        next(err)
    }
}



export default {addNewPet, editPet, fetchPets, adoptOrFoster, returnPet, savePet, deleteSavedPet, fetchUsersPets, fetchPetById}
