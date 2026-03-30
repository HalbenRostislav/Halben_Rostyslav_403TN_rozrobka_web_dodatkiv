const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sku: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  current_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  critical_threshold: { type: DataTypes.INTEGER, defaultValue: 10 }
}, {
  tableName: 'products',
  timestamps: true 
});

module.exports = Product;