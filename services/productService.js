const Product = require('../models/product');
const { Sequelize } = require('sequelize');

class ProductService {
    static async getAllProducts() {
        return await Product.findAll();
    }

    static async searchProducts(searchTerm) {
        return await Product.findAll({
            where: {
                name: {
                    [Sequelize.Op.iLike]: `%${searchTerm}%`
                }
            }
        });
    }

    static async addProduct(productData) {
        return await Product.create(productData);
    }
}

module.exports = ProductService;
