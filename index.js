import express, { response } from "express";

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
app.get("/api/users", (request, response) => {
  // console.log(response)
  const { body } = request;

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
  console.log(users)
  return response.status(200).send("Users created successfully");
});
//route parameters
app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad Request Error" });
  }
  const findUser = users.find((user) => user.id === parsedId);
  return response.send(findUser);
  console.log(parsedId);
});
//query parameters

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
