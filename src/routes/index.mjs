import express from "express";
import userRouter from "./users.mjs";
import authRouter from "./auth.mjs";
import passportAuthRouter from "./passportAuth.mjs";
const router = express.Router();

router.use(userRouter);
// router.use(authRouter);
router.use(passportAuthRouter);
export default router;
