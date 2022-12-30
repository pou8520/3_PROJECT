const express = require('express');
const app = express();
const router = require('./routes')
require('dotenv').config();

app.use('/api',express.json(), router)

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

