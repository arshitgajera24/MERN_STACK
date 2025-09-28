import { Service } from "../models/service-model.js";

export const serviceForm = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response)
        {
            res.status(401).json({msg : "No services Found"});
            return ;
        }
        res.status(200).json({msg : response});

    } catch (error) {
        console.log(`Services : ${error}`);
        
    }
}