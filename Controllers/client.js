const Client = require("../Models/client");
exports.createClient = async (req, res, next) => {
  const { nomboy, prenombody } = req.body;
  try {
    const oldClient = await Client.findOne({ nom, prenom });
    if (oldClient)
      return res.status(409).json("ce client est deja dans notre base");
    else {
      const newClient = await Client.create({
        nom: nomboy,
        prenom: prenombody,
      });
      return res.status(201).json({
        msg: "creation reussie",
        client: newClient,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getAllClient = async (req, res, next) => {
  try {
    const allclients = await Client.find();
    if (allclients.length < 1) return res.status(404).json("aucune donnee");

    return res.status(200).json({ msg: "reussie", data: allclients });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
