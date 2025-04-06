import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function HomePage() {
  const { data, loading, error } = useFetch("https://67f2697cec56ec1a36d30995.mockapi.io/books");

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="bg-amber-100 text-gray-800 py-16 px-6 text-center shadow-inner">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-amber-700">📚 Perpustakaan Klasik</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Temukan buku-buku pilihan dengan nuansa klasik dan pengalaman membaca yang nyaman.
        </p>
        <Link to="/books">
          <button className="mt-6 bg-amber-400 hover:bg-amber-500 px-6 py-2 rounded text-white text-sm font-semibold shadow">
            📖 Lihat Koleksi
          </button>
        </Link>
      </div>

      {/* Buku Pilihan */}
      <div className="py-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">✨ Buku Pilihan Minggu Ini</h2>

        {loading && <p className="text-center text-gray-500">📦 Memuat koleksi buku...</p>}
        {error && <p className="text-center text-red-500">❌ Gagal memuat data buku</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data?.slice(0, 4).map((book) => (
            <div
              key={book.id}
              className="bg-white border border-stone-300 rounded-lg shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-md font-semibold text-gray-800">{book.title}</h3>
              <p className="text-sm text-stone-600">{book.category}</p>
              <Link to={`/books/${book.id}`}>
                <button className="mt-2 text-sm text-amber-600 hover:underline">
                  🔍 Lihat Detail
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