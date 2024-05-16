import express, { request, response } from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const users = [
  {
    id: 1,
    username: "nirjala",
  },
  {
    id: 2,
    username: "Sita",
  },
];
// creating middleware
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};
const resolvedByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad Request Error" });
  }
  const userIndex = users.findIndex((user) => user.id === parsedId);
  if (userIndex === -1) {
    return response.status(404).send({ msg: "User Not Found" });
  }
  request.userIndex = userIndex;
  next();
};

app.get("/api/users", loggingMiddleware, (request, response) => {
  // console.log(response)
  const { body } = request;
  //query parameters
  const { filter, value } = request.query;
  if (!filter && !value) {
    return response.send(users);
  }
  if (filter && value) {
    const filteredUsers = users.filter((user) => user[filter].includes(value));
    return response.send(filteredUsers);
  }
  console.log(request.query);
});
app.post("/api/users", (request, response) => {
  // console.log(request.body);
  const { body } = request;
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);
  console.log(users);
  return response.status(200).send("Users created successfully");
});
//route parameters
app.get("/api/users/:id",resolvedByUserId, (request, response) => {
  const { userIndex } = request;
  const findUser = users[userIndex];
  if (!findUser) {
    return response.status(404).send("User Not Found");
  }
  return response.send(findUser);
});

// put request
app.put("/api/users/:id", resolvedByUserId, (request, response) => {
  const { body, userIndex } = request;
  users[userIndex] = { id: users[userIndex].id, ...body };
  return response.send(users).status(200);
});

// patch requests
app.patch("/api/users/:id", resolvedByUserId, (request, response) => {
  const { userIndex } = request;
  users[userIndex] = { ...users[userIndex], ...body };
  return response.send(users).status(200);
});

//delete requests
app.delete("/api/users/:id", (request, response) => {
  const { userIndex } = request;
  users.splice(userIndex, 1);
  return response.send(users).status(200);
});

// middleware

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
