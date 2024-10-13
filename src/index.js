const express = require("express");

const { connectDB } = require("./config/database");

const { User } = require("./models/user");

const app = express();

app.use(express.json());

app.post("/api/signup", async (req, res) => {
  const user = new User(req.body);
  /*
adding user manually to the database
  const user = new User({
    firstName: "Pam",
    lastName: "Beesley",
    email: "pam@dunderMiflin.com",
    password: "Jim@123",
    age: 36,
    gender: "Female",
  });
    */

  try {
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(401).send({ message: "failed to create user" });
  }
});

app.get("/api/getUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: "Bad request" });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => console.log("Listening on Port 4000"));
  })
  .catch(() => {
    console.log("Failed to connect to Database");
  });
