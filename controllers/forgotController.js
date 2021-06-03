const UsersModel = require("../models/usersModel");

module.exports = async function (req, res, next) {
  try {
    const updateUser = await UsersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(201).send(updateUser);
  } catch (err) {
    res.status(400).send(err);
  }
};
