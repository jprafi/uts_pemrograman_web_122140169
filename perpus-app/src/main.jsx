import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { CartProvider } from './context/CartContext'; // ✅ pastikan ini ada

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* ✅ Wajib membungkus seluruh <App /> */}
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </CartProvider>
  </React.StrictMode>
);