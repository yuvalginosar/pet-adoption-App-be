import authModel from "../models/authModel.js";
import petsModels from "../models/petsModels.js";
import bcrypt from "bcrypt";

async function fetchUsers(req, res, next) {
  try {
    const users = await authModel.getUsers();
    if (!users) {
      res.status(404).send();
    }
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editProfile(req, res, next) {
  try {
    const id = req.user.id;
    const detailsToEdit = req.body;
    if (detailsToEdit.password) {
      const pwd = detailsToEdit.password;
      detailsToEdit.password = await bcrypt.hash(pwd, 10);
    }
    const user = await authModel.editUser(id, detailsToEdit);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function fetchUserFullById(req, res, next) {
  try {
    const { id } = req.params;
    const [usersPets, user] = await Promise.all([
      petsModels.GetPetsByUserId({ userid: id }),
      authModel.getUserById(id),
    ]);
    if (!user || !usersPets) {
      res.status(404).send();
    }
    user.pets = usersPets;
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function logoutUser(req, res, next) {
  try {
    res.status(202).clearCookie("token").send("cookie cleared");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default {
  fetchUsers,
  editProfile,
  fetchUserFullById,
  logoutUser,
};
