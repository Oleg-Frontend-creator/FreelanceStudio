const {env} = require("./config");
const config = {
    secret: '23rfewwef2f3deASFf9iwgefjqifdWA',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT | 3000,
    db: {
        dbUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/freelancers'
    },
    orderStatuses: {
        new: 'new',
        confirmed: 'confirmed',
        success: 'success',
        canceled: 'canceled',
    },
    freelancerLevels: {
        junior: 'junior',
        middle: 'middle',
        senior: 'senior',
    },
    freelancerAvatarsPath: '/images/freelancers/avatars/',
    defaultFreelancerAvatar: '/images/freelancers/avatar-stub.png',
};

module.exports = config;