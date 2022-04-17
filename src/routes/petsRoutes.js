import express from "express"
import petsController from "../controllers/petsController.js";


const router = express.Router()

router
  .route("/")
  .get(petsController.fetchPets)
  .post(petsController.addNewPet)

  router
  .route("/:id")
  .get(petsController.fetchPetById)
  .put(petsController.editPet);

  router
  .route("/:id/adopt")
  .post(petsController.adoptOrFoster)

  router
  .route("/:id/return")
  .post(petsController.returnPet)

  router
  .route("/:id/save")
  .post(petsController.savePet)
  .delete(petsController.deleteSavedPet)

  router
  .route('/user/:id')
  .get(petsController.fetchUsersPets)


export default router;