const express = require('express');
const app = express();
const router = require('./routes');
const signupRouter = require('./routes/sign-up');
const signinRouter = require('./routes/sign-in');
const bodyParser = require('body-parser')

require('dotenv').config();

app.use(bodyParser.json())
app.use(express.static('./assets'));
app.use(express.json());


app.use(express.json(), express.urlencoded({ extended: false }), [router]);
app.use('/sign-up', signupRouter);
app.use('/sign-in', signinRouter);



app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

