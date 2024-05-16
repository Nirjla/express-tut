import express from "express";
import userRouter from "./users.mjs";
const router = express.Router();

router.use(userRouter);

export default router;
