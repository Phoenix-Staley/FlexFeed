// syncDB.js
const sequelize = require('./config/connection');
const User = require('./models/User');

(async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('✅ All models synced successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing models:', error);
        process.exit(1);
    }
})();
