const express = require('express');


const orderRouter = require("./routes/order_router")
const app = express();

const router = require('./routes')
require('dotenv').config();



app.use('/api',express.json(), express.urlencoded({extended: false}), router)
app.use('/orders', orderRouter);


app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

