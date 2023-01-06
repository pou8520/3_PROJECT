const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");



router.post("/sign-up", async (req, res) => {
    const { userid, email, nickname, phone, password, confirmPassword } = req.body;
    const point = 1000000;

    console.log(userid, email, nickname, phone, password, confirmPassword )
    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    }

    const existsUsers = await User.findAll({
        where: {
            [Op.or]: [{ email }, { nickname }],
        },
    });

    if (existsUsers.length) {
        res.status(400).send({
            errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
        });
        return;
    }

    const existsUsers3 = await User.findAll({
        where: {
            [Op.or]: [{ nickname }],
        },
    });
    if (existsUsers3.length) {
        res.status(400).send({
            errorMessage: "중복되는 닉네임 입니다.",
        });
        return;
    }

    const existsUsers5 = await User.findAll({
        where: {
            [Op.or]: [{ userid }],
        },
    });
    if (existsUsers5.length) {
        res.status(400).send({
            errorMessage: "중복되는 ID입니다.",
        });
        return;
    }

    await User.create({ userid, email, nickname, password, phone, point });
    res.status(201).send({ message: "회원가입 성공" });
});

module.exports = router;