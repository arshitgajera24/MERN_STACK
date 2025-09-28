import { Router } from "express";
import { contactForm } from "../controllers/contact-controllers.js";

const router = Router();

router.route("/contact").post(contactForm);

export const contactRoute = router;