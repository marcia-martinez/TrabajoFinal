import { Router } from "express";
import { gameController } from "../controllers/games.js";
import { verifyAccessToken } from "../middleWare/verifyAccessToken.js";
export const router = Router();


router.get("/", gameController.getAll) 

router.post("/", verifyAccessToken, gameController.createOne) 
router.patch("/:id", verifyAccessToken, gameController.updateOne) 
router.delete("/:id", verifyAccessToken, gameController.deleteOne) 