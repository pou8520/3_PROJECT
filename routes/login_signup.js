const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");


router.post("/sign-up", async (req, res) => {
    const { userid, email, nickname, phone, password, confirmPassword, } = req.body;

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

    const existsUsers2 = await User.findAll({
        where: {
            [Op.or]: [{ nickname }, { password }],
        },
    });
    if (existsUsers2.length) {
        res.status(400).send({
            errorMessage: "비밀번호 안에 닉네임을 포합하지마세요.",
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
    const existsUsers4 = await User.findAll({
        where: {
            [Op.or]: [{ phone }],
        },
    });
    if (existsUsers4.length) {
        res.status(400).send({
            errorMessage: "번호를 확인해주세요.",
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

    await Users.create({ userid, email, nickname, password, phone });
    res.status(201).send({});
});

// 로그인 API mysql

router.post("/sign-in", async (req, res) => {
    const { userid, password } = req.body;

    const user = await User.findOne({
        where: {
            userid,
        },
    });

    if (!user || password !== user.password) {
        res.status(400).send({
            errorMessage: "아이디 또는 패스워드가 틀렸습니다.",
        });
        return;
    }

    res.send({
        token: jwt.sign({ id: user.id }, "customized-secret-key"),
    });
});

module.exports = router;