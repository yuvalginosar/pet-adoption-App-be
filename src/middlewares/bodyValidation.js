import Ajv from "ajv";
const ajv = new Ajv()


function bodyValidation(schema){
  try {
    return (req, res, next) => {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        res.status(400).send(validate.errors);
        return;
      }
      next();
    };
  } catch (err) {
    console.log(err);
  }
}
    export default bodyValidation;