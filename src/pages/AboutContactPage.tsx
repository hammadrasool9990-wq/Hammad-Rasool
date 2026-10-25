import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import {
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Clock,
  Shield,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Send,
  Sparkles
} from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    city: 'Lahore',
    subject: 'Sizing & Availability',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      setFormStatus('error');
      return;
    }

    setFormStatus('success');
    setErrorMessage('');
  };

  const faqs = [
    {
      q: 'Which cities across Pakistan do you deliver to?',
      a: 'We deliver nationwide via verified courier services. Major urban destinations including Lahore, Islamabad, Rawalpindi, and Karachi typically arrive in 2 to 4 business days. Regional destinations take approximately 3 to 5 business days.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes. Cash on Delivery is supported across all serviceable postal codes in Pakistan. You pay the exact order amount in cash to the delivery rider upon package delivery.'
    },
    {
      q: 'How do I choose the correct shoe size?',
      a: 'All HR Shoes are built on standard European (EU) sizing (EU 40 through 45). If you normally wear a size 42 in standard dress shoes, select 42. For our lug sole loafers and sneakers, standard sizing is recommended.'
    },
    {
      q: 'What is your exchange policy if the size does not fit?',
      a: 'We offer a straightforward 7-day size exchange window for unworn pairs kept in original packaging. Simply contact our support team with your order details to request a size swap.'
    },
    {
      q: 'Can I inspect the shoes before paying the courier rider?',
      a: 'Courier protocols require package acceptance and payment prior to unsealing the transit flyer. However, our 7-day exchange and inspection guarantee protects you if any sizing issue arises after opening.'
    }
  ];

  const brandValues = [
    {
      title: 'Style-Led Curation',
      desc: 'Footwear focused on versatile shapes, balanced soles, and neutral tones that pair naturally with modern wardrobes in Pakistan.'
    },
    {
      title: 'Transparent Information',
      desc: 'We present clear specifications—leather type, sole composition, and fit advice—without exaggerated claims.'
    },
    {
      title: 'Straightforward Shopping',
      desc: 'From simple size picking to direct WhatsApp assistance and Cash on Delivery, every step is built for ease.'
    },
    {
      title: 'Direct Accountability',
      desc: 'Accessible support for sizing guidance, delivery tracking, and hassle-free exchanges.'
    }
  ];

  return (
    <div className="bg-[#F6F1E9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: About HR Shoes Brand Intro */}
        <div className="bg-white p-8 sm:p-14 border border-[#E7DED4]">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
              Our Foundation
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              About HR Shoes
            </h1>
            <p className="mt-4 text-base text-[#1B1B1B] leading-relaxed">
              HR Shoes was created with a straightforward goal: to provide Pakistani men with distinguished footwear that balances everyday durability with contemporary elegance.
            </p>
            <p className="mt-3 text-sm text-[#77716B] leading-relaxed">
              Finding shoes that perform reliably on daily commutes while looking sharp at weddings, business meetings, and casual dinners often proves challenging. We curate specific silhouettes—from rugged lug-sole loafers to pristine wholecut oxfords—crafted to withstand urban conditions without compromising on aesthetic refinement.
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="mt-12 pt-8 border-t border-[#E7DED4] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((val, idx) => (
              <div key={idx} className="p-4 bg-[#F6F1E9] border border-[#E7DED4]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  {val.title}
                </h3>
                <p className="mt-2 text-xs text-[#77716B] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Contact Channels & Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Channels & Business Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E7DED4] space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
                  Get In Touch
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[#111111]">
                  Customer Channels
                </h2>
                <p className="mt-1 text-xs text-[#77716B] leading-relaxed">
                  Reach out directly for sizing questions, product availability, or custom delivery inquiries.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-[#E7DED4] bg-[#F6F1E9] hover:border-[#754C32] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[#111111] block">WhatsApp Business</span>
                      <span className="text-[#77716B]">{siteConfig.contact.whatsapp}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#754C32] group-hover:underline">
                    Chat Now →
                  </span>
                </a>

                {/* Email */}
                <div className="p-4 border border-[#E7DED4] bg-[#F6F1E9] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#111111] block">Email Inquiries</span>
                    <span className="text-[#77716B]">{siteConfig.contact.email}</span>
                  </div>
                </div>

                {/* Instagram */}
                <div className="p-4 border border-[#E7DED4] bg-[#F6F1E9] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#754C32] text-white flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#111111] block">Instagram</span>
                    <span className="text-[#77716B]">{siteConfig.contact.instagram}</span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-[#E7DED4] space-y-2 text-xs text-[#77716B]">
                <div className="flex items-center gap-2 text-[#111111] font-semibold">
                  <Clock className="w-4 h-4 text-[#754C32]" />
                  <span>Support Availability</span>
                </div>
                <p className="leading-relaxed">
                  Monday – Saturday: 10:00 AM – 8:00 PM PKT<br />
                  Sunday: Online inquiries processed via WhatsApp
                </p>
              </div>
            </div>

            {/* Nationwide Presence Card */}
            <div className="bg-[#111111] text-white p-6 border border-[#222222]">
              <div className="flex items-center gap-2 text-[#A87952] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Cities Served</span>
              </div>
              <p className="mt-2 text-xs text-[#E7DED4]/80 leading-relaxed">
                Dispatch hubs serving Lahore, Islamabad, Karachi, Rawalpindi, Faisalabad, Multan, Peshawar, Sialkot, and regional towns across Pakistan.
              </p>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 border border-[#E7DED4] shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
                Send a Message
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[#111111]">
                Inquiry Form
              </h2>
              <p className="mt-1 text-xs text-[#77716B]">
                Have a question regarding fit, a specific pair, or delivery timing? Send us a note below.
              </p>

              {formStatus === 'success' ? (
                <div className="my-8 p-6 bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h3 className="font-bold text-emerald-950 text-sm">
                    Inquiry Preview Generated Successfully
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Because this is a frontend demonstration, message records are not stored on an external database.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const msg = `Inquiry from ${formData.name} (${formData.contact}, ${formData.city}):\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
                        window.open(`https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Forward Directly to WhatsApp</span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({
                        name: '',
                        contact: '',
                        city: 'Lahore',
                        subject: 'Sizing & Availability',
                        message: ''
                      });
                    }}
                    className="block text-xs text-emerald-700 underline mx-auto mt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#111111] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Asad Malik"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#111111] mb-1">
                        Phone or Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 0300-1234567 or email@domain.com"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#111111] mb-1">
                        Your City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                      >
                        {siteConfig.contact.supportedCities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#111111] mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                      >
                        <option value="Sizing & Availability">Sizing & Availability</option>
                        <option value="Delivery Timing Inquiry">Delivery Timing Inquiry</option>
                        <option value="Order Status / Tracking">Order Status / Tracking</option>
                        <option value="Exchange Request">Exchange Request</option>
                        <option value="Other Question">Other Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#111111] mb-1">
                      Message Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please let us know which shoe model or sizing question you have..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 border border-[#E7DED4] bg-[#F6F1E9] text-[#111111] focus:bg-white focus:border-[#754C32]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#754C32] hover:bg-[#A87952] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                    >
                      <span>Send Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <p className="mt-2 text-[11px] text-[#77716B]">
                      Note: This is a frontend demonstration form with instant validation feedback.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Section 3: Frequently Asked Questions Accordion */}
        <div className="bg-white p-8 sm:p-12 border border-[#E7DED4]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#754C32]">
              Clear Policies
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#77716B]">
              Transparent answers regarding Pakistani delivery times, Cash on Delivery, and sizing.
            </p>
          </div>

          <div className="divide-y divide-[#E7DED4] border-t border-b border-[#E7DED4]">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-1 text-sm font-bold text-[#111111] hover:text-[#754C32] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#754C32] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs text-[#77716B] leading-relaxed pr-8">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
