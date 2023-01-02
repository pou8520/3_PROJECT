const express = require("express");
const router = express.Router();

const { Order } = require("../models");

//신청내역 전체조회
router.get("/", async (_, res) => {
  // res.send("hello world!");
  try {
    const orders = await Order.findAll();
    res.json({ data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//신청 내역 작성
router.post("/", async (req, res) => {
  const { nickname, address, phone, content } = req.body;

  try {
    const order = await Order.create({
      nickname,
      address,
      phone,
      content,
    });
    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//신청내역 상세조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//신청내역 수정
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!req.body || !id) {
    return res.json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  const { nickname, address, phone, content } = req.body;

  const order = await Order.findByPk(id);

  if (!order) {
    return res.json({ message: "게시글 조회에 실패하였습니다." });
  }

  if (nickname) {
    order.nickname = nickname;
  }
  if (address) {
    order.address = address;
  }
  if (phone) {
    order.phone = phone;
  }
  if (content) {
    order.content = content;
  }

  try {
    const updatedOrder = await order.save();
    res.json({ data: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//신청내역 삭제

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    return res.json({ message: "게시글 조회에 실패하였습니다." });
  }

  try {
    await order.destroy();
    res.json({ message: "게시글이 삭제됐습니다." });
  } catch (err) {
    res.status(500).json({message: err.message});
  }

});

module.exports = router;
