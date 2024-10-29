'use client';

import { CartProvider } from '../context/CartContext';
import { SearchProvider } from '../context/SearchContext';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}