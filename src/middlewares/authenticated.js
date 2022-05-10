import jwt from "jsonwebtoken";

function authenticated(req, res, next) {
  try {
    const token = req.cookies.token;
    const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = authenticatedUser;
    next();
  } catch (err) {
    res.status(401).send();
  }
}

export default authenticated;