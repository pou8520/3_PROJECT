const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { OwnerUsers } = require("../models");

router.post("/owner-sign-in", async (req, res) => {
    console.log(req.body);
    const { userid, password } = req.body;
    // const data = JSON.parse(req.body);
    // console.log(data.userid);
    console.log("테스트입니다");

    const user = await OwnerUsers.findOne({ where: { userid, password } });

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