const jwt = require("jwt");
const Client = require("../Models/client");
require('dotenv').config()

async function verifyToken (request,response,next){
    const token = request.body.token || request.query.token || request.headers['authorization']

    if(!token){
        return response.status(403).json({message: 'Token is required'})
    }
try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    request.client = decoded
 
    const client_connected = await Client.findById(request.client.id)
    if(client_connected.token === null){
         return response.status(403).json({message:"token is required"})
    }
    next()
    
} catch (error) {
    return response.status(500).send(error)
}

}

module.exports = verifyToken