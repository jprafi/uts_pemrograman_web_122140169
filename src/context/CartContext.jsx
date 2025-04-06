import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(book) {
    const alreadyInCart = cart.some((item) => item.id === book.id);

    if (alreadyInCart) {
      toast.error(`⚠️ "${book.title}" sudah ada di keranjang.`);
      return;
    }

    setCart((prev) => [...prev, book]);
    toast.success(`📘 "${book.title}" berhasil ditambahkan ke keranjang!`);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}