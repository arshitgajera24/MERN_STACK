import { model, Schema } from "mongoose";

export const contactSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
}) 

export const Contact = model("Contact", contactSchema);