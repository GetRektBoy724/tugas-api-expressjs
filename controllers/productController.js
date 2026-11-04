const { all, find } = require('../data/products');

// GET /products -> 200, array seluruh produk
function getProducts(req, res) {
  res.status(200).json(all());
}

// GET /products/:id -> 200, objek produk; 404 jika tidak ditemukan
function getProductById(req, res) {
  const id = Number(req.params.id);
  const product = find(id);

  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  res.status(200).json(product);
}

module.exports = { getProducts, getProductById };
