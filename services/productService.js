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

    static async deleteProduct(productId) {
        const deleted = await Product.destroy({
            where: {
                id: productId
            }
        });

        if (deleted === 0) {
            throw new Error('Product not found');
        }

        return { message: 'Product deleted successfully' };
    }

    static async getProductById(productId) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }
}

module.exports = ProductService;
