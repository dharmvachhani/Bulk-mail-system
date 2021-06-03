const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email used"],
  },
  number: {
    type: Number,
    unique: [true, "Number used"],
  },
  cname: {
    type: String,
  },
  date: {
    type: Date,
  },
  category: {
    type: String,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
