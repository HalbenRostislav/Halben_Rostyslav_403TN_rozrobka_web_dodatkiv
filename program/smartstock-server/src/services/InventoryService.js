const Product = require('../models/Product');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class InventoryService {
  async updateStock(productId, quantityChange) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error('Товар не знайдено');
    }

    product.current_stock += quantityChange;
    await product.save();

    const isCritical = product.current_stock <= product.critical_threshold;
    
    if (isCritical) {
      console.log(`⚠️ УВАГА: Товар ${product.name} (SKU: ${product.sku}) досяг критичної межі! Залишок: ${product.current_stock}`);
    }

    return {
      product,
      isCritical
    };
  }

  async getLowStockProducts() {
    return await Product.findAll({
      where: {
        current_stock: {
          [Op.lte]: sequelize.col('critical_threshold')
        }
      }
    });
  }
}

module.exports = new InventoryService();