const OwnerService = require('../services/owner_service');

class OwnerController {
    ownerservice = new OwnerService();
    
    getOrders = async (req, res, next) => {
        try {
            const orders = await this.ownerservice.findAllStatus();

            return res.status(200).json({"status": orders});
        } catch (err) {
            return res.status(400).send({"errorMessage": "세탁물 조회에 실패하였습니다."});
        }
    };

    updateOrder = async (req, res, next) => {
        try {
            const status = req.body.value_give;
            if (status === undefined) {
                return res.status(412).send({"errorMessage": "데이터 형식이 올바르지 않습니다."});
            };
            await this.ownerservice.updateStatus(status);

            return res.status(200).json({"step": "상태 업데이트 성공 !"});
        } catch (error) {
            return res.status(400).send({"errorMessage": "세탁물 상태 수정에 실패하였습니다."});
        };
    };
};

module.exports = OwnerController;