const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../models/task");
const cookie = require("cookie");
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
        const resUser = { username: user[0].userName, email: user[0].email };
        const token = jwt.sign(resUser, process.env.JWTPIN);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", jwt, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
          })
        );
        res.json({ authToken: token });
      } else {
        res.json({ message: "invalid user name or password" });
        console.log("user name or password invalid");
      }
    } else {
      console.log("error");
      res.json({ message: "invalid user name or password" });
    }
  } else {
    console.log("error");
    res.json("error");
  }
});

module.exports = router;
