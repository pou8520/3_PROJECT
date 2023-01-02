const express = require('express');
require('dotenv').config();


const orderRouter = require("./routes/orders")
const app = express();


app.use(express.json());  //JSON 형태의 데이터 처리하기 위한 설정
app.use('/orders', ordersRouter);

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

