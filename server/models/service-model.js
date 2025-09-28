import { model, Schema } from "mongoose";

export const serviceSchema = new Schema({
    service: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    provider: {type: String, required: true},
}) 

export const Service = model("Service", serviceSchema);