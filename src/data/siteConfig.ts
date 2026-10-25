import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  brandName: 'HR Shoes',
  tagline: 'Modern Footwear for the Discerning Man',
  heroHeadline: 'Step Into Your Style.',
  heroSupportingCopy: "Explore men's footwear designed to complement your everyday look.",
  primaryCtaText: 'Shop Now',
  secondaryCtaText: 'Explore the Collection',
  contact: {
    whatsapp: '+92 300 1234567',
    whatsappRaw: '923001234567',
    email: 'contact@hrshoes.pk',
    instagram: '@hrshoes.pk',
    supportedCities: [
      'Lahore',
      'Islamabad',
      'Karachi',
      'Rawalpindi',
      'Faisalabad',
      'Multan',
      'Peshawar',
      'Sialkot',
      'Gujranwala',
      'Other Cities (Nationwide)'
    ]
  },
  policies: {
    deliveryTime: '2 to 4 business days for major urban hubs (Lahore, Islamabad, Karachi); 3 to 6 days nationwide.',
    paymentMethods: [
      'Cash on Delivery (COD)',
      'Direct Bank Transfer'
    ],
    exchangeWindow: '7-day sizing exchange window for unworn items in original packaging.'
  }
};
