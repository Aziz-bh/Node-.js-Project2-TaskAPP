const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");

const Task = require("./models/task");

const User = require("./models/user");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  user
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
app.listen(port, () => {
  console.log("server is up and running at port" + port);
});
