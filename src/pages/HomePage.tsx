import React from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../data/siteConfig';
import { getFeaturedProducts, productCategories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { heroModelImg } from '../data/products';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, ArrowUpRight, CheckCircle2, Shield, Truck, RefreshCw } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const featuredProducts = getFeaturedProducts();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#111111] text-[#F6F1E9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#A87952]">
                <span>Men's Footwear</span>
                <span>·</span>
                <span>Crafted for Pakistan</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                {siteConfig.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-[#E7DED4]/80 max-w-xl leading-relaxed">
                {siteConfig.heroSupportingCopy}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-3.5 bg-[#754C32] hover:bg-[#A87952] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>{siteConfig.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else navigate('/shop');
                  }}
                  className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#F6F1E9] border border-[#E7DED4]/40 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors"
                >
                  {siteConfig.secondaryCtaText}
                </button>
              </div>

              {/* Verified Reassurance Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#E7DED4]/80">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#A87952] shrink-0" />
                  <span>Nationwide Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#A87952] shrink-0" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <RefreshCw className="w-4 h-4 text-[#A87952] shrink-0" />
                  <span>Size Exchange Support</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/5] bg-[#1B1B1B] overflow-hidden border border-white/10 shadow-2xl">
                <ImageWithFallback
                  src={heroModelImg}
                  alt="HR Shoes Campaign Visual"
                  fallbackTitle="HR Shoes Campaign"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Visual Label */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 backdrop-blur-md p-3 border border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white tracking-wide">Signature Collection</span>
                    <button
                      onClick={() => navigate('/shop')}
                      className="text-[#A87952] hover:text-white inline-flex items-center gap-1 font-medium text-[11px]"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section id="collections" className="py-16 bg-[#F6F1E9] border-b border-[#E7DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
                Curated Footwear
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Featured Collections
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#754C32] hover:text-[#111111] transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group cursor-pointer bg-white p-6 border border-[#E7DED4] hover:border-[#754C32] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#754C32] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E7DED4]/60 flex items-center justify-between text-xs font-semibold text-[#754C32]">
                  <span>Discover</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white border-b border-[#E7DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
                Handcrafted Precision
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Featured Footwear
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#77716B] max-w-md">
              Selected silhouettes crafted for comfort, durability, and distinguished versatility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Introduction & Story */}
      <section className="py-16 bg-[#F6F1E9] border-b border-[#E7DED4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 border border-[#E7DED4]">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
              About HR Shoes
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Footwear Grounded in Daily Purpose
            </h2>
            <div className="mt-4 space-y-4 text-sm text-[#1B1B1B] leading-relaxed">
              <p>
                HR Shoes is an independent men's footwear label dedicated to creating dependable, handsomely styled shoes for Pakistani men. From formal ceremonies and business engagements in Islamabad and Lahore to active urban routines in Karachi, our collection is curated to match diverse settings.
              </p>
              <p>
                We focus on balanced proportions, reliable leather uppers, comfortable internal footbeds, and durable soles. We communicate product specifications openly so you can choose footwear with clarity.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7DED4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs text-[#77716B]">
                <span className="flex items-center gap-1.5 font-medium text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#754C32]" />
                  Transparent Pricing
                </span>
                <span className="flex items-center gap-1.5 font-medium text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#754C32]" />
                  Authentic Specifications
                </span>
              </div>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#754C32] hover:text-[#111111] transition-colors"
              >
                <span>Read Our Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Reassurance Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-[#E7DED4] bg-[#F6F1E9]">
              <Truck className="w-6 h-6 text-[#754C32]" />
              <h3 className="mt-4 text-base font-bold text-[#111111]">
                Courier Delivery across Pakistan
              </h3>
              <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
                Orders are dispatched via trusted courier networks across all major cities and regional districts. Estimated delivery is 2 to 4 business days.
              </p>
            </div>

            <div className="p-6 border border-[#E7DED4] bg-[#F6F1E9]">
              <Shield className="w-6 h-6 text-[#754C32]" />
              <h3 className="mt-4 text-base font-bold text-[#111111]">
                Cash on Delivery (COD)
              </h3>
              <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
                Inspect package integrity upon arrival and pay cash directly to the courier rider. Direct bank transfer is also supported.
              </p>
            </div>

            <div className="p-6 border border-[#E7DED4] bg-[#F6F1E9]">
              <RefreshCw className="w-6 h-6 text-[#754C32]" />
              <h3 className="mt-4 text-base font-bold text-[#111111]">
                Hassle-Free Size Exchange
              </h3>
              <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
                If the fit is not ideal, contact our WhatsApp support within 7 days of delivery. We will guide you through an easy size exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-[#111111] text-white py-14 border-t border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Elevate Your Footwear?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#E7DED4]/80 max-w-xl mx-auto">
            Browse our full catalog of loafers, formal shoes, and everyday footwear with straightforward size guides and direct assistance.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3 bg-[#754C32] hover:bg-[#A87952] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Shoes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
