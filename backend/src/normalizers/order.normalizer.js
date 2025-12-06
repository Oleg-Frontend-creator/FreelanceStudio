const BaseNormalizer = require("./base.normalizer");
const config = require("../config/config");

class OrderNormalizer extends BaseNormalizer {
    static normalize(orderDoc) {
        // если прилетел mongoose-документ — переведём в обычный объект
        const order = orderDoc && orderDoc.toObject ? orderDoc.toObject() : orderDoc || {};

        const owner = order.owner || null;
        let ownerObj = null;

        if (owner) {
            if (typeof owner === 'object' && '_id' in owner) {
                // популяшенный пользователь
                ownerObj = {
                    id: owner._id,
                    name: owner.name,
                    lastName: owner.lastName,
                };
            } else {
                // просто ObjectId
                ownerObj = {
                    id: owner,
                };
            }
        }

        const result = {
            id: order._id || order.id,
            number: order.number,
            description: order.description,
            deadlineDate: order.deadlineDate,
            scheduledDate: order.scheduledDate,
            owner: ownerObj,
            completeDate: order.completeDate,
            amount: order.amount,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };

        const freelancer = order.freelancer || null;
        if (freelancer) {
            if (typeof freelancer === 'object' && '_id' in freelancer) {
                result.freelancer = {
                    id: freelancer._id,
                    name: freelancer.name,
                    lastName: freelancer.lastName,
                    avatar: config.freelancerAvatarsPath + freelancer.avatar,
                    level: freelancer.level,
                };
            } else {
                result.freelancer = {
                    id: freelancer,
                };
            }
        }

        return result;
    }
}

module.exports = OrderNormalizer;