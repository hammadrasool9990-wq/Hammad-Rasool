import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { formatPricePKR } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  MessageCircle,
  AlertTriangle,
  X,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalCount
  } = useCart();
  const { navigate } = useRouter();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Demo Checkout State
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    paymentPreference: 'Cash on Delivery (COD)',
    notes: ''
  });

  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutData.fullName.trim() || !checkoutData.phone.trim() || !checkoutData.address.trim()) {
      setValidationError('Please complete the full name, phone number, and delivery address.');
      return;
    }
    setValidationError('');
    setCheckoutSubmitted(true);
  };

  const generateWhatsAppOrderText = () => {
    const itemsList = items
      .map(
        (item, i) =>
          `${i + 1}. ${item.product.name} (Size: ${item.size}, Color: ${item.color}) x ${item.quantity} = ${formatPricePKR(item.product.price * item.quantity)}`
      )
      .join('\n');

    const customerDetails = checkoutData.fullName
      ? `\nCustomer: ${checkoutData.fullName}\nPhone: ${checkoutData.phone}\nCity: ${checkoutData.city}\nAddress: ${checkoutData.address}\nPayment: ${checkoutData.paymentPreference}`
      : '';

    return `Hello HR Shoes, I would like to inquire about ordering:\n\n${itemsList}\n\nEstimated Subtotal: ${formatPricePKR(subtotal)}${customerDetails}`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateWhatsAppOrderText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppOrderText());
    window.open(`https://wa.me/${siteConfig.contact.whatsappRaw}?text=${text}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#F6F1E9] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-12 max-w-lg w-full border border-[#E7DED4] text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F6F1E9] flex items-center justify-center mx-auto mb-4 border border-[#E7DED4]">
            <ShoppingBag className="w-7 h-7 text-[#754C32]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111111] tracking-tight">
            Your Shopping Bag is Empty
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#77716B] leading-relaxed max-w-sm mx-auto">
            Explore our handcrafted collection of loafers, formal shoes, and everyday styles to add to your bag.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/shop')}
              className="w-full sm:w-auto px-6 py-3 bg-[#754C32] hover:bg-[#A87952] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Explore Footwear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E7DED4] text-[#111111] hover:border-[#754C32] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F1E9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E7DED4] pb-6 mb-8 gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
              Review Bag
            </span>
            <h1 className="mt-1 text-3xl font-extrabold text-[#111111] tracking-tight">
              Shopping Bag ({totalCount} {totalCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs text-[#77716B] hover:text-red-700 font-medium inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        </div>

        {/* Cart Layout: Items Table (Left) + Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#E7DED4] divide-y divide-[#E7DED4]">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Image & Product Details */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => navigate(`/product/${item.product.slug}`)}
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-[#ECE5DB] shrink-0 border border-[#E7DED4] overflow-hidden"
                    >
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fallbackTitle={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <div className="space-y-1">
                      <button
                        onClick={() => navigate(`/product/${item.product.slug}`)}
                        className="text-left font-bold text-sm sm:text-base text-[#111111] hover:text-[#754C32] transition-colors"
                      >
                        {item.product.name}
                      </button>
                      <div className="text-xs text-[#77716B] flex items-center gap-2">
                        <span>Size: <strong className="text-[#111111]">EU {item.size}</strong></span>
                        <span>·</span>
                        <span>Colour: <strong className="text-[#111111]">{item.color}</strong></span>
                      </div>
                      <div className="text-xs font-semibold text-[#111111] tabular-nums pt-1">
                        {formatPricePKR(item.product.price)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7DED4]/60">
                    <div className="flex items-center border border-[#E7DED4] bg-[#F6F1E9]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs font-bold text-[#111111] hover:bg-[#E7DED4] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 text-xs font-bold tabular-nums text-[#111111]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs font-bold text-[#111111] hover:bg-[#E7DED4] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-bold text-[#111111] tabular-nums block">
                        {formatPricePKR(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-[#77716B] hover:text-red-700 underline mt-0.5 inline-block"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shopping Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#754C32] hover:text-[#111111] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 border border-[#E7DED4] shadow-xs space-y-4">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#E7DED4]">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#1B1B1B]">
                  <span>Items Subtotal ({totalCount})</span>
                  <span className="font-bold tabular-nums">{formatPricePKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#77716B]">
                  <span>Courier Delivery (Pakistan)</span>
                  <span className="italic">Calculated at address verification</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7DED4] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#111111]">Estimated Total</span>
                <span className="text-xl font-extrabold text-[#754C32] tabular-nums">
                  {formatPricePKR(subtotal)}
                </span>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setCheckoutSubmitted(false);
                  setShowCheckoutModal(true);
                }}
                className="w-full py-3.5 bg-[#754C32] hover:bg-[#A87952] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Order Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Direct WhatsApp Ordering Alternative */}
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-2.5 bg-[#1B1B1B] hover:bg-[#111111] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-[#333333]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Quick WhatsApp Order</span>
              </button>

              {/* Delivery Assurance */}
              <div className="pt-4 border-t border-[#E7DED4] space-y-2 text-[11px] text-[#77716B]">
                <div className="flex items-center gap-2 text-[#111111]">
                  <Truck className="w-3.5 h-3.5 text-[#754C32] shrink-0" />
                  <span>Delivery across Lahore, Karachi, Islamabad & nationwide</span>
                </div>
                <div className="flex items-center gap-2 text-[#111111]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#754C32] shrink-0" />
                  <span>Cash on Delivery & 7-day size exchange</span>
                </div>
              </div>
            </div>

            {/* Transparent Architecture Notice */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 text-amber-900 text-xs">
              <strong className="block font-bold">Frontend Demonstration Notice:</strong>
              <p className="mt-1 text-[11px] leading-relaxed">
                This store is a frontend presentation. No actual card charges or automated payments occur. Clicking checkout allows previewing order submission details or opening WhatsApp to communicate with the brand.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 border border-[#E7DED4] shadow-2xl">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm text-[#111111]">Clear Shopping Bag?</h3>
            </div>
            <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
              Are you sure you want to remove all {totalCount} items from your shopping bag?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 border border-[#E7DED4] text-xs font-semibold text-[#111111] hover:bg-[#F6F1E9]"
              >
                Keep Items
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 bg-red-700 text-white text-xs font-semibold hover:bg-red-800"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frontend-Only Checkout Demonstration Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 border border-[#E7DED4] shadow-2xl my-8 relative">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-1 text-[#77716B] hover:text-[#111111]"
              aria-label="Close checkout modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!checkoutSubmitted ? (
              <>
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#754C32]">
                    Order Inquiry (Demonstration)
                  </span>
                  <h3 className="text-xl font-extrabold text-[#111111]">
                    Complete Your Delivery Details
                  </h3>
                  <p className="text-xs text-[#77716B] mt-1">
                    Provide your destination in Pakistan to verify your footwear order.
                  </p>
                </div>

                {validationError && (
                  <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {validationError}
                  </div>
                )}

                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#111111] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Ahmed"
                      value={checkoutData.fullName}
                      onChange={(e) => setCheckoutData({ ...checkoutData, fullName: e.target.value })}
                      className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#111111] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#111111] mb-1">
                        City *
                      </label>
                      <select
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                      >
                        {siteConfig.contact.supportedCities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#111111] mb-1">
                      Complete Shipping Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House / Flat #, Street, Area / Sector..."
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#111111] mb-1">
                      Payment Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {['Cash on Delivery (COD)', 'Direct Bank Transfer'].map((method) => (
                        <label
                          key={method}
                          className={`flex items-center gap-2 p-2.5 border cursor-pointer ${
                            checkoutData.paymentPreference === method
                              ? 'border-[#754C32] bg-[#F6F1E9] font-semibold text-[#754C32]'
                              : 'border-[#E7DED4] text-[#111111]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={checkoutData.paymentPreference === method}
                            onChange={() => setCheckoutData({ ...checkoutData, paymentPreference: method as any })}
                            className="accent-[#754C32]"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#111111] mb-1">
                      Delivery / Sizing Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Special instructions, nearest landmark, etc."
                      value={checkoutData.notes}
                      onChange={(e) => setCheckoutData({ ...checkoutData, notes: e.target.value })}
                      className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E7DED4] space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#754C32] hover:bg-[#A87952] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Confirm Order Inquiry Details
                    </button>
                    <p className="text-[11px] text-[#77716B] text-center">
                      Frontend demonstration: No real order is charged online.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111111]">
                    Inquiry Details Ready
                  </h3>
                  <p className="text-xs text-[#77716B] mt-1 max-w-sm mx-auto">
                    Your inquiry details for {checkoutData.fullName} in {checkoutData.city} have been structured. You can send this directly to HR Shoes via WhatsApp or copy the order summary.
                  </p>
                </div>

                <div className="bg-[#F6F1E9] p-4 text-left text-xs border border-[#E7DED4] space-y-1 font-mono">
                  <div className="font-bold text-[#111111]">Order Summary:</div>
                  <div>Recipient: {checkoutData.fullName} ({checkoutData.city})</div>
                  <div>Phone: {checkoutData.phone}</div>
                  <div>Total: {formatPricePKR(subtotal)} ({totalCount} items)</div>
                  <div>Payment: {checkoutData.paymentPreference}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={handleSendWhatsApp}
                    className="flex-1 py-3 bg-[#111111] hover:bg-[#754C32] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopySummary}
                    className="flex-1 py-3 border border-[#E7DED4] bg-white text-[#111111] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#F6F1E9] transition-colors"
                  >
                    {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-xs text-[#77716B] hover:text-[#111111] underline block mx-auto mt-2"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
