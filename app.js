const express = require('express');
const app = express();
const router = require('./routes')
const signRouter = require('./routes')
require('dotenv').config();


app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/assets/templates/index.html")
})


app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + "/assets/templates/users/login.html")
})


app.get('/signup.html', function (req, res) {
    res.sendFile(__dirname + "/assets/templates/users/signup.html")
})

app.use(express.json());
app.use('/api', express.json(), express.urlencoded({ extended: false }), [router]);
app.use(express.static('./assets'));





app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

