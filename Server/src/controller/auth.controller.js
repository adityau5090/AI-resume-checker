const { userModel } = require("../models/user.module")
const { blacklistTokenModel } = require("../models/blacklist.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerController = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        if(!name.trim() || !email.trim() || !password.trim()){
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const isUserExist = await userModel.findOne({email})
        
        if(isUserExist){
            return res.status(401).json({
                message: "User already exist"
            })
        }

        const user = await userModel.create({
            name,
            email,
            password,
        })

        const token = jwt.sign(
            {   
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3h"}
        )

        res.cookie("token", token)

        return res.status(201).json({
            message: "User registerd successfully",
            data: user,
        })

    } catch (error) {
        console.error("Error in registering user : ",error);
        return res.status(401).json({
            message: "Error in registering",
        }) 
    }
}

const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;

        if(!email.trim() || !password){
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({email}).select("+password")
        
        // console.log(user)
        if(!user){
            return res.status(401).json({
                message: "User does not exist"
            })
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Wrong password"
            })
        }
        // console.log(isPasswordValid)

        const token = jwt.sign(
            {   
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3h"}
        )

        res.cookie("token", token)

        return res.status(201).json({
            message: "User login successfully",
            data: user,
        })

    } catch (error) {
        console.error("Error in login user : ",error);
        return res.status(401).json({
            message: "Error in login",
        }) 
    }
}

const logoutController = async (req,res) => {
    try {
        const token = req.cookies.token;

        if(token){
            await blacklistTokenModel.create({ token })
        }

        res.clearCookie("token")

        return  res.status(201).json({
            message: "Logout successfully"
        })

    } catch (error) {
        console.error("Logout error : ", error);
        return  res.status(401).json({
            message: "Failed to logout"
        })
    }
}

module.exports = { 
    registerController,
    loginController,
    logoutController
}