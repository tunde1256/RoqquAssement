import express from "express";
import * as userController from "../controllers/user.controller";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/count", userController.getUserCount);
router.get("/:id", userController.getUserById);
router.post("/", validateUser, userController.createUser); 
export default router;
