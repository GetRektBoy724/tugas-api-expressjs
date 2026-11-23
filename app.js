const express = require('express');
const productRoutes = require('./routes/products');
const { logger } = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

// Middleware: parse body JSON pada request POST
app.use(express.json());

// Middleware custom: catat setiap request yang masuk
app.use(logger);

// Route produk dipisah ke routes/products.js
app.use('/products', productRoutes);

// Middleware custom: 404 JSON untuk endpoint yang tidak dikenal
app.use(notFound);

// Middleware custom: error handler (selalu di urutan paling akhir)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
