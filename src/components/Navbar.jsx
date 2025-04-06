import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">📚 PerpusApp</Link>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          Beranda
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          Daftar Buku
        </NavLink>

        <NavLink
          to="/borrow"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          Keranjang
        </NavLink>

        <NavLink
          to="/borrowed"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          Riwayat
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;