import petsAppDb from "../server.js";

async function getUserByEmail(email) {
  try {
    const user = await petsAppDb.from("users").where({ email }).first();
    return user;
  } catch {
    return false;
  }
}

async function addUser(newUser) {
  try {
    const [newUserId] = await petsAppDb("users").insert(newUser);
    const userAdded = await petsAppDb("users").where({ id: newUserId });
    return userAdded[0];
  } catch (err) {
    console.log(err);
  }
}

async function editUser(id, detailsToEdit) {
  try {
    const response = await petsAppDb("users")
      .where({ id })
      .update(detailsToEdit);
    const userAdded = await petsAppDb("users").where({ id });
    return userAdded[0];
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  try {
    const users = await petsAppDb("users").select(
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "is_admin"
    );
    return users;
  } catch (err) {
    console.log(err);
  }
}
async function getUserById(id) {
  try {
    const user = await petsAppDb.from("users").where({ id }).first();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export default { getUserByEmail, addUser, editUser, getUsers, getUserById };
