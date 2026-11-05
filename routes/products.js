const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Daftar endpoint produk:
// GET    /products      -> semua produk
// GET    /products/:id  -> satu produk berdasarkan id
// POST   /products      -> tambah produk baru
// PUT    /products/:id  -> update produk berdasarkan id
// DELETE /products/:id  -> hapus produk berdasarkan id
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
