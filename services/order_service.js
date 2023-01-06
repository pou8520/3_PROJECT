const OrderRepository = require('../repositories/order_repository');

class OrderService {
    orderRepository = new OrderRepository();

    findAllOrders = async () => {
        const getOrders = await this.orderRepository.findAllOrders();

        getOrders.map(orders => {
            return {
                id: orders.id,
                nickname: orders.nickname,
                address: orders.address,
                content: orders.content,
                image: orders.image,
                step: orders.step
            };
        });
        return getOrders;
    }                                                                                                                                                                                                                                          

    createOrders = async (nickname, address, content, image) => {
        const createOrders = await this.orderRepository.createOrders(nickname, address, content, image);

        return createOrders;
    }

    updateOrders = async (order_id, nickname, address, content, image) => {
        await this.orderRepository.updateOrders(order_id, nickname, address, content, image);

        return
    }

    deleteOrders = async (order_id) => {
        await this.orderRepository.deleteOrders(order_id);

        return
    }
}

module.exports = OrderService;