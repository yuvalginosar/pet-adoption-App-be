import authModel from '../models/authModel.js'
import bcrypt from 'bcrypt';

async function signUpNewUser(req, res, next) {
    try{
        const newUser = {
            first_name: req.body.firstName, 
            last_name: req.body.lastName, 
            phone: req.body.phoneNumber, 
            password: await bcrypt.hash(req.body.pwd, 10), 
            email: req.body.email
        }
        const user = await authModel.addUser(newUser)
        delete user.password
        res.send(user)
    } catch (err) {
        next(err)
    }
}

export default {signUpNewUser}


