import express, { response } from "express";
import passport from "passport";

const router = express.Router();
router.post("/auth", passport.authenticate("local"), (request, response) => {
  console.log(request.body);
  return response.status(200);
});

export default router;
