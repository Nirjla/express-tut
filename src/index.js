import express from "express";
import session from "express-session";
import passport from "passport";
import routes from "./routes/auth.mjs";
import "./strategies/local-strategy.mjs";

const app = express();

// Session middleware
app.use(
  session({
    secret: "secret-key",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

app.use("/api", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
