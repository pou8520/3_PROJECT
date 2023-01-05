const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    console.log('토큰 미들웨어'+authType, authToken)
    // 로그인이 필요합니다 
    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
    }

    // try {
        const { id } = jwt.verify(authToken, "customized-secret-key");
        User.findByPk(id).then((user) => {
            res.locals.user = user;
            next();
        });
    // } catch (err) {
    //     res.status(401).send({
    //         errorMessage: "로그인 후 이용 가능한 기능입니다.",
    //     });
    // }
    // 이미 로그인이 되어있습니다.
    // if (authToken && authType === "Bearer") {
    //     res.status(401).send({
    //         errorMessage: "이미 로그인이 되어있습니다."
    //     })
    //     return;
    // }
    // try {
    //     const { id } = jwt.verify(authToken, "customized-secret-key");
    //     User.findByPk(id).then((user) => {
    //         res.locals.user = user;
    //         next();
    //     });
    // } catch (err) {
    //     res.status(401).send({
    //         errorMessage: "이미 로그인이 되어있습니다.",
    //     });
    // }
};