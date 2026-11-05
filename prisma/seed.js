const prisma = require('../db/prisma');

// Isi ulang tabel Product dengan data awal.
// deleteMany + reset sqlite_sequence agar seed selalu menghasilkan id yang sama
// (mulai dari 1) berapa kali pun dijalankan — tanpa reset, AUTOINCREMENT SQLite
// terus memakai nilai tertinggi yang pernah dipakai.
async function main() {
  await prisma.product.deleteMany();
  await prisma.$executeRawUnsafe(
    "DELETE FROM sqlite_sequence WHERE name = 'Product'"
  );
  await prisma.product.createMany({
    data: [
      { name: 'Buku', price: 15000 },
      { name: 'Pulpen', price: 5000 },
    ],
  });
  console.log('Seed selesai: Buku dan Pulpen ditambahkan.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
