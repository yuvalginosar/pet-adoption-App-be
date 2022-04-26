const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: {type:  "string", minLength: 3},
    },
    required: ["email", "password"],
    additionalProperties: false,
  };
  
  export default loginSchema;