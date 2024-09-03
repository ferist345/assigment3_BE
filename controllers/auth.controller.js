const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Unauthenticated");
    }

    if (!user.verify(password)) {
      throw new Error("Unauthenticated");
    }

    const token = user.generateToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({
      error: "Unauthenticated",
      message: "Invalid email or password",
    });
  }
};
