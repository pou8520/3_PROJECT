const { Step } = require('../models');

class OwnerRepository {
    findAllStatus = async () => {
        const status = await Step.findAll();

        return status;
    };

    updateStatus = async (status) => {

        const update_status = await Step.update(
            {status: status},
            {where: {
                id: 1
            }},
        );
        
        return update_status;
    };

};

module.exports = OwnerRepository;