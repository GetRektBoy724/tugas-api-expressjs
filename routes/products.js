const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
} = require('../controllers/productController');

const router = express.Router();

// Daftar endpoint produk:
// GET  /products      -> semua produk
// GET  /products/:id  -> satu produk berdasarkan id
// POST /products      -> tambah produk baru
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;
