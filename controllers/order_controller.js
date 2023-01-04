const OrderService = require('../services/order_service');



class OrderController {
    orderservice = new OrderService();

    getOrders = async (req, res, next) => {
        const orders = await this.orderservice.findAllOrders();

        return res.status(200).json({"orders": orders});
    };

    createOrders = async (req, res, next) => {
        const {nickname, address, content} = req.body;
        const image = req.file.path;

        await this.orderservice.createOrders(nickname, address, content, image);

        return res.status(201).json({"message": "등록 성공 !"});
    };

    updateOrders = async (req, res, next) => {
        const {nickname, address, content} = req.body;
        const image = req.file.path;
        const {order_id} = req.params;
        await this.orderservice.updateOrders(order_id, nickname, address, content, image);

        return res.status(201).json({"message": "수정 성공 !"});
    };

    deleteOrders = async (req, res, next) => {
        const {order_id} = req.params;
        await this.orderservice.deleteOrders(order_id);

        return res.status(200).json({"message": "삭제 성공 !"});
    };
};

module.exports = OrderController;
