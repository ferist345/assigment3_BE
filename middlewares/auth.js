const { verify } = require("jsonwebtoken");
const { User } = require("../models");

exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error("Token not found");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token not found");
    }

    const { id } = verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Invalid user");
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }

  next();
};
