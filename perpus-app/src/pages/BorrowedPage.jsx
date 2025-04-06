import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function BorrowedPage() {
  const [borrowed, setBorrowed] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("borrowedBooks");
    if (stored) {
      setBorrowed(JSON.parse(stored));
    }
  }, []);

  const handleReturn = (bookCode) => {
    const updated = borrowed.filter((book) => book.bookCode !== bookCode);
    setBorrowed(updated);
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));
    toast.success("📤 Buku berhasil dikembalikan!");
  };

  if (borrowed.length === 0) {
    return <p className="text-center mt-10">📭 Belum ada buku yang dipinjam.</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 Riwayat Peminjaman</h1>
      <ul className="space-y-4">
        {borrowed.map((book, index) => (
          <li key={index} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">📖 {book.title}</h3>
              <p className="text-sm text-gray-600">📂 {book.category}</p>
              <p className="text-sm text-blue-500">🔢 Kode Buku: {book.bookCode}</p>
              <p className="text-sm text-green-700">
                📆 Dipinjam pada: {new Date(book.borrowedAt).toLocaleString()}
              </p>
              <p className="text-sm text-yellow-600">📌 Status: <b>{book.status}</b></p>
            </div>
            <button
              onClick={() => handleReturn(book.bookCode)}
              className="text-red-600 hover:text-red-800"
            >
              🔁 Kembalikan
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowedPage;