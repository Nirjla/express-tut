import express from "express";
import passport from "passport";
import "../strategies/local-strategy.mjs";
const router = express.Router();
router.post(
  "/passport-auth",
  passport.authenticate("local"),
  (request, response) => {
   return response.status(200);
  }
);
router.get("/passport-auth/status", (request, response)=>{
      console.log(request.user)
})

export default router;
