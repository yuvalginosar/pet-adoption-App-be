import petsAppDb from "../server.js";

async function addPet(newPet) {
  const [newPetId] = await petsAppDb.from("pets").insert(newPet);
  const queryResult = await petsAppDb.from("pets").where({ id: newPetId });
  return queryResult;
}

async function GetPetById(id) {
  const queryResult = await petsAppDb.from("pets").where({ "pets.id": id });
  return queryResult;
}
async function GetPets(filter) {
  const queryResult = await petsAppDb.from("pets").where(filter);
  return queryResult;
}
function AlterAdoptionStatus(action) {
  let adoption_status = "";
  switch (action) {
    case "adopt":
      adoption_status = "Adopted";
      break;
    case "foster":
      adoption_status = "Fostered";
      break;
    default:
      adoption_status = "Available";
  }
  return adoption_status;
}
async function deletePetFromUsersDb(id) {
  return petsAppDb.from("user_pets").where({ petid: id }).del();
}
async function addPetToUser(aloPet, currStatus) {
  const petMod = await petsAppDb
    .from("pets")
    .where({ id: aloPet.petid })
    .update({ adoption_status: AlterAdoptionStatus(aloPet.status) });
  if (aloPet.status === "adopt") {
    await deletePetFromUsersDb(aloPet.petid);
    const queryResult = await petsAppDb.from("user_pets").insert(aloPet);
    return queryResult;
  } else {
    if (currStatus === "save") {
      const queryResult = await petsAppDb
        .from("user_pets")
        .where({ petid: aloPet.petid, userid: aloPet.userid })
        .update({ status: aloPet.status });
      return queryResult;
    } else {
      const newAction = await petsAppDb
        .from("user_pets")
        .insert({
          petid: aloPet.petid,
          userid: aloPet.userid,
          status: aloPet.status,
        });
        return newAction
    }
  }
}

async function RemovePetFromUser(petId, userId) {
  const petMod = await petsAppDb
    .from("pets")
    .where({ id: petId })
    .update({ adoption_status: "Available" });
  const queryResult = await petsAppDb
    .from("user_pets")
    .where({ petid: petId, userid: userId })
    .del();
  return queryResult;
}
async function GetPetsByUserId(userId) {
  const queryResult = await petsAppDb
    .from("user_pets")
    .join("pets", "user_pets.petid", "pets.id")
    .select("user_pets.status", "pets.*")
    .where(userId);
  return queryResult;
}
async function addSavedPetToUser(savePetDetails) {
  const queryResult = await petsAppDb.from("user_pets").insert(savePetDetails);
  return queryResult;
}

async function removeSavedPet(petToDelete) {
  console.log(petToDelete.petId, petToDelete.userId);
  const queryResult = await petsAppDb
    .from("user_pets")
    .where({ petid: petToDelete.petId, userid: petToDelete.userId })
    .del();
  return queryResult;
}
async function modPet(id, detailsToEdit) {
  const response = await petsAppDb("pets").where({ id }).update(detailsToEdit);
  const petEdited = await petsAppDb("pets").where({ id });
  return petEdited[0];
}

async function GetPetStatusByUserAndPetId(userId, petId) {
  const queryResult = await petsAppDb
    .from("user_pets")
    .select("user_pets.status")
    .where({ userid: userId, petid: petId });
  return queryResult;
}
export default {
  addPet,
  GetPets,
  addPetToUser,
  GetPetsByUserId,
  addSavedPetToUser,
  removeSavedPet,
  RemovePetFromUser,
  modPet,
  GetPetById,
  GetPetStatusByUserAndPetId,
};
