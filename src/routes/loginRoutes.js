import express from "express"
import loginControllers from "../controllers/loginControllers.js";
import loginValidation from "../middlewares/loginValidation.js";

const router = express.Router()

router
  .route("/")
  .post(loginValidation, loginControllers.loginUser)


  export default router;