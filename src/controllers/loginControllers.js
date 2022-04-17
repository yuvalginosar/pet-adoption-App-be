import authModel from '../models/authModel.js'
async function loginUser(req, res, next) {
    try{
        const {email, password} = req.body
        const currUser = await authModel.login(email, password);
        if(!currUser) {
            res.status(401).send('invalid username or password')
            return
        }
        res.send(currUser)
    } catch (err) {
        next(err)
    }
}

export default {loginUser}
