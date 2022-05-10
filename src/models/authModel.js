import petsAppDb from "../server.js";

async function getUserByEmail(email) {
  const user = await petsAppDb.from("users").where({ email }).first();
  return user;
}

async function addUser(newUser) {
  const [newUserId] = await petsAppDb("users").insert(newUser);
  const userAdded = await getUserById(newUserId);
  return userAdded;
}

async function editUser(id, detailsToEdit) {
  const response = await petsAppDb("users").where({ id }).update(detailsToEdit);
  const userAdded = await getUserById(id);
  return userAdded;
}

async function getUsers() {
  const users = await petsAppDb("users").select(
    "id",
    "first_name",
    "last_name",
    "email",
    "phone",
    "is_admin"
  );
  return users;
}
async function getUserById(id) {
  const user = await petsAppDb
    .from("users")
    .where({ id })
    .select("id", "first_name", "last_name", "email", "phone", "is_admin")
    .first();
  return user;
}

export default { getUserByEmail, addUser, editUser, getUsers, getUserById };
