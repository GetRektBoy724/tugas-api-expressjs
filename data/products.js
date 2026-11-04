// Data produk disimpan di array (tanpa database)
let products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 },
];

// ID produk baru = ID terbesar yang pernah ada + 1,
// agar ID tidak pernah dipakai ulang setelah data bertambah.
let nextId = products.length + 1;

function all() {
  return products;
}

function find(id) {
  return products.find((p) => p.id === id);
}

function create({ name, price }) {
  const product = { id: nextId, name, price };
  nextId += 1;
  products.push(product);
  return product;
}

module.exports = { all, find, create };
