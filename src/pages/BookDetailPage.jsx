import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function BookDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://67f2697cec56ec1a36d30995.mockapi.io/books/${id}`);
  const { addToCart } = useContext(CartContext);
  const [sudahDipinjam, setSudahDipinjam] = useState(false);

  // Cek apakah buku sudah ada di localStorage.borrowedBooks
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const match = history.find((book) => book.id === id);
    setSudahDipinjam(!!match);
  }, [id]);

  const handlePinjam = () => {
    addToCart(data); // ✅ notifikasi sudah ada di CartContext
  };

  if (loading) return <p className="text-center mt-10">🔍 Memuat detail buku...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">❌ Error: {error}</p>;
  if (!data) return <p className="text-center">Buku tidak ditemukan</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-stone-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Gambar Buku */}
        <div className="md:w-1/2">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full max-h-[300px] object-contain rounded-lg border border-stone-200 bg-white"
          />
        </div>

        {/* Detail Buku */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-700 mb-2">{data.title}</h1>
            <p className="text-sm text-purple-700 mb-2">
              🏷️ Kategori: <i>{data.category}</i>
            </p>
            <p className="text-stone-700 mb-4">📝 {data.description}</p>
            <p className="text-amber-800 font-medium">
              🔢 Kode Buku: <span className="font-bold">{data.bookCode}</span>
            </p>
          </div>

          {/* Tombol Pinjam */}
          {sudahDipinjam ? (
            <p className="mt-4 text-red-600 font-semibold">
              ⚠️ Buku ini sedang dipinjam. Kembalikan terlebih dahulu untuk meminjam ulang.
            </p>
          ) : (
            <button
              onClick={handlePinjam}
              className="mt-6 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
            >
              📥 Pinjam Buku Ini
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;