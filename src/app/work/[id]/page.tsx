"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'portfolio', id as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (err) {
                console.error("Error fetching project:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;

    const stats = project.stats || [
        { value: '+310%', label: 'increase in organic website traffic in 8 months.' },
        { value: '+45%', label: 'Reduced bounce rate by 45% with optimized UX and structure.' },
        { value: '+140%', label: 'growth in lead conversions from SEO-driven content.' }
    ];

    const media = project.media || [
        { type: 'image', url: project.imageUrl }
    ];

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[65vh] w-full bg-[#1D6BFF] overflow-hidden flex flex-col items-center justify-center pt-24">
                <div className="absolute inset-0 pointer-events-none z-0" 
                    style={{ 
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 0)', 
                        backgroundSize: '24px 24px' 
                    }} 
                />
                
                <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 text-[18vw] md:text-[14vw] text-white font-normal uppercase leading-none select-none tracking-tighter text-center px-4"
                    style={{ fontFamily: 'var(--font-bebas-neue)' }}
                >
                    {project.title}
                </motion.h1>

                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-16 right-[10%] text-white opacity-40"
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-1">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-[80px] text-white fill-current">
                        <path d="M0,0 C150,0 150,100 300,100 C450,100 450,0 600,0 C750,0 750,100 900,100 C1050,100 1050,0 1200,0 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </section>

            {/* Metadata Section */}
            <div className="max-w-[1400px] mx-auto px-8 py-12 md:py-20">
                <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
                    <div className="bg-[#FAE0F0] px-10 py-5 rounded-full flex gap-12 items-center">
                        <span className="text-xl md:text-2xl font-semibold uppercase tracking-tight" style={{ fontFamily: 'var(--font-archivo-black)' }}>Year</span>
                        <span className="text-xl md:text-2xl font-semibold">{project.year}</span>
                    </div>
                    <div className="bg-[#FAE0F0] px-10 py-5 rounded-full flex gap-12 items-center">
                        <span className="text-xl md:text-2xl font-semibold uppercase tracking-tight" style={{ fontFamily: 'var(--font-archivo-black)' }}>Client</span>
                        <span className="text-xl md:text-2xl font-semibold">{project.client || project.title}</span>
                    </div>
                    <div className="bg-[#FAE0F0] px-10 py-5 rounded-full flex gap-12 items-center">
                        <span className="text-xl md:text-2xl font-semibold uppercase tracking-tight" style={{ fontFamily: 'var(--font-archivo-black)' }}>Services</span>
                        <span className="text-xl md:text-2xl font-semibold uppercase">{project.category}</span>
                    </div>
                </div>
            </div>

            {/* Project Overview */}
            <section className="max-w-[1400px] mx-auto px-8 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <h2 className="text-[10vw] md:text-[6.5rem] font-semibold leading-[0.8] text-black uppercase tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                    PROJECT<br />OVERVIEW
                </h2>
                <div className="space-y-10">
                    <p className="text-xl md:text-2xl text-[#2D2D2D]/80 font-medium leading-[1.6]">
                        {project.overview || `${project.title} partnered with us to elevate their online visibility and connect authentically with beauty-conscious millennials. Their goal was to boost brand awareness, engagement, and sales through a refined digital marketing approach.`}
                    </p>
                    <p className="text-xl md:text-2xl text-[#2D2D2D]/80 font-medium leading-[1.6]">
                        We crafted a performance-focused content framework, revitalized their social media aesthetics, and executed targeted campaigns across Instagram, TikTok, and Meta — driving remarkable growth in reach, engagement, and conversions.
                    </p>
                </div>
            </section>

            {/* Large Hero Media */}
            <section className="max-w-[1700px] mx-auto px-8 mb-32">
                <div className="w-full rounded-[60px] overflow-hidden shadow-2xl bg-gray-100">
                    {media[0]?.type === 'video' ? (
                        <video src={media[0].url} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
                    ) : (
                        <img src={media[0]?.url || project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-24 md:py-40">
                <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
                    {stats.map((stat: any, i: number) => (
                        <div key={i} className="space-y-6">
                            <h3 className="text-8xl md:text-[7.5rem] font-semibold tracking-tighter leading-none" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                                {stat.value}
                            </h3>
                            <p className="text-xl md:text-2xl text-[#2D2D2D]/70 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Challenge & Approach */}
            <section className="max-w-[1400px] mx-auto px-8 py-24 md:py-40 space-y-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <h2 className="text-[10vw] md:text-[6.5rem] font-semibold leading-[0.8] text-black uppercase tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                        THE<br />CHALLENGE
                    </h2>
                    <p className="text-xl md:text-2xl text-[#2D2D2D]/80 font-medium leading-[1.6]">
                        {project.challenge || "The company experienced falling engagement and found it challenging to connect with younger demographics. Past campaigns lacked cohesion and failed to convey the authenticity modern consumers demand. They required a consistent social presence."}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <h2 className="text-[10vw] md:text-[6.5rem] font-semibold leading-[0.8] text-black uppercase tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                        OUR<br />APPROACH
                    </h2>
                    <p className="text-xl md:text-2xl text-[#2D2D2D]/80 font-medium leading-[1.6]">
                        {project.approach || "We started by reviewing audience behavior, competitor campaigns, and market patterns to identify key engagement drivers in the beauty industry. From there, we built a strategy centered on creative storytelling, influencer collaborations, and performance-driven ads."}
                    </p>
                </div>
            </section>

            {/* Additional Media Grid */}
            <section className="max-w-[1700px] mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
                {media.slice(1).map((m: any, i: number) => (
                    <div key={i} className="rounded-[50px] overflow-hidden shadow-xl bg-gray-50 aspect-[4/3]">
                         {m.type === 'video' ? (
                            <video src={m.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                            <img src={m.url} alt={`detail-${i}`} className="w-full h-full object-cover" />
                        )}
                    </div>
                ))}
            </section>

            {/* Back to Work */}
            <div className="flex justify-center py-24 md:py-40">
                <Link href="/work">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#FAE0F0] px-12 py-6 rounded-full inline-flex items-center gap-4 cursor-pointer"
                    >
                        <span className="text-2xl md:text-3xl font-semibold uppercase tracking-tight" style={{ fontFamily: 'var(--font-archivo-black)' }}>Back to Work</span>
                        <span className="text-3xl">→</span>
                    </motion.div>
                </Link>
            </div>

            <Footer />
        </main>
    );
};

export default ProjectDetailPage;
