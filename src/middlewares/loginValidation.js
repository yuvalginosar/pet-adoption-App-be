import Ajv from "ajv";
import loginSchema from "../data/loginSchema.js";
import addFormats from "ajv-formats";
const ajv = new Ajv()
addFormats(ajv);

function loginValidation (req, res, next) {
    console.log(req.body)
    const validate = ajv.compile(loginSchema)

    const valid = validate(req.body)
    if (valid) {
        next();
      } else {
        return res.status(400).send('incorect email or password');
        
      }
    }
    
    export default loginValidation;