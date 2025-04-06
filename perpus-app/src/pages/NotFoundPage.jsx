import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center mt-24 px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        🔙 Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;