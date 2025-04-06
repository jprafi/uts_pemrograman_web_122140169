import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

function BookDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://67f2697cec56ec1a36d30995.mockapi.io/books/${id}`
  );
  const { addToCart } = useContext(CartContext);

  function handlePinjam() {
    addToCart(data);
    toast.success(`📘 "${data.title}" berhasil ditambahkan ke keranjang!`);
  }

  if (loading)
    return <p className="text-center mt-10">🔍 Memuat detail buku...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ Error: {error}
      </p>
    );
  if (!data)
    return (
      <p className="text-center mt-10">
        📭 Buku tidak ditemukan atau belum tersedia.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📖 {data.title}</h1>
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-2">📝 {data.description}</p>
      <p className="text-blue-600">
        🔢 Kode Buku: <b>{data.bookCode}</b>
      </p>
      <p className="text-purple-700">
        🏷️ Kategori: <i>{data.category}</i>
      </p>

      <button
        onClick={handlePinjam}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        📥 Pinjam Buku Ini
      </button>
    </div>
  );
}

export default BookDetailPage;