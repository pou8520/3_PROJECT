const OwnerRepository = require('../repositories/owner_repository');

class OwnerService {
    ownerRepository = new OwnerRepository;

    findAllStatus = async () => {
        const allStatus = await this.ownerRepository.findAllStatus();

        allStatus.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return allStatus.map(status => {
            return {
                id: status.id,
                status: status.status,
                createdAt: status.createdAt,
                updatedAt: status.updatedAt
            };
        });
    };

    updateStatus = async (status) => {

    await this.ownerRepository.updateStatus(status);

    };
};

module.exports = OwnerService;