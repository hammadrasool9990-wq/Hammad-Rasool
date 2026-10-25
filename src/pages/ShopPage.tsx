import React, { useState, useMemo, useEffect } from 'react';
import { products, productCategories } from '../data/products';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Check URL params for initial category
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.availableSizes.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Size filter
        if (selectedSize !== 'All' && !product.availableSizes.includes(selectedSize)) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCategory = product.category.toLowerCase().includes(q);
          const matchesDescription = product.description.toLowerCase().includes(q);
          const matchesColor = product.availableColors.some((c) => c.toLowerCase().includes(q));
          if (!matchesName && !matchesCategory && !matchesDescription && !matchesColor) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        // Featured default
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedSize, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedSize !== 'All' ||
    sortBy !== 'featured';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize('All');
    setSortBy('featured');
    // Clear URL search params
    window.history.replaceState({}, '', '/shop');
  };

  return (
    <div className="bg-[#F6F1E9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb Header */}
        <div className="border-b border-[#E7DED4] pb-6 mb-8">
          <div className="text-xs uppercase tracking-widest text-[#754C32] font-semibold">
            Catalog
          </div>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              All Men's Footwear
            </h1>
            <span className="text-xs font-medium text-[#77716B] tabular-nums">
              Showing {filteredProducts.length} of {products.length} footwear styles
            </span>
          </div>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="bg-white p-4 border border-[#E7DED4] mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by shoe name, leather style, or color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-[#F6F1E9]/50 border border-[#E7DED4] text-xs text-[#111111] placeholder-[#77716B] focus:border-[#754C32] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#77716B] hover:text-[#111111]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Segmented Selector (Desktop) */}
            <div className="hidden md:flex md:col-span-4 items-center gap-1 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === 'All'
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F6F1E9] text-[#1B1B1B] hover:bg-[#E7DED4]'
                }`}
              >
                All
              </button>
              {productCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.name
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#F6F1E9] text-[#1B1B1B] hover:bg-[#E7DED4]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#77716B] whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto py-2 px-3 bg-[#F6F1E9] border border-[#E7DED4] text-xs font-medium text-[#111111] focus:border-[#754C32] focus:bg-white"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
              </select>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="md:hidden p-2 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111]"
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Size Filter Row & Active Filter Reset */}
          <div className="pt-3 border-t border-[#E7DED4]/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#754C32]">
                Size (EU):
              </span>
              <button
                onClick={() => setSelectedSize('All')}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                  selectedSize === 'All'
                    ? 'border-[#754C32] bg-[#754C32] text-white'
                    : 'border-[#E7DED4] bg-[#F6F1E9] text-[#111111] hover:border-[#754C32]'
                }`}
              >
                All
              </button>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                    selectedSize === size
                      ? 'border-[#754C32] bg-[#754C32] text-white'
                      : 'border-[#E7DED4] bg-[#F6F1E9] text-[#111111] hover:border-[#754C32]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#754C32] hover:text-[#111111] font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Mobile Categories Collapsible Drawer */}
          {mobileFiltersOpen && (
            <div className="md:hidden pt-4 border-t border-[#E7DED4] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                Category
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 text-xs font-medium ${
                    selectedCategory === 'All'
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#F6F1E9] text-[#1B1B1B]'
                  }`}
                >
                  All
                </button>
                {productCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1.5 text-xs font-medium ${
                      selectedCategory === cat.name
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F6F1E9] text-[#1B1B1B]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-[#E7DED4] max-w-lg mx-auto my-12">
            <h3 className="text-lg font-bold text-[#111111]">No footwear matched your search</h3>
            <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
              We couldn't find any shoes matching your selected filters. Try broadening your criteria or reset the search filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-[#754C32] hover:bg-[#A87952] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Footwear</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
