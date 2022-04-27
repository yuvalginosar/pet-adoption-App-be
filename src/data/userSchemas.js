const signUpSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        pwd: {type:  "string", minLength: 3},
        ConfirmPwd: {type:  "string", minLength: 3},
        firstName: {type:  "string", minLength: 3},
        lastName: {type:  "string", minLength: 3},
        phoneNumber: {type:  "string", minLength: 3},

    },
    required: ["email", "pwd", "ConfirmPwd", "firstName", "lastName", "phoneNumber"],
    additionalProperties: false,
  };
  

  const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: {type:  "string", minLength: 3},
    },
    required: ["email", "password"],
    additionalProperties: false,
  };
  
  export {loginSchema, signUpSchema};