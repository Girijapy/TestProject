import express from "express";

import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from "./UserController.js";
import cors from "cors";
import {
  add,
  subtract
} from "../Math/mathController.js";

import connectDB from "../Database/dbConnection.js";

connectDB();

const app = express();
app.use(cors(
  {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }
));


app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.ip);
  res.send("Hello World! I am the endpoint /");
});

app.get("/add/:a/:b", (req, res) => {
  res.send(String(add(req.params.a, req.params.b)));
});

app.get("/subtract/:a/:b", (req, res) => {
  res.send(String(subtract(req.params.a, req.params.b)));
});

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/user", async (req, res) => {
    try {
        const user = await getUser(req.query.id);
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post("/users", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.put("/users", async (req, res) => {
  try {
    const user = await updateUser(req.query.name, req.body);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.delete("/users", async (req, res) => {
  try {
    const user = await deleteUser(req.query.name);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});