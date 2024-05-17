import { checkSchema, validationResult } from "express-validator";
import {
  createUserValidation,
  queryValidation,
} from "../utils/validationSchemas.mjs";
import { users } from "../utils/constants.mjs";
import express from "express";
import { resolvedByUserId } from "../utils/middlewares.mjs";
const router = express.Router();

router.get(
  "/users",
  //   loggingMiddleware,
  checkSchema(queryValidation),
  (request, response) => {
    const result = validationResult(request);
    // console.log(result);
    // if (!result.isEmpty()) {
    //   return response.status(400).send({ errors: result.array() });
    // }
    //query parameters
    // console.log(request.session)
    console.log(request.sessionID);
    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });
    // console.log(request.signedCookies);
    const { filter, value } = request.query;
    if (!filter && !value) {
      if (
        request.signedCookies.hello &&
        request.signedCookies.hello === "world"
      )
        return response.send(users);
      else {
        return response.send("The invalid cookie").status("403");
      }
    }
    if (filter && value) {
      const filteredUsers = users.filter((user) =>
        user[filter].includes(value)
      );
      return response.send(filteredUsers);
    }
    console.log(request.query);
  }
);

router.post(
  "/users",
  checkSchema(createUserValidation),
  (request, response) => {
    // console.log(request.body);
    const result = validationResult(request); //it extracts the validation errors of an express request
    console.log(result);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }
    const data = matchedData(request); //extrcts the data validated or sanitized from the request
    // const { body } = request;
    const newUser = { id: users.length + 1, ...data };
    users.push(newUser);
    console.log(users);
    return response.status(200).send("Users created successfully");
  }
);
//route parameters
router.get("/users/:id", resolvedByUserId, (request, response) => {
  const { userIndex } = request;
  const findUser = users[userIndex];
  if (!findUser) {
    return response.status(404).send("User Not Found");
  }
  return response.send(findUser);
});

// put request
router.put("/users/:id", resolvedByUserId, (request, response) => {
  const { body, userIndex } = request;
  users[userIndex] = { id: users[userIndex].id, ...body };
  return response.send(users).status(200);
});
0;

// patch requests
router.patch("/users/:id", resolvedByUserId, (request, response) => {
  const { userIndex } = request;
  users[userIndex] = { ...users[userIndex], ...body };
  return response.send(users).status(200);
});

//delete requests
router.delete("/users/:id", (request, response) => {
  const { userIndex } = request;
  users.splice(userIndex, 1);
  return response.send(users).status(200);
});

export default router;
