const { Order } = require('../models');

class OrderRepository {
    findAllOrders = async () => {
        const orders = await Order.findAll({
            order: [['createdAt', 'DESC']],
        });
    
        return orders;
    };

    createOrders = async (nickname, address, content, image) => {
        const step = '대기중';
        const orders = await Order.create({nickname, address, content, image, step});

        return orders;
    }

    updateOrders = async (order_id, nickname, address, content, image) => {
        await Order.update({
            nickname: nickname,
            address: address,
            content: content,
            image: image
        },
        {where: {id: order_id}},
        );

        return;
    }

    deleteOrders = async (order_id) => {
        await Order.destroy({
            where: {id: order_id},
        });
    };
};

module.exports = OrderRepository;