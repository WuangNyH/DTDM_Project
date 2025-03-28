const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log, // Hiển thị log SQL để debug
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {}
});

// Tự động sync models với database
async function syncModels() {
    try {
        await sequelize.sync({ force: false, alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Failed to sync models:', error);
    }
}

syncModels();

module.exports = sequelize;
