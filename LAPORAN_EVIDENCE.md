# Laporan Evidence — API Daftar Produk (ExpressJS + Prisma)

| | |
|---|---|
| **Nama** | Muhammad Syihan Zhafiri |
| **NRP** | 5027251052 |
| **Mata Kuliah** | Pemrograman Web — Kelas C |

Laporan pengujian API produk dengan skenario sukses, kesalahan validasi, data tidak ditemukan, dan perubahan database (before–after). Pengujian di bawah dilakukan dengan `curl` terhadap `http://localhost:3000`; request yang sama juga tersedia di `postman_collection.json` untuk dijalankan ulang di Postman/Bruno/Hoppscotch.

## Ringkasan Skenario

| # | Skenario | Request | Status Diharapkan | Hasil |
|---|---|---|---|---|
| 1 | Daftar semua produk | `GET /products` | 200 | ✅ 200 |
| 2 | Detail produk id 1 | `GET /products/1` | 200 | ✅ 200 |
| 3 | Produk tidak ada | `GET /products/999` | 404 | ✅ 404 |
| 4 | Tambah produk | `POST /products` | 201 | ✅ 201 |
| 5 | Tambah produk, field kurang | `POST /products` | 400 | ✅ 400 |
| 6 | Tambah produk, price negatif | `POST /products` | 400 | ✅ 400 |
| 7 | Update produk | `PUT /products/3` | 200 | ✅ 200 |
| 8 | Update produk tidak ada | `PUT /products/999` | 404 | ✅ 404 |
| 9 | Update produk, field kurang | `PUT /products/3` | 400 | ✅ 400 |
| 10 | Hapus produk | `DELETE /products/3` | 200 | ✅ 200 |
| 11 | Hapus produk tidak ada | `DELETE /products/999` | 404 | ✅ 404 |
| 12 | Produk terhapus tidak bisa diambil | `GET /products/3` | 404 | ✅ 404 |
| 13 | Endpoint tidak dikenal (middleware 404) | `GET /ngawur` | 404 JSON | ✅ 404 |

## Detail Pengujian

### Skenario Sukses

**1. GET /products — 200, array seluruh produk**

```bash
curl -w "\nHTTP: %{http_code}\n" http://localhost:3000/products
```

```json
[{"id":1,"name":"Buku","price":15000},{"id":2,"name":"Pulpen","price":5000}]
HTTP: 200
```

**2. GET /products/1 — 200, objek produk Buku**

```bash
curl -w "\nHTTP: %{http_code}\n" http://localhost:3000/products/1
```

```json
{"id":1,"name":"Buku","price":15000}
HTTP: 200
```

**4. POST /products — 201, produk baru dengan id otomatis**

```bash
curl -w "\nHTTP: %{http_code}\n" -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Penghapus","price":3000}'
```

```json
{"id":3,"name":"Penghapus","price":3000}
HTTP: 201
```

**7. PUT /products/3 — 200, produk terupdate (body sama dengan POST + id)**

```bash
curl -w "\nHTTP: %{http_code}\n" -X PUT http://localhost:3000/products/3 \
  -H "Content-Type: application/json" \
  -d '{"id":3,"name":"Penghapus Merek A","price":3500}'
```

```json
{"id":3,"name":"Penghapus Merek A","price":3500}
HTTP: 200
```

**10. DELETE /products/3 — 200, produk dihapus**

```bash
curl -w "\nHTTP: %{http_code}\n" -X DELETE http://localhost:3000/products/3
```

```json
{"message":"Produk berhasil dihapus"}
HTTP: 200
```

### Skenario Kesalahan Validasi (400)

**5. POST /products tanpa price**

```bash
curl -w "\nHTTP: %{http_code}\n" -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Kaiden"}'
```

```json
{"message":"Field name dan price wajib diisi"}
HTTP: 400
```

**6. POST /products dengan price negatif**

```bash
curl -w "\nHTTP: %{http_code}\n" -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"TipEx","price":-500}'
```

```json
{"message":"Field price harus berupa angka positif"}
HTTP: 400
```

**9. PUT /products/3 tanpa price**

```bash
curl -w "\nHTTP: %{http_code}\n" -X PUT http://localhost:3000/products/3 \
  -H "Content-Type: application/json" \
  -d '{"id":3,"name":"HanyaNama"}'
```

