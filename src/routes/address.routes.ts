import express from "express";
import * as addressController from "../controllers/address.controller";

const router = express.Router();

router.get("/address/:user_id", addressController.getAddressByUserId);
router.post("/", addressController.createAddress);
router.patch("/:user_id", addressController.updateAddress);

export default router;
