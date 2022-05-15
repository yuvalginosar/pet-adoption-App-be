import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function loginUser(req, res, next) {
  try {
    const { user, password } = req.body;
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).send("Incorrect password");
      return;
    }
    delete user.password;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    res.send({ user });
  } catch (err) {
    res.status(500).send(err);
  }
}

export default { loginUser };
