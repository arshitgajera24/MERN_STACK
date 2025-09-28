import { Router } from "express";
import { serviceForm } from "../controllers/service-controllers.js";

const router = Router();

router.route("/service").get(serviceForm);

export const serviceRoute = router;