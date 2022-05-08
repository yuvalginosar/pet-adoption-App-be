import authModel from "../models/authModel.js";
import petsModels from "../models/petsModels.js";
import bcrypt from "bcrypt";
// import { all } from 'express/lib/application';

async function fetchUsers(req, res, next) {
  try {
    const users = await authModel.getUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function fetchUserById(req, res, next) {
  try {
    res.send("newUser");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editProfile(req, res, next) {
  try {
    const id = req.user.id;
    const detailsToEdit = req.body;
    if (detailsToEdit.password)
      detailsToEdit.password = await bcrypt.hash(req.body.pwd, 10);
    const user = await authModel.editUser(id, detailsToEdit);
    // delete user.id
    // delete user.password
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function fetchUserFullById(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id, "ani po");
    const [usersPets, user] = await Promise.all([
      petsModels.GetPetsByUserId({ userid: id }),
      authModel.getUserById(id),
    ]);
    // const usersPets = await petsModels.GetPetsByUserId({userid: id})
    // const user = await authModel.getUserById({id: id})
    // const curUser = user[0]
    // curUser.pets = usersPets
    user.pets = usersPets;
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function logoutUser(req, res, next) {
    console.log('hello')
  try {
    res.status(202).clearCookie('token').send('cookie cleared')
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default {
  fetchUsers,
  fetchUserById,
  editProfile,
  fetchUserFullById,
  logoutUser
};
