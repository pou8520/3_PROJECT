const OwnerService = require('../services/owner_service');

class OwnerController {
    ownerservice = new OwnerService();

    updateStatus = async (req, res, next) => {
       const {order_id} = req.params;
       const {value_give} = req.body;

       await this.ownerservice.updateStatus(order_id, value_give);

       return res.status(200).json({"message": "상태 수정 성공 !"});
    };
};

module.exports = OwnerController;