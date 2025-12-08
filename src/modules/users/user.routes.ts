import express from "express";
import { usersControllers } from "./user.controller";
const router = express.Router();

router.post("/", usersControllers.createUser);
router.get("/", usersControllers.getUsers);
router.get("/:id", usersControllers.getSingleUser);
router.put("/:id", usersControllers.updateUser);
router.delete("/:id", usersControllers.deleteUser);

export const usersRoutes = router;
