
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
        const newUser = JSON.stringify(req.body)
        res.send(newUser)
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