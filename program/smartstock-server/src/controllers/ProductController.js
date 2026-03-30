const Product = require('../models/Product');
const InventoryService = require('../services/InventoryService');
const ProductDTO = require('../dto/ProductDTO');

class ProductController {
  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(ProductDTO.transform(products));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(ProductDTO.transform(product));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { change } = req.body;
      const result = await InventoryService.updateStock(id, change);
      res.status(200).json(ProductDTO.transform(result.product));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();