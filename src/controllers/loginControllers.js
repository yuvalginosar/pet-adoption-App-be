import authModel from '../models/authModel.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


async function loginUser(req, res, next) {
    try {
        const { user, password } = req.body;
        if (!(await bcrypt.compare(password, user.password))) {
            res.status(401).send('Incorrect password');
            return;
        }
        delete user.password;
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        // delete user.id
        res.cookie("token", token, { httpOnly: true });
        console.log(user)
        res.send({ user});
    } catch (err) {
        res.status(500).send(err);
    }
  }
  



export default {loginUser}
