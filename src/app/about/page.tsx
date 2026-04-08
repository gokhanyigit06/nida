"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import StickyFooterReveal from '@/components/StickyFooterReveal';
import { getAboutContent, AboutContent } from '@/lib/db';

const DEFAULTS: AboutContent = {
  heroDesc: "Karmaşayı sadeliğe dönüştürerek, en güçlü etkiyi yaratan bir tasarım stüdyosuyuz.",
  storyTitle: "Nida, görüntünün bir markayı dönüştürebileceğine olan güçlü inançla doğdu.",
  storyDesc: "Yaratıcı endüstrideki gürültü ve karmaşadan uzaklaşarak; farklı, net, niyet ve sadeliğe odaklanan bir stüdyo kurmak için yola çıktık.",
  teamTitle: "Video editçiler, yaratıcı kafalar ve hikaye anlatıcılarından oluşan bir aileyiz.",
  clientsDesc: "Net, anlamlı ve kalıcı işler yaratmak için vizyoner markalarla işbirliği yapıyoruz.",
  yearRange: "2020–2025",
};

const STATS = [
  '15+ Yıllık Deneyim',
  '140+ Başarılı Proje',
  '%97 Müşteri Memnuniyeti',
  '6 Sektör Ödülü',
];

const StatsMarquee = () => {
  const items = [...STATS, ...STATS, ...STATS, ...STATS];
  return (
    <div className="overflow-hidden border-t border-black/10 py-3 mt-10 relative">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 text-xs font-medium tracking-[0.18em] text-black/40 pr-10" style={{ fontFamily: 'var(--font-inter)' }}>
            {item}
            <span className="text-black/20 text-[8px]">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const CLIENTS = [
  { name: 'Norda',      year: '2025', icon: <polygon points="24,4 44,40 4,40" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
  { name: 'Velin',      year: '2025', icon: <circle cx="24" cy="24" r="12" fill="currentColor" /> },
  { name: 'Forma',      year: '2024', icon: <path d="M4,24 Q24,4 44,24 Q24,44 4,24Z" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
  { name: 'Lune',       year: '2023', icon: <><rect x="14" y="14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="20" y="20" width="14" height="14" fill="currentColor"/></> },
  { name: 'Studio Oko', year: '2023', icon: <><circle cx="17" cy="24" r="5" fill="currentColor"/><circle cx="31" cy="24" r="5" fill="currentColor"/></> },
  { name: 'Aren',       year: '2022', icon: <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="1.5"/> },
];

const TEAM = [
  { name: 'Nida Yılmaz',  role: 'Kurucu & Yaratıcı Direktör', bg: '#e2ddd8' },
  { name: 'Mert Aydın',   role: 'Video Prodüksiyon Direktörü',  bg: '#2b2d42' },
  { name: 'Selin Kaya',   role: 'İçerik & Strateji Uzmanı',     bg: '#c9b99a' },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>(DEFAULTS);

  useEffect(() => {
    getAboutContent().then((data) => { if (data) setContent(data); });
  }, []);

  return (
    <>
      <main className="relative z-10 bg-white">
        <Header />

        {/* ── Hero Başlık ── */}
        <div className="site-px pt-12">
          <div className="flex items-end justify-between gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10vw] font-light leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              hakkımızda.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:block text-sm text-black/50 leading-relaxed max-w-[220px] text-right pb-3 shrink-0"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {content.heroDesc}
            </motion.p>
          </div>

          <div className="relative">
            <StatsMarquee />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute right-0 bottom-3 text-right hidden md:block"
            >
              <div className="text-xs text-black/30 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{content.yearRange}</div>
              <div className="text-xs text-black/50 font-semibold" style={{ fontFamily: 'var(--font-inter)' }}>© Nida Studio</div>
            </motion.div>
          </div>
        </div>

        {/* ── Hero Görsel ── */}
        <motion.div {...fadeUp} className="site-px mt-8">
          <div
            className="w-full relative overflow-hidden rounded-xl bg-[#e8e2da]"
            style={{ aspectRatio: '21 / 9' }}
          >
            <Image
              src="/about-hero.jpg"
              alt="Nida Studio"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            {/* Placeholder — görsel yokken */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center opacity-20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Müşterilerimiz ── */}
        <motion.div {...fadeUp} className="site-px mt-24 pb-20">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs text-black/40 font-medium tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>/Müşterilerimiz</span>
            <span className="text-xs text-black/30 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>(02)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Sol açıklama */}
            <div className="md:pt-4">
              <h2 className="text-2xl font-semibold text-black leading-[1.25] tracking-tight mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                {content.clientsDesc}
              </h2>
              <p className="text-sm text-black/45 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                İster global markalar ister yeni girişimler olsun; güven, niyet ve ortak vizyon üzerine kurulu her ilişkiye değer veriyoruz.
              </p>
            </div>

            {/* Sağ — müşteri kartları */}
            <div className="grid grid-cols-3 gap-3">
              {CLIENTS.map((client, i) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-black/10 rounded-lg p-5 flex flex-col justify-between aspect-square"
                >
                  <span className="text-xs text-black/35 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{client.name}</span>
                  <div className="flex items-center justify-center py-2">
                    <svg width="48" height="48" viewBox="0 0 48 48" className="text-black/70">
                      {client.icon}
                    </svg>
                  </div>
                  <span className="text-xs text-black/30 font-medium text-right" style={{ fontFamily: 'var(--font-inter)' }}>{client.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>




      </main>

      <StickyFooterReveal />
    </>
  );
}
