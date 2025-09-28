import z from "zod";

export const registerSchema = z.object({
    username: z.string({required_error: "Name is Required"}).trim().min(3, {message: "Name must be at least 3 characters"}).max(30, {message: "Name must be less than 30 characters"}),
    email: z.string({required_error: "Email is Required"}).trim().email({message: "Invalid Email Address"}).min(5, {message: "Email must be at least 5 characters"}).max(50, {message: "Email must be less than 50 characters"}),
    phone: z.string({required_error: "Phone is Required"}).trim().min(10, {message: "Phone must be at least 10 characters"}).max(20, {message: "Phone must be less than 20 characters"}),
    password: z.string({required_error: "Password is Required"}).trim().min(6, {message: "Password must be at least 6 characters"}).max(20, {message: "Password must be less than 20 characters"}),
})

export const loginSchema = z.object({
    email: z.string({required_error: "Email is Required"}).trim().email({message: "Invalid Email Address"}).min(5, {message: "Email must be at least 5 characters"}).max(50, {message: "Email must be less than 50 characters"}),
    password: z.string({required_error: "Password is Required"}).trim().min(6, {message: "Password must be at least 6 characters"}).max(20, {message: "Password must be less than 20 characters"}),
})