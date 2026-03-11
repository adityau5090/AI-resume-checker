const jwt = require("jsonwebtoken")
const { blacklistTokenModel } = require("../models/blacklist.model")

const authUser = async (req,res,next) => {
    try {
        const token = req.cookies.token;

        // console.log("Token : ", token)
        if(!token){
            return res.status(401).json({
                message: "Unauthorized token"
            })
        }

        const isTokenBlackListed = await blacklistTokenModel.findOne({ token })

        if(isTokenBlackListed){
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log("Decoded token : ",decoded)
        req.user = decoded;

        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({
                message: "Unauthorized access"
                
        })
    }
}

module.exports = { authUser }