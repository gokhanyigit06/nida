"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface Work {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl?: string;
  coverVideoUrl?: string;
  media?: { type: 'image' | 'video'; url: string }[];
}

const WorkCard = ({ work, index }: { work: Work; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // coverVideoUrl öncelikli, yoksa media array'inden video ara
  const videoUrl = work.coverVideoUrl ||
    work.media?.find((m) => m.type === 'video')?.url ||
    null;
  const coverImage = work.imageUrl ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovered) {
      video.pause();
    } else {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [hovered]);

  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease',
  };

  return (
    <Link href={`/work/${work.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
        viewport={{ once: true, margin: '-80px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: '840px',
          height: '470px',
          overflow: 'hidden',
          background: '#111',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >




        {coverImage && (
          <img
            src={coverImage}
            alt={work.title}
            style={{ ...mediaStyle, opacity: hovered ? 1 : 0 }}
          />
        )}

        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            style={{ ...mediaStyle, opacity: hovered ? 0 : 1 }}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : coverImage ? (
          <img
            src={coverImage}
            alt={work.title}
            style={{ ...mediaStyle, opacity: hovered ? 0 : 1 }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#1c1c1c' }} />
        )}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.85) 100%)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          zIndex: 10,
        }}>
          <h3 style={{
            color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1,
            maxWidth: '80%', fontFamily: 'var(--font-archivo-black), sans-serif',
          }}>
            {work.title}
          </h3>
          <span style={{
            color: hovered ? '#fff' : 'rgba(255,255,255,0.5)',
            fontSize: '1.5rem',
            transition: 'transform 0.3s, color 0.3s',
            transform: hovered ? 'translate(4px, -4px)' : 'none',
            display: 'block',
          }}>
            ↗
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const WorkPage = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Work[];
      setWorks(items);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[45vh] md:h-[55vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center pt-32 md:pt-24">
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-[25%] md:top-[35%] right-[10%] md:right-[15%] z-20 scale-75 md:scale-100"
        >
          <div className="relative w-32 h-14 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#E2F738]" style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)' }} />
            <div className="absolute inset-0 flex justify-center items-center scale-150">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div key={deg} className="absolute w-8 h-8 bg-[#E2F738] rounded-full" style={{ transform: `rotate(${deg}deg) translate(10px)` }} />
              ))}
              <div className="absolute w-12 h-10 bg-[#E2F738] rounded-full" />
            </div>
            <span className="relative z-10 text-black font-black text-sm tracking-wider uppercase" style={{ fontFamily: 'var(--font-archivo-black)' }}>WORKS</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-[28vw] md:text-[16vw] text-white font-normal uppercase leading-none select-none tracking-tight"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          WORKS
        </motion.h1>

        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-12 right-[20%] md:right-[25%] text-white scale-75 md:scale-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-1">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-[50px] md:h-[70px] text-white fill-current">
            <path d="M0,0 C150,0 150,100 300,100 C450,100 450,0 600,0 C750,0 750,100 900,100 C1050,100 1050,0 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Works Grid */}
      <section style={{ background: '#ffffff', padding: 0, paddingBottom: '130px', overflowX: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '840px 840px',
          justifyContent: 'center',
          gap: '5px',
          paddingTop: '5px',
        }}>
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WorkPage;
