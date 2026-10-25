import React from 'react';
import { Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#111111] text-white p-4 shadow-xl border border-[#333333] flex items-center justify-between gap-3 animate-fade-in"
    >
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 rounded-full bg-[#754C32] flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-white" />
        </span>
        <p className="text-sm font-medium leading-tight">{toastMessage}</p>
      </div>
      <button
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="p-1 text-[#A87952] hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
