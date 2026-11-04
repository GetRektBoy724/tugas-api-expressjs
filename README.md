# Tugas: API Daftar Produk — ExpressJS + Prisma

| | |
|---|---|
| **Nama** | Muhammad Syihan Zhafiri |
| **NRP** | 5027251052 |
| **Mata Kuliah** | Pemrograman Web — Kelas C |

API CRUD daftar produk menggunakan **ExpressJS** dan **Prisma ORM** dengan database **SQLite**. Merupakan kelanjutan tugas sebelumnya: data produk kini disimpan di database (bukan array) dan fitur bertambah menjadi **GET, POST, PUT, dan DELETE** lengkap, plus **custom middleware** (logger, 404 handler, dan error handler) serta **pemisahan route–controller**.

## Cara Menjalankan

1. Pastikan **Node.js** terpasang (versi 18+; proyek ini diuji dengan v22).
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` dari contoh:
   ```bash
   cp .env.example .env
   ```
4. Terapkan migrasi database (membuat `dev.db`):
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
5. Isi data awal:
   ```bash
   npm run db:seed
   ```
6. Jalankan server:
   ```bash
   npm start
   ```

Server berjalan di `http://localhost:3000`.

### Daftar npm scripts

| Perintah | Fungsi |
|---|---|
| `npm start` | Jalankan server |
| `npm run dev` | Jalankan server dengan auto-restart saat kode berubah |
| `npm run db:migrate` | Terapkan perubahan skema ke database |
| `npm run db:seed` | Isi ulang data awal (Buku dan Pulpen) |
| `npm run db:studio` | Buka Prisma Studio untuk melihat isi database |

## Struktur Proyek

```
tugas_api_expressjs/
├── app.js                        # Setup Express, middleware, mount router
├── routes/products.js            # Definisi endpoint (route)
├── controllers/productController.js  # Logika handler + akses Prisma
├── middlewares/logger.js         # Custom middleware: logger request
├── middlewares/errorHandler.js   # Custom middleware: 404 JSON + error handler
├── db/prisma.js                  # Instance PrismaClient (adapter better-sqlite3)
├── prisma/schema.prisma          # Skema database (model Product)
├── prisma/migrations/            # File migrasi database
├── prisma/seed.js                # Script pengisian data awal
├── postman_collection.json       # Kumpulan request siap import ke Postman
├── .env.example                  # Contoh environment variable
└── dev.db                        # Database SQLite (dibuat lokal, di-gitignore)
```

## Middleware

| Middleware | Jenis | Fungsi |
|---|---|---|
| `express.json()` | Built-in | Parse body JSON pada request POST/PUT |
| `logger` | Custom (`middlewares/logger.js`) | Mencatat timestamp, method, path, status code, dan durasi setiap request |
| `notFound` | Custom (`middlewares/errorHandler.js`) | Mengembalikan **404 JSON** untuk endpoint yang tidak dikenal (pengganti HTML default Express) |
| `errorHandler` | Custom (`middlewares/errorHandler.js`) | Menangkap error dari controller (via `next(err)`), mencatat stack trace, dan mengembalikan **500 JSON** |

Urutan pemasangan middleware di `app.js` penting: `logger` dipasang sebelum route, `notFound` setelah semua route, dan `errorHandler` paling akhir.

## Daftar Endpoint

| Method | Endpoint | Body (JSON) | Respons Sukses | Respons Gagal |
|--------|----------|-------------|----------------|---------------|
| GET | `/products` | – | `200` array seluruh produk | – |
| GET | `/products/:id` | – | `200` objek produk | `404` `{ "message": "Produk tidak ditemukan" }` |
| POST | `/products` | `{ "name": "...", "price": ... }` | `201` objek produk baru (id dibuat otomatis) | `400` jika field kosong / price bukan angka positif |
| PUT | `/products/:id` | `{ "id": ..., "name": "...", "price": ... }` (body sama dengan POST + `id`) | `200` objek produk yang sudah diupdate | `400` validasi gagal, `404` produk tidak ada |
| DELETE | `/products/:id` | – | `200` `{ "message": "Produk berhasil dihapus" }` | `404` produk tidak ada |

Bukti pengujian lengkap (13 skenario sukses, validasi, dan error + perubahan database before/after) ada di **[LAPORAN_EVIDENCE.md](LAPORAN_EVIDENCE.md)**.

## Catatan Implementasi

- **Prisma 7** dengan driver adapter `better-sqlite3`; client Prisma di-generate sebagai TypeScript ke `generated/prisma` sehingga server dijalankan lewat `tsx` (`npm start`).
- **ID otomatis dan tidak pernah dipakai ulang** — `@default(autoincrement())` pada SQLite memakai `AUTOINCREMENT`, terbukti pada pengujian: setelah produk id 3 dihapus, POST berikutnya mendapat id 4.
- **Error `P2025` dari Prisma** (record tidak ditemukan saat update/delete) dipetakan menjadi respons `404`.
- **Data persisten** — tersimpan di `dev.db`, bertahan saat server direstart (peningkatan dari versi array tugas sebelumnya).
- **Seed idempoten** — `deleteMany` dulu sebelum insert, aman dijalankan berulang kali.
- Route dan controller tetap terpisah: `routes/products.js` hanya mendefinisikan endpoint, logika ada di `controllers/productController.js`.
