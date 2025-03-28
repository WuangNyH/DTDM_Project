const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./models');

const app = express();

async function initializeApp() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');

        app.use(cors());
        app.use(express.json());
        app.use('/api/products', productRoutes);

        app.get('/', (req, res) => {
            res.send('Product API is running...');
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize app:', error);
        process.exit(1);
    }
}

initializeApp();
