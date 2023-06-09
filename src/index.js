const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");
const routerUser = require("./routers/user");
const routerTask = require("./routers/task");
const routerCategory = require("./routers/category");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(routerUser);
app.use(routerTask);
app.use(routerCategory);
app.listen(port, () => {
  console.log("server is up and running at port " + port);
});

const Task = require("./models/task");

const myFunction = async () => {};
myFunction();

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age });
//   const count = await User.countDocuments({ age });
//   return count;
// };

// updateAgeAndCount("646b64dd78697f62719e702d", 2)
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const deleteAndCountTask = async (id) => {
//   await Task.findByIdAndDelete(id);
//   const count = await Task.countDocuments();
//   return count;
// };

// deleteAndCountTask("646b7fc8e46d7a4d152964fe")
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
