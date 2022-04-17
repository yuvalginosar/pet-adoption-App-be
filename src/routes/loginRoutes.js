import express from "express"
import loginControllers from "../controllers/loginControllers.js";


const router = express.Router()

router
  .route("/")
  .post(loginControllers.loginUser)


  export default router;