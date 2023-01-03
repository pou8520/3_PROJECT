const express = require('express');
const {Review} = require('./models');
const app = express();
const router = require('./routes');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {Order} = require('./models');
const { userInfo } = require('os');
require('dotenv').config();

try {
    fs.readdirSync('images');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('images');
}

const upload = multer({
     // 파일 저장 위치 (disk , memory 선택)
    storage: multer.diskStorage({
        destination: function (req, file, done) {
            done(null, 'images/');
        },
        filename: function (req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    // 파일 허용 사이즈 (5 MB)
    limits: { fileSize: 5 * 1024 * 1024 }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(express.static('./assets'));
app.use('/images',express.static('images'));

// 세탁물 등록
app.post('/api/orders', upload.single('image'),async (req, res) => {
    const {nickname, address, content} = req.body;
    const image = req.file.path;
    const step = '대기중'
    const Orders = await Order.create({nickname, address, content, image, step});
    res.status(201).json({Orders})
})

// 세탁물 조회
app.get('/api/orders', async (req,res) => {
    const order = await Order.findAll({
        order: [['createdAt', 'DESC']]
    });

    res.json({"orders":order})
});
// app.use('/api',express.json(),express.urlencoded({extended: false}), [router]);

// app.get('/api/reviews', async (req, res) => {
//     const reviews = await Review.findAll({
//         order: [['createdAt','DESC']]
//     });
//     res.status(200).json({"reviews":reviews})
// });

// app.post('/api/reviews', async (req, res) => {
//     const nickname = req.body.name_give;
//     const comment = req.body.comment_give;
//     const star = req.body.star_give;

//     await Review.create({star, nickname, comment});

//     res.status(201).send({"msg":"작성 성공!"});
// });

// app.patch('/api/reviews/:review_id', async (req, res) => {
//     const {review_id} = req.params; 
//     const {nickname, comment, star} = req.body;

//     const update_review = await Review.update({nickname: nickname, comment: comment, star: star},
//         {where: {id: review_id}},
//         );
    
//     res.status(200).send({"message": "리뷰 수정 성공 !"})
//     });




// 상태 등록
// app.post('/api/step', async (req,res) => {
//     const status = req.body.value_give;
//     console.log(status);

//     await Step.create({status});

//     return res.status(200).send({"msg": "등록 성공 !"})
// });


app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

