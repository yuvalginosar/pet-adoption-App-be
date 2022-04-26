import express from "express"
import signupController from "../controllers/signupController.js";
import encryptPwd from "../middlewares/encryptPassword.js";

const router = express.Router()

router
  .route("/")
  .post(signupController.signUpNewUser)



export default router;