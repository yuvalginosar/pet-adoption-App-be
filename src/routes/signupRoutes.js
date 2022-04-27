import express from "express"
import signupController from "../controllers/signupController.js";
import encryptPwd from "../middlewares/encryptPassword.js";
import {signUpSchema} from "../data/userSchemas.js";
import bodyValidation from "../middlewares/bodyValidation.js";
import usersValidations from '../middlewares/usersValidations.js'

const router = express.Router()

router
  .route("/")
  .post(bodyValidation(signUpSchema), usersValidations.verifyNewUser, usersValidations.passMatch ,signupController.signUpNewUser)



export default router;