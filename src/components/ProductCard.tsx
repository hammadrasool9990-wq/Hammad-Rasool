import React from 'react';
import { Product } from '../types';
import { formatPricePKR } from '../data/products';
import { useRouter } from '../context/RouterContext';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate } = useRouter();

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white border border-[#E7DED4] transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Product Image Slot: 70% visual presence */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE5DB]">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Text Tag (No pill enclosure) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#111111]/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide uppercase px-2.5 py-1">
            {product.tag}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#754C32]">
            {product.category}
          </div>

          {/* Title */}
          <h3 className="mt-1 text-base font-semibold text-[#111111] group-hover:text-[#754C32] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Available Colors summary */}
          <p className="mt-1 text-xs text-[#77716B] line-clamp-1">
            {product.availableColors.join(' · ')}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#E7DED4]/60 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#111111] tabular-nums">
              {formatPricePKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#77716B] line-through tabular-nums">
                {formatPricePKR(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#754C32] group-hover:text-[#111111] transition-colors">
            View
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
