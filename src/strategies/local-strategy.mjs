import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Desrialize user`);
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
export default passport.use(
  //instance of Strategy class
  new Strategy((username, password, done) => {
    console.log(`Username:${username}`);
    console.log(`Password:${password}`);

    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) {
        throw new Error("User not found");
      }
      if (findUser.password !== password) {
        throw new Error("Invalid credetials");
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
