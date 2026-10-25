import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About & Contact', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim Top Notification Bar */}
      <div className="bg-[#111111] text-[#F6F1E9] text-[11px] sm:text-xs tracking-wide py-2 px-4 text-center border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Nationwide Delivery across Pakistan</span>
          <span className="text-[#A87952]">·</span>
          <span>Cash on Delivery Available</span>
        </div>
      </div>

      {/* Main Header with Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#F6F1E9]/95 backdrop-blur-md border-b border-[#E7DED4] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('/')}
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] hover:text-[#754C32] transition-colors whitespace-nowrap shrink-0 text-left"
            >
              <span className="font-extrabold tracking-tighter">{siteConfig.brandName}</span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#111111]">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.path);

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#754C32] font-semibold'
                      : 'text-[#1B1B1B] hover:text-[#754C32]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#754C32]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('/cart')}
              aria-label={`Shopping bag with ${totalCount} items`}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                currentPath === '/cart'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white border border-[#E7DED4] text-[#111111] hover:border-[#754C32]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#754C32]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-bold text-xs bg-[#754C32] text-white rounded-full px-1.5 py-0.2 min-w-5 text-center">
                {totalCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-[#111111] hover:text-[#754C32] rounded focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7DED4] bg-[#F6F1E9] px-6 py-6 shadow-xl transition-all">
            <nav className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(link.path);

                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`text-left py-2 border-b border-[#E7DED4]/60 flex items-center justify-between ${
                      isActive
                        ? 'text-[#754C32] font-bold'
                        : 'text-[#111111] hover:text-[#754C32]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#754C32]" />}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick('/cart')}
                className="mt-2 w-full py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#A87952]" />
                <span>View Shopping Bag ({totalCount})</span>
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
