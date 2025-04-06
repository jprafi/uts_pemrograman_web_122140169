import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

function BookListPage() {
  const { data, loading, error } = useFetch("https://67f2697cec56ec1a36d30995.mockapi.io/books");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (loading) return <p className="text-center mt-10">📖 Sedang memuat daftar buku...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">❌ Error: {error}</p>;
  if (!data) return <p>Data buku tidak tersedia</p>;

  const categories = [...new Set(data.map((book) => book.category))];

  const filteredBooks = data.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  function handleReset() {
    setSearchTerm("");
    setSelectedCategory("");
  }

  return (
    <div className="p-4 max-w-6xl mx-auto bg-stone-50 min-h-screen">
      <h1 className="text-3xl font-bold text-amber-700 mb-6 text-center">📚 Daftar Buku Perpustakaan</h1>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <input
          type="text"
          placeholder="🔍 Cari berdasarkan judul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-stone-300 rounded shadow-sm w-full sm:w-1/2 bg-white"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-stone-300 rounded shadow-sm w-full sm:w-1/3 bg-white"
        >
          <option value="">📁 Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>📚 {cat}</option>
          ))}
        </select>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-amber-200 text-amber-700 rounded shadow-sm hover:bg-amber-300 transition"
        >
          ❌ Reset
        </button>
      </div>

      {/* Pesan kosong */}
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          📭 Tidak ada buku yang sesuai dengan pencarian atau kategori.
        </p>
      )}

      {/* Daftar Buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id}>
            <div className="bg-white border border-stone-300 rounded-lg shadow hover:shadow-md transition p-4 cursor-pointer">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">📖 {book.title}</h3>
              <p className="text-sm text-gray-600 mb-1">📝 {book.description.slice(0, 60)}...</p>
              <p className="text-sm text-amber-700">🔢 Kode Buku: <b>{book.bookCode}</b></p>
              <p className="text-sm text-stone-600">🏷️ {book.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookListPage;