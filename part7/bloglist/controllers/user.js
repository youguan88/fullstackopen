const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const hashedPW = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username: username,
    password: hashedPW,
    name: name,
  });

  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