```json
{"message":"Field name dan price wajib diisi"}
HTTP: 400
```

### Skenario Data Tidak Ditemukan (404)

**3. GET /products/999**

```json
{"message":"Produk tidak ditemukan"}
HTTP: 404
```

**8. PUT /products/999**

```json
{"message":"Produk tidak ditemukan"}
HTTP: 404
```

**11. DELETE /products/999**

```json
{"message":"Produk tidak ditemukan"}
HTTP: 404
```

**12. GET /products/3 setelah dihapus (skenario 10)**

```json
{"message":"Produk tidak ditemukan"}
HTTP: 404
```

### Skenario Middleware Custom

**13. GET /ngawur — 404 JSON dari middleware notFound (bukan HTML default Express)**

```json
{"message":"Endpoint GET /ngawur tidak ditemukan"}
HTTP: 404
```

**14. Log server — setiap request tercatat oleh middleware logger**

```
[2026-11-04T08:27:30.978Z] GET /products -> 200 (2ms)
[2026-11-04T08:27:30.997Z] GET /products/1 -> 200 (9ms)
[2026-11-04T08:27:31.007Z] GET /products/999 -> 404 (1ms)
[2026-11-04T08:27:31.041Z] POST /products -> 201 (11ms)
[2026-11-04T08:27:31.052Z] POST /products -> 400 (1ms)
[2026-11-04T08:27:31.063Z] POST /products -> 400 (0ms)
[2026-11-04T08:28:22.451Z] PUT /products/3 -> 200 (8ms)
[2026-11-04T08:28:22.485Z] PUT /products/999 -> 404 (22ms)
[2026-11-04T08:28:22.496Z] PUT /products/3 -> 400 (1ms)
[2026-11-04T08:28:22.511Z] DELETE /products/3 -> 200 (5ms)
[2026-11-04T08:28:22.522Z] DELETE /products/999 -> 404 (2ms)
[2026-11-04T08:28:22.534Z] GET /products/3 -> 404 (2ms)
[2026-11-04T08:28:22.543Z] GET /ngawur -> 404 (1ms)
```

Middleware error handler juga sudah diverifikasi: route yang sengaja melempar error (uji sementara, sudah dihapus dari kode) mengembalikan `{"message":"Terjadi kesalahan pada server"}` dengan status **500**.

## Perubahan Database (Before — After)

Dibaca langsung dari tabel `Product` di `dev.db` melalui Prisma.

**BEFORE — kondisi awal hasil seed:**

```json
[
  { "id": 1, "name": "Buku", "price": 15000 },
  { "id": 2, "name": "Pulpen", "price": 5000 }
]
```

Aktivitas: POST produk baru (id 3) → PUT update id 3 → DELETE id 3 (skenario 4, 7, 10) → POST produk baru lagi → PUT update id 2.

**AFTER — hasil akhir:**

```json
[
  { "id": 1, "name": "Buku", "price": 15000 },
  { "id": 2, "name": "Pulpen Gel", "price": 6000 },
  { "id": 4, "name": "Penghapus", "price": 3000 }
]
```

**Analisis perubahan:**

1. **Baris baru** — produk id 4 (Penghapus) bertambah melalui POST. Perhatikan id-nya **4, bukan 3**, padahal id 3 sudah dihapus: ini bukti `autoincrement` tidak memakai ulang id.
2. **Baris berubah** — produk id 2 berubah dari `Pulpen/5000` menjadi `Pulpen Gel/6000` melalui PUT.
3. **Baris hilang** — produk id 3 yang dibuat lalu dihapus tidak ada di tabel AFTER.
4. Semua perubahan **persisten** di `dev.db` — tetap ada walaupun server direstart.

## Cara Membuat Versi Screenshot (Postman + Prisma Studio)

1. Jalankan server: `npm start`.
2. Import `postman_collection.json` ke Postman/Bruno/Hoppscotch (Import → pilih file).
3. Jalankan request 01–13 berurutan, screenshot tiap respons (status code + body terlihat).
4. Untuk database: jalankan `npm run db:studio`, buka model **Product**:
   - Screenshot kondisi awal (before),
   - jalankan request POST/PUT/DELETE,
   - screenshot kondisi akhir (after).
