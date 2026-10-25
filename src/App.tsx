/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const RouteDispatcher: React.FC = () => {
  const { route, navigate } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'shop':
      return <ShopPage />;
    case 'product':
      return <ProductDetailPage slug={route.params.slug || ''} />;
    case 'cart':
      return <CartPage />;
    case 'about':
      return <AboutContactPage />;
    case 'not-found':
    default:
      return (
        <div className="bg-[#F6F1E9] min-h-[70vh] flex items-center justify-center p-4">
          <div className="bg-white p-10 max-w-md w-full border border-[#E7DED4] text-center shadow-xs">
            <AlertCircle className="w-10 h-10 text-[#754C32] mx-auto mb-3" />
            <h1 className="text-xl font-bold text-[#111111]">Page Not Found</h1>
            <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
              The page or footwear address you requested does not exist.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2.5 bg-[#111111] hover:bg-[#754C32] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      );
  }
};

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#F6F1E9] text-[#111111]">
          <Header />
          <main className="flex-grow">
            <RouteDispatcher />
          </main>
          <Footer />
          <Toast />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}
