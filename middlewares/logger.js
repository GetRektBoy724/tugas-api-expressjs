// Custom middleware: logger request sederhana
// Mencatat method, path, status code, dan durasi setiap request yang masuk.
function logger(req, res, next) {
  const start = Date.now();

  // res.on('finish') terpanggil setelah response terkirim,
  // sehingga statusCode dan durasi sudah final saat dicatat.
  res.on('finish', () => {
    const time = new Date().toISOString();
    const duration = Date.now() - start;
    console.log(`[${time}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });

  next(); // wajib dipanggil agar request lanjut ke handler berikutnya
}

module.exports = { logger };
