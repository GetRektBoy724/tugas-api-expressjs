const prisma = require('../db/prisma');

// Isi ulang tabel Product dengan data awal.
// deleteMany dulu agar seed aman dijalankan berulang kali.
async function main() {
  await prisma.product.deleteMany();
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
