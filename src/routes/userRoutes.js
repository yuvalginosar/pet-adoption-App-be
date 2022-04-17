import express from "express"
import userControllers from "../controllers/userControllers.js";


const router = express.Router()

router
  .route("/")
  .get(userControllers.fetchUsers)

router
  .route("/:id")
  .get(userControllers.fetchUserById)
  .put(userControllers.editProfile);

router
  .route("/:id/full")
  .get(userControllers.fetchUserFullById)


  export default router;