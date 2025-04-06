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
    return (
      <div className="p-6 text-center bg-stone-50 min-h-screen">
        <h2 className="text-xl text-stone-600">📭 Belum ada buku yang dipinjam</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-stone-50 min-h-screen">
      <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center">📚 Buku yang Dipinjam</h1>
      <ul className="space-y-4 mb-6">
        {cart.map((book) => (
          <li key={book.id} className="bg-white border border-stone-300 p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
              <p className="text-sm text-stone-600">{book.category}</p>
              <p className="text-sm text-amber-700">🔢 Kode Buku: {book.bookCode}</p>
            </div>
            <button
              onClick={() => {
                removeFromCart(book.id);
                toast.error(`❌ "${book.title}" dihapus dari keranjang`);
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              ❌ Hapus
            </button>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button
          onClick={handleSelesaikanPinjam}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded shadow"
        >
          📤 Selesaikan Peminjaman
        </button>
      </div>
    </div>
  );
}

export default BorrowPage;