import React from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../data/siteConfig';
import { MessageCircle, Mail, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleLink = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-[#111111] text-[#F6F1E9] border-t border-[#222222]">
      {/* Upper Reassurance Strip */}
      <div className="border-b border-[#222222] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#A87952] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Nationwide Shipping</h4>
                <p className="text-xs text-[#77716B] mt-1">
                  Prompt delivery across Lahore, Karachi, Islamabad, Rawalpindi, and all major Pakistani cities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#A87952] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Cash on Delivery & Exchanges</h4>
                <p className="text-xs text-[#77716B] mt-1">
                  Pay upon delivery with 7-day size exchange assistance for unworn pairs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-[#A87952] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Direct WhatsApp Assistance</h4>
                <p className="text-xs text-[#77716B] mt-1">
                  Direct personal sizing and order inquiries via WhatsApp: {siteConfig.contact.whatsapp}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1">
            <span className="text-2xl font-extrabold tracking-tight text-white block">
              {siteConfig.brandName}
            </span>
            <p className="mt-3 text-xs leading-relaxed text-[#77716B]">
              Refined men's footwear designed to complement contemporary lifestyles in Pakistan. Loafers, formal dress shoes, and everyday silhouettes.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B1B1B] text-xs font-medium text-[#A87952] hover:text-white border border-[#333333] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => handleLink('/about')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B1B1B] text-xs font-medium text-[#A87952] hover:text-white border border-[#333333] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Explore</h5>
            <ul className="mt-4 space-y-2 text-xs text-[#77716B]">
              <li>
                <button
                  onClick={() => handleLink('/')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/shop')}
                  className="hover:text-white transition-colors"
                >
                  All Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/shop')}
                  className="hover:text-white transition-colors"
                >
                  Loafers Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/shop')}
                  className="hover:text-white transition-colors"
                >
                  Formal Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/shop')}
                  className="hover:text-white transition-colors"
                >
                  Everyday Styles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Customer Care</h5>
            <ul className="mt-4 space-y-2 text-xs text-[#77716B]">
              <li>
                <button
                  onClick={() => handleLink('/about')}
                  className="hover:text-white transition-colors"
                >
                  About HR Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/about')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/about')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/cart')}
                  className="hover:text-white transition-colors"
                >
                  Review Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Transparent Disclosure */}
          <div className="bg-[#1B1B1B] p-5 border border-[#2B2B2B]">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A87952]">
              Storefront Notice
            </h5>
            <p className="mt-2 text-xs text-[#77716B] leading-normal">
              This web application is a frontend demonstration showcase. No live payments or automated order fulfillment are processed online.
            </p>
            <button
              onClick={() => handleLink('/shop')}
              className="mt-4 w-full py-2 bg-[#754C32] text-white text-xs font-medium hover:bg-[#A87952] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77716B] gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed for customers in Lahore, Islamabad, Karachi & across Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
};
