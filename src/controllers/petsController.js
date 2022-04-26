import petsModel from '../models/petsModels.js'
import { v2 as cloudinary } from 'cloudinary'
import { unlink } from 'fs/promises';

async function addNewPet(req, res, next) {
    try{
        const cloudinaryPath = await cloudinary.uploader.upload(req.file.path)
        console.log(cloudinaryPath)
        try {
            await unlink(req.file.path);
            console.log('successfully deleted ');
          } catch (error) {
            console.error('there was an error:', error.message);
          }
        const newPet = 
        {
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
            dietary_restrictions: req.body.petDietary,
            // picture: req.file ? process.env.HOST + "/" + req.file.path : null,
            picture: cloudinaryPath ? cloudinaryPath.secure_url : null

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
        const currStatus = req.body.curPetStatus
        const aloPet = {
            userid,
            petid,
            status: type,
        }
        console.log(petid, userid, currStatus)
        const action = await petsModel.addPetToUser(aloPet, currStatus)
        res.send({action})
    } catch (err) {
        next(err)
    }
}

async function returnPet(req, res, next) {
    try{
        const petId = req.params.id
        const userId = req.body.id
        const action = await petsModel.RemovePetFromUser(petId, userId)
        res.send('returned succefully')
    } catch (err) {
        next(err)
    }
}

async function savePet(req, res, next) {
    try{

        const petid = req.params.id
        const userid = req.body.id
        const savePetDetails = {
            userid,
            petid,
            status: 'save'
        }
        console.log(savePetDetails)
        const action = await petsModel.addSavedPetToUser(savePetDetails)
        res.send({petid, userid})
    } catch (err) {
        next(err)
    }
}

async function deleteSavedPet(req, res, next) {
    try{
        const petId = req.params.id
        const userId = req.body.id
        console.log(userId)
        const petToDelete = {
            petId,
            userId
        }
        const action = await petsModel.removeSavedPet(petToDelete)
        res.send({petId, userId})
    } catch (err) {
        next(err)
    }
}

async function fetchUsersPets(req, res, next) {
    try{
        const {id} = req.params
        console.log(id)
        const usersPets = await petsModel.GetPetsByUserId({userid: id})
        res.send(usersPets)
    } catch (err) {
        next(err)
    }
}


export default {addNewPet, editPet, fetchPets, adoptOrFoster, returnPet, savePet, deleteSavedPet, fetchUsersPets, fetchPetById}
