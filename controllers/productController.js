const prisma = require('../db/prisma');

function validate(name, price) {
  if (!name || price === undefined) {
    return 'Field name dan price wajib diisi';
  }
  if (typeof price !== 'number' || price <= 0) {
    return 'Field price harus berupa angka positif';
  }
  return null;
}

// GET /products -> 200, array seluruh produk
async function getProducts(req, res, next) {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

// GET /products/:id -> 200, objek produk; 404 jika tidak ditemukan
async function getProductById(req, res, next) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

// POST /products -> 201, produk yang baru dibuat
async function createProduct(req, res, next) {
  try {
    const { name, price } = req.body;
    const error = validate(name, price);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const product = await prisma.product.create({ data: { name, price } });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProducts, getProductById, createProduct };
