import authModel from '../models/authModel.js'
import jwt from "jsonwebtoken";

async function loginUser(req, res, next) {
    try{
        const {email, password} = req.body
        const currUser = await authModel.login(email, password);
        if(!currUser) {
            res.status(401).send('invalid username or password')
            return
        }
        delete currUser.password;
        res.send(currUser)
    } catch (err) {
        next(err)
    }
}

// async function login(req, res, next) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         res.status(400).send("email or password missing");
//         return;
//       }
//       const user = await authModel.login(req.body.email, req.body.password);
//       if (!user) {
//         res.status(401).send("invalid email or password");
//         return;
//       }
//       delete user.password;
//       const token = jwt.sign(Object.assign({}, user), process.env.JWT_SECRET);
//       res.send({ user, token });
//     } catch (err) {
//       next(err);
//     }
//   }
  



export default {loginUser}
