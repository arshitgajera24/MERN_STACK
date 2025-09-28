import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")
    if(!token) return res.status(401).json({message: "No token, authorization denied..."});

    const jwtToken = token.replace("Bearer ", "");

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({email: isVerified.email}).select({password: 0});

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({message: "No token, authorization denied"});
    }
}