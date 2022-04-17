import authModel from '../models/authModel.js'

async function signUpNewUser(req, res, next) {
    try{
        const newUser = {
            first_name: req.body.firstName, 
            last_name: req.body.lastName, 
            phone: req.body.phoneNumber, 
            password: req.body.pwd, 
            email: req.body.email
        }
        const user = await authModel.addUser(newUser)
        res.send(user)
    } catch (err) {
        next(err)
    }
}

export default {signUpNewUser}


