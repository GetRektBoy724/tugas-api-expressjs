const express = require('express');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;

// Middleware: parse body JSON pada request POST
app.use(express.json());

// Route produk dipisah ke routes/products.js
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
