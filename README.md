# Tugas: API Daftar Produk — ExpressJS

| | |
|---|---|
| **Nama** | Muhammad Syihan Zhafiri |
| **NRP** | 5027251052 |
| **Mata Kuliah** | Pemrograman Web — Kelas C |

API daftar produk menggunakan **ExpressJS** dengan data disimpan di **array** (tanpa database).

Dibuat untuk tugas Pemrograman Web — implementasi `GET /products`, `GET /products/:id`, dan `POST /products` dengan **pemisahan route dan controller**.

## Cara Menjalankan

1. Pastikan **Node.js** sudah terpasang (versi 18 atau lebih baru).
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan server:
   ```bash
   npm start
   ```
4. Server berjalan di `http://localhost:3000`.

## Struktur Proyek

```
tugas_api_expressjs/
├── app.js                      # Setup Express, middleware JSON, mount router
├── routes/products.js          # Definisi endpoint (route) produk
├── controllers/productController.js  # Logika handler (controller)
├── data/products.js            # Data produk di array + akses data
├── package.json
└── README.md
```

**Pemisahan route–controller:**
- `routes/products.js` hanya mendefinisikan endpoint mana yang memanggil controller mana.
- `controllers/productController.js` berisi logika handler (mencari produk, membuat ID baru, menentukan status code dan respons JSON).
- `data/products.js` menyimpan array produk dan fungsi akses datanya.

## Daftar Endpoint

| Method | Endpoint        | Body (JSON)                    | Respons Sukses                          | Respons Gagal |
|--------|-----------------|--------------------------------|-----------------------------------------|---------------|
| GET    | `/products`     | –                              | `200` array seluruh produk              | –             |
| GET    | `/products/:id` | –                              | `200` objek produk                      | `404` `{ "message": "Produk tidak ditemukan" }` |
| POST   | `/products`     | `{ "name": "...", "price": ... }` | `201` objek produk baru (dengan `id` baru) | `400` jika `name`/`price` kosong |

## Bukti Pengujian

Server dijalankan dengan `npm start`, lalu diuji dengan `curl`.

### 1. GET /products → 200, array seluruh produk

```bash
curl -w "\nHTTP Status: %{http_code}\n" http://localhost:3000/products
```

```
[{"id":1,"name":"Buku","price":15000},{"id":2,"name":"Pulpen","price":5000}]
HTTP Status: 200
```

### 2. GET /products/1 → 200, objek produk Buku

```bash
curl -w "\nHTTP Status: %{http_code}\n" http://localhost:3000/products/1
```

```
{"id":1,"name":"Buku","price":15000}
HTTP Status: 200
```

### 3. GET /products/999 → 404, pesan JSON produk tidak ditemukan

```bash
curl -w "\nHTTP Status: %{http_code}\n" http://localhost:3000/products/999
```

```
{"message":"Produk tidak ditemukan"}
HTTP Status: 404
```

### 4. POST /products → 201, produk baru dengan ID baru

```bash
curl -w "\nHTTP Status: %{http_code}\n" -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Penghapus","price":3000}'
```

```
{"id":3,"name":"Penghapus","price":3000}
HTTP Status: 201
```

### 5. Verifikasi setelah POST — produk baru masuk ke daftar

```bash
curl http://localhost:3000/products
```

```
[{"id":1,"name":"Buku","price":15000},{"id":2,"name":"Pulpen","price":5000},{"id":3,"name":"Penghapus","price":3000}]
```

## Catatan Implementasi

- **ID baru pada POST** diambil dari counter `nextId` yang terus bertambah, sehingga ID tidak pernah dipakai ulang.
- **404 mengembalikan JSON** (`{ "message": "Produk tidak ditemukan" }`), bukan teks biasa.
- POST memvalidasi input: jika `name` atau `price` tidak diisi, dikembalikan `400` dengan pesan JSON.
- Data disimpan di array dalam memori — data kembali ke awal setiap server direstart (sesuai ketentuan tugas: tanpa database).
