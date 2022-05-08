import express from "express"
import userControllers from "../controllers/userControllers.js";
import authenticated from "../middlewares/authenticated.js";
import adminAuthentication from '../middlewares/isAdmin.js'


const router = express.Router()

router
  .route("/")
  .get(authenticated, adminAuthentication,userControllers.fetchUsers)

router
  .route("/:id")
  // .get(userControllers.fetchUserById)
  .put(authenticated, userControllers.editProfile);

router
  .route("/:id/full")
  .get(authenticated, userControllers.fetchUserFullById)

router
  .route("/logout")
  .get(userControllers.logoutUser)

  export default router;