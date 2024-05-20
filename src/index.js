import express, { request, response } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";
import session from "express-session";
import passport from "passport";
const app = express();
app.use(express.json());
app.use(cookieParser("hello-world"));
app.use(
  session({
    secret: "nirjala-shakya",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
const PORT = process.env.PORT || 3000;
app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.sessionID);
  request.session.visited = true; //visited is custom property  it sets a property called visited on the session object
  response.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });
  console.log(request.headers.cookie);
  console.log(request.cookies);
  response.send("Hello World");
});

app.use(passport.initialize())
app.use(passport.session())
app.use("/api/", routes);
// creating middleware
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
