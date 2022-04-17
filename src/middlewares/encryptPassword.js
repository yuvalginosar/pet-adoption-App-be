import bcrypt from 'bcrypt';
function encryptPwd(req, res, next) {
  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      next(err);
    }
    req.body.hashPassword = hash
  });
}

export default encryptPwd;