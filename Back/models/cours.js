const mongoose = require("mongoose");

const coursSchema = mongoose.Schema({
  start: Date,
  end: Date,
  intervenant: String,
  Descritpion : String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Cours = mongoose.model("cours", coursSchema);

module.exports = Cours;
