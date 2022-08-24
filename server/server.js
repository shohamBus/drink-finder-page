const express = require("express");
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(express.static("../build"));
}
app.use(cors());
app.use(express.json());

const db = mongoose.model("Users", {
  id: String,
  name: String,
  email: String,
  cocktails: [],
});

//get all users
app.get("/api/users", (req, res) => {
  db.find().then((data) => res.send(data));
});

//creat new user
app.post("/api/users", (req, res) => {
  const { googleId: id, name, email } = req.body;
  db.insertMany({ id, name, email, "cocktails": [] }).then((data) =>
    res.send(data)
  );
});

//delete by id
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    db.findByIdAndDelete(id).then((data) => {
      res.send(data);
    });
  }
});
// update
// app.patch("/api/users/", (req, res) => {
//   const { user, display } = req.body;
//   const { cocktails, id } = user;
//   // const { id } = req.params;
//   db.findByIdAndUpdate(id, {
//     // ...user,
//     cocktails: [{ ...cocktails, ...display }],
//   }).then((p) => res.send(p));
//   // .catch((e) => res.send("error", e));
// });

app.get("*", (req, res) => {
  res.sendFile("/../build/index.html");
});
const PORT = process.env.PORT || 8080;
const { ATLAS_URI } = process.env;

mongoose
  .connect(process.env.MONGODB_URI || `${ATLAS_URI}`)
  .then(() => app.listen(PORT));
