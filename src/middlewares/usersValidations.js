import authModel from '../models/authModel.js'


function passMatch(req, res, next) {
    const { pwd, ConfirmPwd } = req.body;
    if (pwd !== ConfirmPwd) {
      res.status(400).send('Passwords dont match');
      return;
    }
    next();
  }

async function verifyNewUser(req, res, next) {
    try {
        const { email } = req.body;
        const user = await authModel.getUserByEmail(email);
      if (user) {
        res.status(400).send('User already exists');
        return;
      }
      next();
    } catch (err) {
      console.log(err);
    }
  }



  async function validateUser(req, res, next) {
    try {
        const { email } = req.body;
        const user = await authModel.getUserByEmail(email);
        if (!user) {
            res.status(401).send('email doesnt exist');
            return;
        }
        req.body.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
  }

  export default {validateUser, verifyNewUser, passMatch};