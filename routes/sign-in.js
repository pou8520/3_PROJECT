const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { User } = require("../models");

router.post("/sign-in", async (req, res) => {
    const { userid, password } = req.body;

    const user = await User.findOne({ where: { userid, password } });

    if (!user) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
        });
        return;
    }

    const token = jwt.sign({ id: user.id }, "customized-secret-key");
    res.send({
      token,
    });
  });

module.exports = router;