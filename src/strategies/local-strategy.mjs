import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { users } from "../utils/constants.js";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside Deserialize User");
  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      throw new Error("User not found");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) {
        return done(null, false, { message: "User not found" });
      }
      if (findUser.password !== password) {
        return done(null, false, { message: "Invalid credentials" });
      }
      return done(null, findUser);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
