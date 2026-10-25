import React, { useState } from 'react';
import { getProductBySlug, getRelatedProducts, formatPricePKR } from '../data/products';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.availableColors[0] || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="bg-[#F6F1E9] min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 max-w-md w-full border border-[#E7DED4] text-center">
          <AlertCircle className="w-10 h-10 text-[#754C32] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#111111]">Product Not Found</h2>
          <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
            The footwear style you requested could not be located in our catalog.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-6 px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#754C32] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shop</span>
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="bg-[#F6F1E9] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7DED4] gap-4 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#77716B]">
            <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => navigate('/shop')} className="hover:text-[#111111] transition-colors">
              Footwear
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#754C32] font-medium">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
            <span className="text-[#111111] font-semibold truncate max-w-[200px] hidden sm:inline">
              {product.name}
            </span>
          </nav>

          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#754C32] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Footwear</span>
          </button>
        </div>

        {/* Contiguous PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 border border-[#E7DED4]">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] bg-[#ECE5DB] border border-[#E7DED4] overflow-hidden">
              <ImageWithFallback
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 bg-[#111111]/85 text-white text-xs font-medium uppercase tracking-wider px-3 py-1">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Thumbnail Selection */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#754C32] ring-1 ring-[#754C32]'
                        : 'border-[#E7DED4] hover:border-[#77716B]'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Key Highlights */}
            <div className="pt-6 border-t border-[#E7DED4] mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Design & Construction Highlights
              </h3>
              <ul className="space-y-2 text-xs text-[#1B1B1B]">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#754C32] mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
                  {product.category}
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                  {product.name}
                </h1>
                
                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#111111] tabular-nums">
                    {formatPricePKR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#77716B] line-through tabular-nums">
                      {formatPricePKR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#1B1B1B] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-[#111111]">Colour:</span>
                  <span className="text-[#754C32]">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                        selectedColor === color
                          ? 'border-[#754C32] bg-[#754C32] text-white'
                          : 'border-[#E7DED4] bg-[#F6F1E9] text-[#111111] hover:border-[#754C32]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with Mandatory Validation */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-[#111111]">Select Size (EU):</span>
                  {sizeError && (
                    <span className="text-red-700 font-bold flex items-center gap-1 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Please select a size
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`py-2 text-xs font-bold text-center border transition-all ${
                        selectedSize === size
                          ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                          : 'border-[#E7DED4] bg-white text-[#111111] hover:border-[#754C32]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-[#77716B]">
                  True to standard European shoe sizes. Fits comfortable with regular socks.
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-4 border-t border-[#E7DED4] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#E7DED4] bg-[#F6F1E9]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm font-bold text-[#111111] hover:bg-[#E7DED4] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-4 text-xs font-bold tabular-nums text-[#111111]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3 py-2 text-sm font-bold text-[#111111] hover:bg-[#E7DED4] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      addedSuccess
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#754C32] hover:bg-[#A87952] text-white shadow-sm'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>

                {addedSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                    <span>Item added to your shopping bag.</span>
                    <button
                      onClick={() => navigate('/cart')}
                      className="underline font-bold hover:text-emerald-950"
                    >
                      View Bag →
                    </button>
                  </div>
                )}
              </div>

              {/* Verified Reassurance List */}
              <div className="pt-4 border-t border-[#E7DED4] space-y-3 text-xs text-[#1B1B1B]">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#754C32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#111111]">Nationwide Dispatch: </span>
                    <span className="text-[#77716B]">2-4 business days across major Pakistani cities.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#754C32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#111111]">Cash on Delivery: </span>
                    <span className="text-[#77716B]">Pay cash directly to the courier rider upon package inspection.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#754C32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#111111]">7-Day Size Exchange: </span>
                    <span className="text-[#77716B]">Easy exchange support if the size doesn't fit perfectly.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Specifications Accordion / Block */}
            <div className="mt-8 pt-6 border-t border-[#E7DED4]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Material & Specifications
              </h3>
              <div className="divide-y divide-[#E7DED4] text-xs">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="py-2 flex justify-between">
                    <span className="text-[#77716B]">{spec.label}</span>
                    <span className="font-semibold text-[#111111] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E7DED4]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                Complementary Styles
              </h2>
              <button
                onClick={() => navigate('/shop')}
                className="text-xs font-semibold uppercase tracking-wider text-[#754C32] hover:text-[#111111]"
              >
                View Collection →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
