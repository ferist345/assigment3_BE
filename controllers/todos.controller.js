const { Todo } = require("../models");

exports.index = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.name,
      message: error.message,
    });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.name,
      message: error.message,
    });
  }
};
