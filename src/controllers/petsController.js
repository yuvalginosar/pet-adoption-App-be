import petsModel from "../models/petsModels.js";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs/promises";

async function addNewPet(req, res, next) {
  try {
    let cloudinaryPath;
    if (req.file) {
      cloudinaryPath = await cloudinary.uploader.upload(req.file.path);
      try {
        await unlink(req.file.path);
        console.log("successfully deleted ");
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
    const newPet = {
      type: req.body.type,
      name: req.body.name,
      adoption_status: req.body.adoptionStatus,
      picture: req.body.picture,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
      bio: req.body.bio,
      breed: req.body.breed,
      dietary_restrictions: req.body.petDietary,
      picture: cloudinaryPath ? cloudinaryPath.secure_url : null,
    };
    if (req.body.hypoallergenic === "false") newPet.hypoallergenic = false;
    else if (req.body.hypoallergenic === "true") newPet.hypoallergenic = true;
    const pet = await petsModel.addPet(newPet);
    if (!pet) {
      throw new Error();
    } else {
      res.status(201).send("successfully added");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editPet(req, res, next) {
  try {
    let cloudinaryPath;
    if (req.file) {
      cloudinaryPath = await cloudinary.uploader.upload(req.file.path);
      await unlink(req.file.path);
    }
    const { id } = req.params;
    const detailsToEdit = req.body;
    if (detailsToEdit.hypoallergenic === "false") {
      detailsToEdit.hypoallergenic = false;
    } else if (detailsToEdit.hypoallergenic === "true") {
      detailsToEdit.hypoallergenic = true;
    }
    delete detailsToEdit.image;
    cloudinaryPath ? (detailsToEdit.picture = cloudinaryPath.secure_url) : null;
    const pet = await petsModel.modPet(id, detailsToEdit);
    res.send(pet);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function fetchPets(req, res, next) {
  try {
    const q = req.query;
    const fetchedPets = await petsModel.GetPets(q);
    if (!fetchedPets) {
      return res.status(404).send();
    }
    res.send(fetchedPets);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function fetchPetById(req, res, next) {
  try {
    const { id } = req.params;
    const pet = await petsModel.GetPetById(id);
    if (!pet) {
      return res.status(404).send();
    }
    res.send(pet);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function adoptOrFoster(req, res, next) {
  try {
    const petid = req.params.id;
    const userid = req.body.id;
    const type = req.body.type;
    const currStatus = req.body.curPetStatus;
    const aloPet = {
      userid,
      petid,
      status: type,
    };
    const action = await petsModel.addPetToUser(aloPet, currStatus);
    if (!action) {
      return res.status(400).send();
    }
    res.status(201).send("added succefully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function returnPet(req, res, next) {
  try {
    const petId = req.params.id;
    const userId = req.body.id;
    const action = await petsModel.RemovePetFromUser(petId, userId);
    if (!action) {
      return res.status(400).send();
    }
    res.status(201).send("returned succefully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function savePet(req, res, next) {
  try {
    const petid = req.params.id;
    const userid = req.body.id;
    const savePetDetails = {
      userid,
      petid,
      status: "save",
    };
    const action = await petsModel.addSavedPetToUser(savePetDetails);
    if (!action) {
      return res.status(400).send();
    }
    res.status(201).send("saved succefully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteSavedPet(req, res, next) {
  try {
    const petId = req.params.id;
    const userId = req.body.id;
    const petToDelete = {
      petId,
      userId,
    };
    const action = await petsModel.removeSavedPet(petToDelete);
    if (!action) {
      return res.status(400).send();
    }
    res.status(201).send("deleted succefully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function fetchUsersPets(req, res, next) {
  try {
    const { id } = req.params;
    const usersPets = await petsModel.GetPetsByUserId({ userid: id });
    if (!usersPets) {
      return res.status(404).send();
    }
    res.send(usersPets);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function getStatusByIds(req, res, next) {
  try {
    const petId = req.params.petId;
    const userId = req.params.userId;
    const status = await petsModel.GetPetStatusByUserAndPetId(userId, petId);
    if (!status) {
      return res.status(404).send();
    }
    res.send(status);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export default {
  addNewPet,
  editPet,
  fetchPets,
  adoptOrFoster,
  returnPet,
  savePet,
  deleteSavedPet,
  fetchUsersPets,
  fetchPetById,
  getStatusByIds,
};
