"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import StickyFooterReveal from '@/components/StickyFooterReveal';
import { getContactInfo, ContactInfo } from '@/lib/db';

const DEFAULTS: ContactInfo = {
  email: "merhaba@nidastudio.com",
  phone: "+90 500 123 45 67",
  instagram: "https://instagram.com/nidastudio",
  twitter: "https://twitter.com/nidastudio",
  linkedin: "https://linkedin.com/company/nidastudio",
  address: "Zorlu Center, Levent, İstanbul, Türkiye",
};

export default function ContactPage() {
  const [form, setForm] = useState({ isim: '', email: '', mesaj: '' });
  const [sent, setSent] = useState(false);
  const [info, setInfo] = useState<ContactInfo>(DEFAULTS);

  useEffect(() => {
    getContactInfo().then((data) => { if (data) setInfo(data); });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada form gönderim entegrasyonu yapılabilir
    setSent(true);
  };

  return (
    <>
      <main className="relative z-10 bg-white">
        <Header />

        {/* ── Hero ── */}
        <div className="site-px pt-12 pb-10">
          <div className="flex items-end justify-between gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10vw] font-light leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              konuşalım.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:block text-sm text-black/50 leading-relaxed max-w-[240px] text-right pb-3 shrink-0"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Projenizden, bir fikirden veya aklınızdaki sorudan bahsedin. Size 1-2 iş günü içinde geri dönüş sağlayacağız.
            </motion.p>
          </div>
        </div>

        {/* ── İletişim + Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="site-px pb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-t border-black/10 pt-12">

            {/* ── Sol: İletişim Bilgileri ── */}
            <div className="flex flex-col gap-0">
              {/* E-posta + Telefon */}
              <div className="pb-8 border-b border-black/8">
                <a
                  href={`mailto:${info.email}`}
                  className="text-sm font-semibold text-black hover:opacity-50 transition-opacity block mb-1"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {info.email}
                </a>
                <a
                  href={`tel:${info.phone.replace(/\s/g, '')}`}
                  className="text-sm text-black/50 hover:opacity-50 transition-opacity block"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {info.phone}
                </a>
              </div>

              {/* Sosyal Medya */}
              <div className="py-8 border-b border-black/8">
                {[
                  { label: 'Instagram', href: info.instagram },
                  { label: 'Twitter / X', href: info.twitter },
                  { label: 'LinkedIn', href: info.linkedin },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-black transition-colors block mb-1.5"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>


            </div>

            {/* ── Sağ: Form ── */}
            {sent ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="text-3xl mb-4">✓</div>
                  <p className="text-base font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                    Mesajınız alındı.
                  </p>
                  <p className="text-sm text-black/45" style={{ fontFamily: 'var(--font-inter)' }}>
                    En kısa sürede size dönüş yapacağız.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* İsim */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-black tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    İsim<span className="text-black/40">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John"
                    value={form.isim}
                    onChange={(e) => setForm({ ...form, isim: e.target.value })}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3.5 text-sm text-black placeholder:text-black/30 outline-none focus:bg-black/[0.07] transition-colors"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>

                {/* E-posta */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-black tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    E-posta<span className="text-black/40">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3.5 text-sm text-black placeholder:text-black/30 outline-none focus:bg-black/[0.07] transition-colors"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>

                {/* Mesaj */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-black tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    Mesaj<span className="text-black/40">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Proje detayları..."
                    value={form.mesaj}
                    onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3.5 text-sm text-black placeholder:text-black/30 outline-none focus:bg-black/[0.07] transition-colors resize-none"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>

                {/* Gönder */}
                <button
                  type="submit"
                  className="w-full bg-black text-white text-sm font-semibold py-4 rounded-lg hover:bg-black/80 transition-colors mt-1"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Mesaj Gönder
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </main>

      <StickyFooterReveal />
    </>
  );
}
