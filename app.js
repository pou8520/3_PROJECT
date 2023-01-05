const express = require('express');
const app = express();
const router = require('./routes');
require('dotenv').config();
const {User} = require('./models');
const customMiddleware = require('./middlewares/custom-auth-middleware.js');

app.use(express.static('./assets'));
app.use('/images',express.static('images'));
app.use('/api',express.json(),express.urlencoded({extended: false}), [router]);
app.use(express.json(),express.urlencoded({extended: false}))

// app.post('/api/orders/coin', customMiddleware, async (req, res) => {
//     const user_Id = res.locals.user
//     console.log('로그인 유저 : '+user_Id)

//     const user_coin = await User.findOne({
//         where: {
//             id: user_Id
//         }
//     })
//     console.log('유저 코인'+ user_coin)
//     res.status(200).send({"coin": user_coin})
// })

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});