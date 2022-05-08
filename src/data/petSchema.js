const newPetSchema = {
    type: "object",
    properties: {
        type: { type: "string" },
        name: {type:  "string", minLength: 3, maxLength: 30},
        adoptionStatus: {type:  "string"},
        height: {type:  "string"},
        weight: {type:  "string"},
        color: {type:  "string"},
        breed: {type:  "string"},
        bio: {type:  "string"},
        petDietary: {type:  "string"},
        picture: {type:  "string"},
    },
    required: ["type", "name", "adoptionStatus", "height", "weight", "color", 'breed'],
    additionalProperties: {type: 'string'}
  };
  
  const editPetSchema = {
    type: "object",
    properties: {
        type: { type: "string" },
        name: {type:  "string", minLength: 3, maxLength: 30},
        adoptionStatus: {type:  "string"},
        height: {type:  "string"},
        weight: {type:  "string"},
        color: {type:  "string"},
        breed: {type:  "string"},
        bio: {type:  "string"},
        petDietary: {type:  "string"},
        picture: {type:  "string"},
    },
  };

  
  export {newPetSchema, editPetSchema};