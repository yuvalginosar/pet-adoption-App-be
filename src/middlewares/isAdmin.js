import authModel from '../models/authModel.js'


async function adminAuthentication(req, res, next) {
    const id = req.user.id;
    try {
        const user = await authModel.getUserById(id)
        if (user.is_admin !== 1) {
            res.status(403).send('admin only')
            return
        } 
        next ()
    }
    catch (error) {
        console.log(error)
    }
}   

export default adminAuthentication