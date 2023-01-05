const express = require('express');
const app = express();
const router = require('./routes');
const signupRouter = require('./routes/custom_sign-up');
const signinRouter = require('./routes/custom_sign-in');
const owner_signupRouter = require('./routes/owner_sign-up');
const owner_signinRouter = require('./routes/owner_sign-in');
const bodyParser = require('body-parser')

require('dotenv').config();
app.use(express.static('./assets'));
app.use('/api',express.json(),express.urlencoded({extended: false}), [router]);
app.use(express.json(),express.urlencoded({extended: false}));
app.use('/images',express.static('images'));
app.use(bodyParser.json())
app.use(signupRouter);
app.use(signinRouter);
app.use(owner_signupRouter);
app.use(owner_signinRouter);



app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});