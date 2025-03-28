const ProductService = require('../services/productService');

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async searchProducts(req, res) {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ error: 'Search term is required' });
            }
            const products = await ProductService.searchProducts(q);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addProduct(req, res) {
        try {
            const productData = req.body;
            if (!productData.name || !productData.price) {
                return res.status(400).json({ error: 'Name and price are required' });
            }
            const newProduct = await ProductService.addProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const result = await ProductService.deleteProduct(id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Product not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;
