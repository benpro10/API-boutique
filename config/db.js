const mongoose = require("mongoose");
require("dotenv").config();

// mongoose
//   .connect(process.env.DB)
//   .then(() => console.log("bd connected successfully"))
//   .catch((error) => console.log(`error : ${error}`));

async function connection() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("bd connected successfully");
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

// module.exports = mongoose;
module.exports = connection ;
