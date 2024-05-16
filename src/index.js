import express from "express";

import  routes  from "./routes/index.mjs";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(routes);
// creating middleware
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
