"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import StickyFooterReveal from '@/components/StickyFooterReveal';
import { servicesCollection, type Service } from '@/lib/db';
import { query, orderBy, onSnapshot } from 'firebase/firestore';

const FALLBACK: Service[] = [
  {
    id: '1',
    title: 'Video Prodüksiyon & Kurgu',
    description: 'Konseptten final kareye kadar tüm prodüksiyon sürecini yönetiyoruz. Çekim, kurgu, renk düzeltme ve ses tasarımıyla etki bırakan içerikler üretiyoruz.',
    tags: 'Kurgu & Post-Prodüksiyon, Renk Düzeltme, Müzik & Ses, Reklam Filmi',
    order: 1,
  },
  {
    id: '2',
    title: 'Sosyal Medya İçerik Üretimi',
    description: 'Platforma özel, akılda kalıcı ve etkileşimi yüksek video içerikler üretiyoruz. Reels, story, tanıtım videosu — markanızın sesini dijitale taşıyoruz.',
    tags: 'Reels & Short-Form, Story & Highlight, Ürün Videosu, Marka Tanıtımı',
    order: 2,
  },
];

const ServiceRow = ({ service, index }: { service: Service; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const tagList = service.tags ? service.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-t border-black/10 py-10 grid grid-cols-[56px_1fr_1fr] gap-8 items-start cursor-default"
    >
      {/* Numara */}
      <span className="text-xs text-black/30 font-medium pt-1" style={{ fontFamily: 'var(--font-inter)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Başlık + açıklama */}
      <div>
        <motion.h2
          animate={{ x: hovered ? 6 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl md:text-3xl font-semibold text-black tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {service.title}
        </motion.h2>
        <p className="text-sm text-black/50 leading-relaxed max-w-[380px]" style={{ fontFamily: 'var(--font-inter)' }}>
          {service.description}
        </p>
      </div>

      {/* Etiketler */}
      <div className="flex flex-wrap gap-2 pt-1 justify-end">
        {tagList.map((tag) => (
          <motion.span
            key={tag}
            animate={{
              backgroundColor: hovered ? '#000000' : 'transparent',
              color: hovered ? '#ffffff' : 'rgba(0,0,0,0.6)',
              borderColor: hovered ? '#000000' : 'rgba(0,0,0,0.2)',
            }}
            transition={{ duration: 0.2 }}
            className="text-xs px-3 py-1.5 rounded-full border font-medium"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function HizmetlerPage() {
  const [services, setServices] = useState<Service[]>(FALLBACK);

  useEffect(() => {
    const q = query(servicesCollection, orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
      if (data.length > 0) setServices(data);
    });
    return unsub;
  }, []);

  return (
    <>
      <main className="relative z-10 bg-white">
        <Header />

        {/* ── Hero başlık ── */}
        <div className="site-px pt-12 pb-2">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10vw] font-light leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            hizmetler.
          </motion.h1>
        </div>

        {/* ── Hizmet listesi ── */}
        <div className="site-px mt-8">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
          <div className="border-t border-black/10" />
        </div>

        {/* ── CTA Bölümü ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="site-px pb-24 mt-12"
        >
          <div className="bg-black rounded-2xl px-12 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight max-w-[460px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Fikrinizi Gerçeğe Dönüştürelim.
            </h2>
            <div className="flex flex-col items-start gap-6 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Projeyi Anlat →
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <StickyFooterReveal />
    </>
  );
}
