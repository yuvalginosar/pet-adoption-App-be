import authModel from '../models/authModel.js'
import bcrypt from 'bcrypt'

async function fetchUsers(req, res, next) {
    try{
        res.send("newUser")
    } catch (err) {
        next(err)
    }
}

async function fetchUserById(req, res, next) {
    try{
        res.send("newUser")
    } catch (err) {
        next(err)
    }
}

async function editProfile(req, res, next) {
    try{
        const id = req.user.id
        const detailsToEdit = req.body
        if (detailsToEdit.password) detailsToEdit.password = await bcrypt.hash(req.body.pwd, 10)
        const user = await authModel.editUser(id, detailsToEdit)
        // delete user.id
        // delete user.password
        res.send(user)
    } catch (err) {
        next(err)
    }
}

async function fetchUserFullById(req, res, next) {
    try{
        res.send("newUser")
    } catch (err) {
        next(err)
    }
}

export default {fetchUsers, fetchUserById, editProfile, fetchUserFullById}