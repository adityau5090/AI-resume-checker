const mongoose = require("mongoose")

async function connectDB(){
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("DB connected")
        // console.log(connection)
    } catch (error) {
        console.error("DB Connnection failed :", error)
        process.exit(1);
    }  
}

module.exports = { connectDB }