import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function HomePage() {
  const { data, loading, error } = useFetch("https://67f2697cec56ec1a36d30995.mockapi.io/books");

  // Ambil hanya 4 buku teratas sebagai highlight
  const highlightBooks = data?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Selamat Datang di Perpustakaan Online!
        </h1>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Jelajahi dunia pengetahuan dengan koleksi buku digital terbaik. 
          Pinjam buku favoritmu hanya dengan sekali klik!
        </p>
        <Link to="/books">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">
            📚 Lihat Semua Buku
          </button>
        </Link>
      </div>

      {/* Section Buku Pilihan */}
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📘 Buku Pilihan Minggu Ini</h2>

        {loading && <p className="text-center">Memuat buku pilihan...</p>}
        {error && <p className="text-center text-red-500">Gagal memuat buku</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {highlightBooks.map((book) => (
            <div key={book.id} className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-md font-semibold mb-1">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.category}</p>
              <Link to={`/books/${book.id}`}>
                <button className="mt-2 text-sm text-blue-600 hover:underline">
                  Lihat Detail
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;