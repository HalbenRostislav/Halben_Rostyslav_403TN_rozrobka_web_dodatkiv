class ProductDTO {
  constructor(product) {
    this.id = product.id;
    this.sku = product.sku;
    this.name = product.name;
    this.stock = product.current_stock;
    this.status = product.current_stock <= product.critical_threshold ? 'CRITICAL' : 'OK';
  }

  static transform(product) {
    if (Array.isArray(product)) {
      return product.map(p => new ProductDTO(p));
    }
    return new ProductDTO(product);
  }
}

module.exports = ProductDTO;