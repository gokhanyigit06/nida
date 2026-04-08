"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import StickyFooterReveal from '@/components/StickyFooterReveal';
import { getAboutContent, getBrands, AboutContent, Brand } from '@/lib/db';

const DEFAULTS: AboutContent = {
  heroTitle: "hakkımda.",
  heroImage: "",
  heroDesc: "",
  storyTitle: "",
  storyDesc: "",
  teamTitle: "",
  clientsDesc: "",
  yearRange: "2020–2025",
};



const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>(DEFAULTS);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      getAboutContent(),
      getBrands(),
    ]).then(([aboutData, brandData]) => {
      if (aboutData) setContent(aboutData);
      setBrands(brandData);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <main className={`relative z-10 bg-white transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
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
              {content.heroTitle || 'hakkımda.'}
            </motion.h1>
          </div>
        </div>

        {/* ── Hero Görsel ── */}
        <motion.div {...fadeUp} className="site-px mt-8">
          <div
            className="w-full relative overflow-hidden rounded-xl bg-[#e8e2da]"
            style={{ aspectRatio: '21 / 9' }}
          >
            {content.heroImage ? (
              <Image
                src={content.heroImage}
                alt="Hakkımda"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center opacity-20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Müşterilerimiz ── */}
        <motion.div {...fadeUp} className="site-px mt-24 pb-20">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs text-black/40 font-medium tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>/Markalarım</span>
            <span className="text-xs text-black/30 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>(02)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Sol başlık */}
            <div className="md:pt-4">
            </div>

            {/* Marka kartları */}
            <div className="grid grid-cols-3 gap-3">
              {brands.map((brand, i) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-black/10 rounded-lg p-5 flex flex-col justify-between aspect-square"
                >
                  <span className="text-xs text-black/35 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{brand.name}</span>
                  <div className="flex items-center justify-center py-2">
                    {brand.logoUrl ? (
                      <Image src={brand.logoUrl} alt={brand.name} width={80} height={48} className="object-contain max-h-12" />
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-black/20" style={{ fontFamily: 'var(--font-inter)' }}>{brand.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-black/30 font-medium text-right" style={{ fontFamily: 'var(--font-inter)' }}>{brand.year}</span>
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
