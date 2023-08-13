const jwt = require("jsonwebtoken");
const SECRET = "MRUTYUnjay3";

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res
          .sendStatus(401)
          .json({ message: "Invalid or expired token. Please log in again." });
      }
      req.user = user;
      next();
    });
  } else {
    res
      .sendStatus(403)
      .json({ message: "You do not have permission to access this resource." });
  }
};

module.exports = {
  authenticateJwt,
  SECRET,
};
