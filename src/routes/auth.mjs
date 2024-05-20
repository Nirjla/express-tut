import express, { response } from "express";
import passport from "passport";
import "../strategies/local-strategy.mjs";

const router = express.Router();
router.post("/auth", passport.authenticate("local"), (request, response) => {
  return response.status(200);
});

export default router;
