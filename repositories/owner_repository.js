const { Order } = require('../models');

class OwnerRepository {

    updateStatus = async (order_id, value_give) => {
        await Order.update({
            step: value_give,
        },
        {where: {id: order_id}},
        );
        
        return;
    };
}
module.exports = OwnerRepository;