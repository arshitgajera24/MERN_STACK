import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";

export const getHome = (req, res) => {
    res.send("Welcome to the Auth Router!");
}

export const postRegister = async (req, res) => {
    try {
        console.log(req.body);
        
        const { username, email, phone, password } = req.body;

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);
        
        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({ message : "Register Success", token: await userCreated.generateToken(), userId: userCreated._id.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const postLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExists = await User.findOne({email});
        if(!userExists) return res.status(400).json({message: "Invalid Credentials"});

        // const isPasswordValid = await bcrypt.compare(password, userExists.password);
        const isPasswordValid = await userExists.comparePassword(password);
        if(isPasswordValid)
        {
            res.status(200).json({
                msg : "Login Success",
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
            })
        }
        else
        {
            res.status(401).json({message:"Invalid Credentials"});
        }
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

export const getUser = async (req, res) => {
    try {
        
        const userData = req.user;
        console.log(userData);
        
        return res.status(200).json({userData})

    } catch (error) {
        console.log(`Error from user Route ${error}`);
        
    }
}