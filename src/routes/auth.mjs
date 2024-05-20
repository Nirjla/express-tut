import express, { request, response } from "express";
import { users } from "../utils/constants.mjs";
import { checkSchema, validationResult } from "express-validator";
import { cartValidation } from "../utils/validationSchemas.mjs";

const router = express.Router();
router.post("/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = users.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    return response.status(401).send("Bad Credentials");
  }
  request.session.user = findUser;
  return response.send(findUser);
});

router.get("/auth/status", (request, response) => {
  if (request.session.user) {
    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
      } else {
        console.log(sessionData);
      }
    });
    return response.status(200).send(`hello ${request.session.user.username}`);
  }
  return response.status(401).send("Not Authenticated");
});

// Add item to cart
router.post("/auth/cart", checkSchema(cartValidation), (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.json({ errors: errors.array() });
  }
  if (request.session.user) {
    if (!request.session.cart) {
      request.session.cart = [];
    }
  } else {
    return response .status(401).send("Authentication required");
  }
  const { item } = request.body;
  console.log(request.body);
  if (!item) {
    return response.status(400).json({ message: "Item is required" });
  }

  request.session.cart.push(item);
  return response.status(201).json(request.session.cart);
});

// Get cart items
router.get("/auth/cart", (request, response) => {
  if (request.session.user) {
    const cart = request.session.cart || [];
    return response.json(cart);
  }
  return response.status(401).send("Authentication required");
});

export default router;
