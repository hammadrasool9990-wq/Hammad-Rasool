export type ProductCategory = 'Loafers' | 'Formal Shoes' | 'Everyday Styles' | 'Casual Shoes';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // in PKR
  originalPrice?: number; // Verified discount only
  images: string[];
  availableSizes: string[];
  availableColors: string[];
  featured: boolean;
  tag?: string;
  description: string;
  specifications: ProductSpecification[];
  details: string[];
  isSample?: boolean;
}

export interface CartItem {
  id: string; // unique key combining productId + size + color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingCopy: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  contact: {
    whatsapp: string;
    whatsappRaw: string; // for wa.me links
    email: string;
    instagram: string;
    supportedCities: string[];
  };
  policies: {
    deliveryTime: string;
    paymentMethods: string[];
    exchangeWindow: string;
  };
}

export interface OrderInquiryData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentPreference: 'Cash on Delivery (COD)' | 'Direct Bank Transfer';
  notes?: string;
}

export interface ContactFormData {
  fullName: string;
  phoneOrEmail: string;
  city: string;
  subject: string;
  message: string;
}
