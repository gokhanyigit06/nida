"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const WorkPage = () => {
    const [works, setWorks] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "portfolio"), (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorks(items);
        });
        return () => unsubscribe();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[45vh] md:h-[55vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center pt-32 md:pt-24">
                {/* Halftone / Dotted Background */}
                <div className="absolute inset-0 pointer-events-none z-0" 
                    style={{ 
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 0)', 
                        backgroundSize: '24px 24px' 
                    }} 
                />
                
                {/* Yellow "WORKS" Badge */}
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
                    WORK
                </motion.h1>

                {/* Sparkling Star */}
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-12 right-[20%] md:right-[25%] text-white scale-75 md:scale-100"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </motion.div>

                {/* Waves Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-1">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-[50px] md:h-[70px] text-white fill-current">
                        <path d="M0,0 C150,0 150,100 300,100 C450,100 450,0 600,0 C750,0 750,100 900,100 C1050,100 1050,0 1200,0 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </section>

            {/* Works Listing Grid */}
            <section className="max-w-[1700px] mx-auto px-6 py-16 md:px-16 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24">
                    {works.map((work, index) => (
                        <Link 
                            key={work.id}
                            href={`/work/${work.id}`}
                            className="group cursor-pointer"
                        >
                            <motion.div 
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: (index % 2) * 0.15 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <div 
                                    className="relative rounded-[40px] md:rounded-[50px] overflow-hidden p-6 md:p-12 mb-6 md:mb-10"
                                    style={{ backgroundColor: work.bgColor || (index % 2 === 0 ? '#F9D7E8' : '#E8E8E8') }}
                                >
                                    <div className="relative aspect-[4/3] rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                        <img 
                                            src={work.imageUrl} 
                                            alt={work.title} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-4 gap-4">
                                    <div>
                                        <h3 className="text-3xl md:text-5xl font-semibold uppercase mb-2 leading-tight" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                                            {work.title}
                                        </h3>
                                        <p className="text-gray-500 text-lg md:text-xl font-medium uppercase tracking-wider">
                                            {work.category}
                                        </p>
                                    </div>
                                    <div className="text-gray-300 text-xl font-bold md:mb-1">
                                        / {work.year || '2024'}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default WorkPage;
