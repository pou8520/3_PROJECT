const express = require('express');
const app = express();
const router = require('./routes')
require('dotenv').config();

const orderRouter = require("./routes/order_router");


//화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



//웹페이지 렌더링
app.get('/tests', (req, res) => {
    res.render('test.html')
});

app.get('/testOrder', (req, res) => {
    connection.query('select')
    res.render('test_orders', {title:"test Order"});
});




//미들웨어
app.use(express.static('./assets'));
app.use('/api',express.json(), express.urlencoded({extended: false}), router);
app.use('/orders', orderRouter);



app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

