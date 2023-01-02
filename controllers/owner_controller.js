const OwnerService = require('../services/owner_service');

class OwnerController {
    ownerservice = new OwnerService();

    getOrders = async (req, res, next) => {
        const orders = await this.ownerservice.findAllStatus();

        return res.status(200).json({"status": orders});
    };

    updateOrder = async (req, res, next) => {
        const status = req.body.value_give;

        console.log(status)
        await this.ownerservice.updateStatus(status);

        return res.status(200).json({"step": "상태 업데이트 성공 !"});
    }
};

module.exports = OwnerController;