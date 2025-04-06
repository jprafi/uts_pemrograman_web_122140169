import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function BorrowedPage() {
  const [borrowed, setBorrowed] = useState([]);

  // Ambil data dari localStorage saat pertama kali load
  useEffect(() => {
    const saved = localStorage.getItem("borrowedBooks");
    if (saved) setBorrowed(JSON.parse(saved));
  }, []);

  const handleKembalikan = (id) => {
    const filtered = borrowed.filter((book) => book.id !== id);
    setBorrowed(filtered);
    localStorage.setItem("borrowedBooks", JSON.stringify(filtered));
    toast.success("📦 Buku berhasil dikembalikan!");
  };

  if (!borrowed || borrowed.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        📭 Belum ada buku yang dipinjam sebelumnya
      </p>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">📄 Riwayat Peminjaman</h1>
      <ul className="space-y-4">
        {borrowed.map((book) => (
          <li
            key={book.id}
            className="border border-stone-200 bg-white rounded shadow p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold text-stone-800">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.category}</p>
              <p className="text-sm text-blue-600">🔢 Kode Buku: {book.bookCode}</p>
              <p className="text-sm text-green-700 mt-1">📌 Status: <b>{book.status}</b></p>
              <p className="text-xs text-stone-500">
                ⏰ Dipinjam pada: {new Date(book.borrowedAt).toLocaleString("id-ID")}
              </p>
            </div>
            <button
              onClick={() => handleKembalikan(book.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              🔄 Kembalikan
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowedPage;