const OwnerRepository = require('../repositories/owner_repository');

class OwnerService {
    ownerRepository = new OwnerRepository();

    updateStatus = async (order_id, value_give) => {
        await this.ownerRepository.updateStatus(order_id, value_give);

        return
    };

};

module.exports = OwnerService;