const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

// Daftar endpoint produk:
// GET  /products      -> semua produk
// GET  /products/:id  -> satu produk berdasarkan id
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
