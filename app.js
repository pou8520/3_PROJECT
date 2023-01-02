const express = require('express');
const app = express();
const router = require('./routes')
require('dotenv').config();

app.use(express.static('./assets'));

app.use('/api', express.json(), express.urlencoded({ extended: false }), [router]);


app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

