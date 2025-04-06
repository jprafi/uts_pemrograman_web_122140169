import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetailPage";
import BorrowPage from "./pages/BorrowPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import BorrowedPage from "./pages/BorrowedPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/borrow" element={<BorrowPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/borrowed" element={<BorrowedPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;