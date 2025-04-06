import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-amber-700 underline font-semibold"
      : "text-stone-800 hover:text-amber-700";

  return (
    <nav className="bg-amber-50 shadow-sm py-4 px-6 border-b border-stone-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Aplikasi */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl">📖</span>
          <span className="text-xl font-bold text-amber-800 tracking-tight">
            PerpusApp
          </span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex space-x-6 text-sm font-medium items-center">
          <NavLink to="/" className={linkStyle}>🏠 Beranda</NavLink>
          <NavLink to="/books" className={linkStyle}>📘 Daftar Buku</NavLink>
          <NavLink to="/borrow" className={linkStyle}>🛒 Keranjang</NavLink>
          <NavLink to="/borrowed" className={linkStyle}>📄 Riwayat</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;