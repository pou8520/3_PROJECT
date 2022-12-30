const express = require('express');
const app = express();


require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

