// Custom middleware: 404 untuk endpoint yang tidak dikenal.
// Tanpa middleware ini, Express mengembalikan HTML "Cannot GET /..." secara default.
function notFound(req, res) {
  res.status(404).json({
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
}

// Custom middleware: error handler.
// Express mengenali error handler dari 4 parameternya (err, req, res, next)
// dan hanya menjalankannya jika ada handler yang melempar error / memanggil next(err).
function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}

module.exports = { notFound, errorHandler };
