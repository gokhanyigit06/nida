"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import StickyFooterReveal from '@/components/StickyFooterReveal';
import { subscribeWorks, type Work } from '@/lib/db';

const FILTERS = [
  'Tüm Projeler',
  'Video Kurgu',
  'Motion Design',
];

// Fallback — Firestore boşken gösterilir
const FALLBACK_WORKS: Work[] = [
  { id: '1', title: 'Lune',  category: 'Video Kurgu',   year: '2025', videoUrl: '', thumbUrl: '', visible: true, order: 1 },
  { id: '2', title: 'Aren',  category: 'Motion Design', year: '2025', videoUrl: '', thumbUrl: '', visible: true, order: 2 },
  { id: '3', title: 'Nero',  category: 'Video Kurgu',   year: '2024', videoUrl: '', thumbUrl: '', visible: true, order: 3 },
  { id: '4', title: 'Vela',  category: 'Motion Design', year: '2024', videoUrl: '', thumbUrl: '', visible: true, order: 4 },
  { id: '5', title: 'Mavi',  category: 'Video Kurgu',   year: '2024', videoUrl: '', thumbUrl: '', visible: true, order: 5 },
  { id: '6', title: 'Koru',  category: 'Motion Design', year: '2023', videoUrl: '', thumbUrl: '', visible: true, order: 6 },
  { id: '7', title: 'Ata',   category: 'Video Kurgu',   year: '2023', videoUrl: '', thumbUrl: '', visible: true, order: 7 },
  { id: '8', title: 'Sol',   category: 'Motion Design', year: '2023', videoUrl: '', thumbUrl: '', visible: true, order: 8 },
];

const BG_COLORS = ['#e9e5e0','#1a1208','#d4cfc9','#2b2d42','#3d5a80','#3a5a40','#c9b99a','#1c1c1e'];

const WorkCard = ({ work, index }: { work: Work; index: number }) => {
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

  const bg = BG_COLORS[index % BG_COLORS.length];

  return (
    <motion.div
      className="cursor-pointer border border-black/10 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
    >
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '9 / 16', backgroundColor: bg }}>
        {work.videoUrl && (
          <video ref={videoRef} src={work.videoUrl} muted loop playsInline preload="metadata"
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <motion.div animate={{ opacity: hovered ? 0.06 : 0 }} transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black pointer-events-none z-10" />
      </div>

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

export default function WorkPage() {
  const [works, setWorks] = useState<Work[]>(FALLBACK_WORKS);
  const [activeFilter, setActiveFilter] = useState('Tüm Projeler');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = subscribeWorks((data) => {
      if (data.length > 0) setWorks(data.filter(w => w.visible));
      setLoaded(true);
    });
    return unsub;
  }, []);

  const filtered = activeFilter === 'Tüm Projeler'
    ? works
    : works.filter(w => w.category === activeFilter);

  return (
    <>
      <main className="relative z-10 bg-white">
        <Header />
        <div className="site-px pt-12 pb-10">
          <div className="flex items-end justify-between gap-8">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10vw] font-light leading-[0.9] tracking-tight text-black" style={{ fontFamily: 'var(--font-inter)' }}>
              Projects.
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 border-t border-black/10 pt-6">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`text-sm font-medium transition-all duration-200 ${activeFilter === f ? 'text-black' : 'text-black/35 hover:text-black/70'}`}
                style={{ fontFamily: 'var(--font-inter)' }}>
                {activeFilter !== f && '/ '}{f}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="site-px pb-20">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5" layout>
            {filtered.map((work, i) => (
              <WorkCard key={work.id} work={work} index={i} />
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-32 text-black/30 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
              Bu kategoride henüz proje yok.
            </div>
          )}
        </div>
      </main>
      <StickyFooterReveal />
    </>
  );
}
