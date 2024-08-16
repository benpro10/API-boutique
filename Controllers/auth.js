const jwt = require("jsonwebtoken");
const Client = require("../Models/client");
const bcrypt = require("bcryptjs")

exports.logUp = async (req, res) => {
  const { nom, prenom, phoneNumber, pwd } = req.body;
  try {
    const oldClient = await Client.findOne({ phoneNumber });
    if (oldClient) return res.status(409).send("client exists ");
    
    const hash = await bcrypt.hash(pwd,10)
    const client = await Client.create({
      nom,
      prenom,
      phoneNumber,
      pwd:hash,
    });

    return res.status(201).json({ msg: "client created successfully", client });
  } catch (error) {
    return res.status(500).send(error);
  }
};

//authenticate
exports.login = async  (req,res) =>{

    const { phone,password} = req.body
    try {
        const client = await  Client.findOne({phoneNumber:phone})
        if(!client) return res.status(404).send("password or phone is not correct")
        
            const valid = await bcrypt.compare(password,client.pwd)
            if(!valid) return res.status(404).send("password or phone is not correct")
            
            const payload = {
                id : client._id,
                nom: client.nom,
                prenom: client.prenom,
                phoneNumber: client.phoneNumber
            }

            const token = jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'12h'
            })
            await Client.updateOne({_id:client._id},{token:token})
            delete client.token
            return res.status(200).json({msg:'user connecctde',data:client,token:token})

    } catch (error) {
        return res.status(500).send(error); 
    }
}