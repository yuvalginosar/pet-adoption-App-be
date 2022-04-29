import express from "express"
import userControllers from "../controllers/userControllers.js";
import authenticated from "../middlewares/authenticated.js";


const router = express.Router()

router
  .route("/")
  .get(userControllers.fetchUsers)

router
  .route("/:id")
  .get(userControllers.fetchUserById)
  .put(authenticated, userControllers.editProfile);

router
  .route("/:id/full")
  .get(userControllers.fetchUserFullById)


  export default router;