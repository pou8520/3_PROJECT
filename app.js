const express = require('express');
const app = express();
const router = require('./routes');
require('dotenv').config();



app.use(express.static('./assets'));

app.use('/api',express.json(),express.urlencoded({extended: false}), [router]);




// 상태 조회
// app.get('/api/order_id/step', async (req,res) => {
//     const status = await Step.findAll({});

//     return res.status(200).json({"status": status});
// });

// 상태 등록
// app.post('/api/step', async (req,res) => {
//     const status = req.body.value_give;
//     console.log(status);

//     await Step.create({status});

//     return res.status(200).send({"msg": "등록 성공 !"})
// });

// 상태 수정
// app.patch('/api/:order_id/step', async (req,res) => {
//     const status = req.body.value_give;
//     console.log(status);

//     await Step.update(
//         {status: status},
//         {where: {
//             id: 1
//         }},
//     );

//     return res.status(200).send({"msg": "수정 성공 !"});
// });




app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} 포트가 열렸어요 `);
});

