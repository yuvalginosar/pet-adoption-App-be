import express from "express"
import loginControllers from "../controllers/loginControllers.js";
import bodyValidation from "../middlewares/bodyValidation.js";
import {loginSchema} from "../data/userSchemas.js";
import usersValidations from '../middlewares/usersValidations.js'

const router = express.Router()

router
  .route("/")
  .post(bodyValidation(loginSchema), usersValidations.validateUser, loginControllers.loginUser)


  export default router;