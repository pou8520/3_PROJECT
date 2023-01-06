const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { User } = require("../models");

router.post("/sign-in", async (req, res) => {
    console.log(req.body);
    const {userid, password} = req.body;
    // const data = JSON.parse(req.body);
    // console.log(data.userid);
    console.log("테스트입니다");

    const user = await User.findOne({ where: { userid, password } });

    if (!user) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
        });
        return;
    }

    res.send({
        token: jwt.sign({id: user.id}, "customized-secret-key")
    });
    // const token = jwt.sign({ id: user.id }, "customized-secret-key");
    // res.json({token: token});
});

module.exports = router;