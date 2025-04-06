import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

function BorrowPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleSelesaikanPinjam = () => {
    const existing = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    const toBorrowed = cart.map(book => ({
      ...book,
      status: "Dipinjam",
      borrowedAt: new Date().toISOString(),
    }));

    localStorage.setItem("borrowedBooks", JSON.stringify([...existing, ...toBorrowed]));
    clearCart();
    toast.success("📦 Buku berhasil dipinjam!");
  };

  if (!cart || cart.length === 0) {
    return <p className="text-center mt-10">📭 Belum ada buku yang dipinjam</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Buku yang Dipinjam</h1>
      <ul className="space-y-4 mb-6">
        {cart.map((book) => (
          <li key={book.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.category}</p>
              <p className="text-sm text-blue-500">🔢 Kode Buku: {book.bookCode}</p>
            </div>
            <button
              onClick={() => {
                removeFromCart(book.id);
                toast.error(`❌ "${book.title}" dihapus dari keranjang`);
              }}
              className="text-red-600 hover:text-red-800"
            >
              ❌ Hapus
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelesaikanPinjam}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        📤 Selesaikan Peminjaman
      </button>
    </div>
  );
}

export default BorrowPage;