const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    phoneNumber: String,
    pwd: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("client", clientSchema);
