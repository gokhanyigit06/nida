"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { subscribeWorks, type Work } from '@/lib/db';

const BG_COLORS = ['#e9e5e0','#1a1208','#d4cfc9','#2b2d42','#3d5a80','#3a5a40','#c9b99a','#1c1c1e'];

// Fallback — Firestore boş iken gösterilen veri
const FALLBACK: Work[] = [
  { id: '1', title: 'Lune',  category: 'App · Visual Direction',  year: '2025', videoUrl: '', thumbUrl: '', visible: true, order: 1 },
  { id: '2', title: 'Aren',  category: 'Fashion Brand Launch',     year: '2025', videoUrl: '', thumbUrl: '', visible: true, order: 2 },
  { id: '3', title: 'Nero',  category: 'Brand Identity',           year: '2024', videoUrl: '', thumbUrl: '', visible: true, order: 3 },
  { id: '4', title: 'Vela',  category: 'Web Tasarımı',             year: '2024', videoUrl: '', thumbUrl: '', visible: true, order: 4 },
  { id: '5', title: 'Mavi',  category: 'Dijital Pazarlama',        year: '2024', videoUrl: '', thumbUrl: '', visible: true, order: 5 },
  { id: '6', title: 'Koru',  category: 'E-Ticaret',                year: '2023', videoUrl: '', thumbUrl: '', visible: true, order: 6 },
  { id: '7', title: 'Ata',   category: 'Marka Stratejisi',         year: '2023', videoUrl: '', thumbUrl: '', visible: true, order: 7 },
  { id: '8', title: 'Sol',   category: 'Sosyal Medya',             year: '2023', videoUrl: '', thumbUrl: '', visible: true, order: 8 },
];

// ── Tek kart ──────────────────────────────────────────────────
const WorkCard = ({ work, bg }: { work: Work; bg: string }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current && work.videoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="cursor-pointer border border-black/10 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Görsel / Video — 9:16 */}
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '9 / 16', backgroundColor: bg }}>
        {work.videoUrl && (
          <video ref={videoRef} src={work.videoUrl} muted loop playsInline preload="metadata"
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <motion.div animate={{ opacity: hovered ? 0.06 : 0 }} transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black pointer-events-none z-10" />
      </div>

      {/* Info bar */}
      <motion.div animate={{ backgroundColor: hovered ? '#000000' : '#ffffff' }} transition={{ duration: 0.25 }}
        className="px-4 py-3 border-t border-black/10">
        <div className="flex items-baseline justify-between gap-4">
          <motion.span animate={{ color: hovered ? '#ffffff' : '#000000' }} transition={{ duration: 0.25 }}
            className="text-sm font-semibold tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            {work.title}
          </motion.span>
          <motion.span animate={{ color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)' }} transition={{ duration: 0.25 }}
            className="text-xs font-medium tabular-nums shrink-0" style={{ fontFamily: 'var(--font-inter)' }}>
            {work.year}
          </motion.span>
        </div>
        <motion.span animate={{ color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} transition={{ duration: 0.25 }}
          className="text-xs font-normal mt-0.5 block" style={{ fontFamily: 'var(--font-inter)' }}>
          {work.category}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// ── Bölüm ────────────────────────────────────────────────────
const PortfolioSection = () => {
  const [displayWorks, setDisplayWorks] = useState<Work[]>(FALLBACK);

  useEffect(() => {
    const unsub = subscribeWorks((data) => {
      const visible = data.filter((w) => w.visible).slice(0, 8);
      if (visible.length > 0) setDisplayWorks(visible);
    });
    return unsub;
  }, []);

  return (
    <section className="bg-white site-px pt-16 pb-20">

      {/* ── Üst etiket ── */}
      <div className="flex justify-between items-center mb-10">
        <span className="text-xs text-black/40 font-medium tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          /Çalışmalar
        </span>
        <span className="text-xs text-black/30 font-medium tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>02</span>
      </div>

      {/* ── Başlık + buton ── */}
      <div className="flex items-end justify-between gap-8 mb-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            Seçili Çalışmalar.
          </h2>
          <p className="text-sm text-black/45 font-normal mt-3 max-w-[260px] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            Markaların özünü yansıtan, sade ve etkili tasarım projelerimiz.
          </p>
        </div>
        <Link href="/work" className="hidden md:inline-flex items-center gap-2 border border-black/20 rounded-full px-5 py-2.5 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-200 shrink-0" style={{ fontFamily: 'var(--font-inter)' }}>
          tümünü gör →
        </Link>
      </div>

      {/* ── 4 Kolonlu Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        {displayWorks.map((work, i) => (
          <WorkCard key={work.id} work={work} bg={BG_COLORS[i % BG_COLORS.length]} />
        ))}
      </div>

      {/* Mobil buton */}
      <div className="mt-8 flex md:hidden">
        <Link href="/work" className="border border-black/20 rounded-full px-5 py-2.5 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-200" style={{ fontFamily: 'var(--font-inter)' }}>
          tümünü gör →
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSection;
