import { Router } from "express";
import * as adminControllers from "../controllers/admin-controllers.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";

const router = Router();

router.route("/users").get(authMiddleware,adminMiddleware, adminControllers.getAllUsers);
router.route("/contacts").get(authMiddleware, adminMiddleware, adminControllers.getAllContacts);

router.route("/users/:id").get(authMiddleware,adminMiddleware, adminControllers.getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);

router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteContactById);

export const adminRoute = router;