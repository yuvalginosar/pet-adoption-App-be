import express from "express"
import "dotenv/config";
import petsController from "../controllers/petsController.js";
import multer from "multer";
import authenticated from "../middlewares/authenticated.js";

const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

const router = express.Router()

// router
//   .route("/")
//   .get(petsController.fetchPets)
//   .post(petsController.addNewPet)
router
  .route("/")
  .get(authenticated, petsController.fetchPets)
  .post( upload.single("image"), petsController.addNewPet)

  router
  .route("/:id")
  .get(petsController.fetchPetById)
  .put(petsController.editPet);

  router
  .route("/:id/adopt")
  .post(authenticated, petsController.adoptOrFoster)

  router
  .route("/:id/return")
  .post(authenticated, petsController.returnPet)

  router
  .route("/:id/save")
  .post(authenticated, petsController.savePet)
  .delete(authenticated, petsController.deleteSavedPet)

  router
  .route('/user/:id')
  .get(petsController.fetchUsersPets)


export default router;