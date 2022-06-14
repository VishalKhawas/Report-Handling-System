const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
  },
  section: {
    type: String,
  },
  password: {
    type: String,
  },
  oops: {
    type: Number,
  },
  dsa: {
    type: Number,
  },
  maths: {
    type: Number,
  },
  softskills: {
    type: Number,
  },
});

const studentdb = mongoose.model("studentdb", schema);

module.exports = studentdb;
