const express = require("express");
const router = express.Router();

const users = require("../models/task");

router.get("/", async (req, res) => {
  const user = await users.find();
  console.log(user[0].userName);

  res.json(user);
});

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  const empy = [];
  const user = await users.find({ userName: userName });
  console.log(user);

  if (Object.keys(user).length !== 0) {
    if (user[0].userName === userName) {
      if (user[0].password === password) {
        res.json(user[0]);
      } else {
        res.json("error");
        console.log(
          "la contraseña que pasate es " +
            user.password +
            " pero era " +
            password
        );
      }
    } else {
      console.log("error");
      res.json("error");
    }
  } else {
    console.log("error");
    res.json("error");
  }
});

module.exports = router;
