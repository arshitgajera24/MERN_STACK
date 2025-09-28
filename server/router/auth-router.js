import { Router } from 'express';
import * as authControllers from '../controllers/auth-controllers.js';
import { validate } from '../middlewares/validate-middleware.js';
import { loginSchema, registerSchema } from '../validators/auth-validators.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();

router.route("/").get(authControllers.getHome);
router.route("/register").post(validate(registerSchema), authControllers.postRegister);
router.route("/login").post(validate(loginSchema), authControllers.postLogin);

router.route("/user").get(authMiddleware, authControllers.getUser);


export const authRoute = router;