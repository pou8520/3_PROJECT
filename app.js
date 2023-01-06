const express = require("express");
const { Review } = require("./models");
const app = express();
const router = require("./routes");
const methodOverride = require("method-override");

require("dotenv").config();

//화면 engine 템플릿 사용을 ejs로 설정
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));
app.use('/images',express.static('images'));
app.use('/api',express.json(),express.urlencoded({extended: false}), [router]);
app.use(express.json(),express.urlencoded({extended: false}))
app.use(methodOverride("_method")); // put과 delete는 HTML이 지원x. npm i method-override --save 설치



//웹페이지 렌더링
app.get("/reviews", async (req, res) => {
  const reviews = await Review.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("index", { reviews: reviews });
});

//리뷰 작성 페이지 렌더링
app.get("/reviews/new", (req, res) => {
  res.render("new", { reivew: new Review() });
});

//리뷰 편집 페이지 렌더링
app.get("/reviews/edit/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  res.render("edit", { review: review });
});

//리뷰 작성
app.post("/reviews", async (req, res, next) => {
  const { nickname, title, comment, star } = req.body;
  await Review.create({ star, title, nickname, comment });
  res.status(200).send("<script>alert('리뷰 작성 완료');location.href='/reviews';</script>");
}, 
);

//수정
app.patch("/reviews/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { nickname, title, comment, star } = req.body;
  
  console.log(nickname, title, comment, star, id)
  const update_review = await Review.update(
    { nickname: nickname, comment: comment, star: star, title: title },
    { where: { id: id } }
  );
//   req.flash('info', 'flash');
//   res.status(200).redirect("/reviews");
  res.send("<script>alert('수정 완료');location.href='/reviews';</script>");
});

//삭제
app.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  await Review.destroy({ where: { id: id } }).then(() => {
    res.send("<script>alert('삭제 완료');location.href='/reviews';</script>");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 포트가 열렸어요 `);
});