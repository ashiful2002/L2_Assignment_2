import express from "express";
import { usersControllers } from "./user.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", usersControllers.createUser);

router.get("/", auth("admin"), usersControllers.getUsers);

router.get("/:id", usersControllers.getSingleUser);
router.put("/:id", auth("admin", "own"), usersControllers.updateUser);
router.delete("/:id", auth("admin"), usersControllers.deleteUser);

export const usersRoutes = router;
//  here have to worn in own user put
