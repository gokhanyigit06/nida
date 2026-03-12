"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);

const MediaBlock = ({ url, alt, className }: { url: string; alt: string; className?: string }) => {
    if (!url) return null;
    return isVideo(url)
        ? <video src={url} autoPlay loop muted playsInline className={className || "w-full h-full object-cover"} />
        : <img src={url} alt={alt} className={className || "w-full h-full object-cover"} />;
};

export default function WorkDetailPage() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [caseExpanded, setCaseExpanded] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const docSnap = await getDoc(doc(db, 'portfolio', id as string));
                if (docSnap.exists()) setProject({ id: docSnap.id, ...docSnap.data() });
            } catch (err) {
                console.error("Error fetching project:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-black/20" />
        </main>
    );
    if (!project) return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
            <p className="font-bold text-black/40 uppercase tracking-widest">Proje bulunamadı.</p>
        </main>
    );

    const heroUrl = project.heroImage || project.imageUrl || '';
    const conclusionUrl = project.conclusionImage || '';
    const extraMediaRows: any[] = project.extraMediaRows || [];
    const services: string[] = Array.isArray(project.services) ? project.services : project.category ? [project.category] : [];
    const descriptionParagraphs: string[] = Array.isArray(project.description)
        ? project.description
        : project.overview ? [project.overview] : [];
    const stats: any[] = project.stats || [];

    return (
        <main className="min-h-screen bg-[#f3f3f3] text-black font-sans overflow-x-hidden pb-32">
            <Header />

            {/* Hero Banner */}
            <section className="w-full pt-28 md:pt-36 px-4 md:px-8 lg:px-12 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-[1700px] aspect-[16/9] md:h-[70vh] md:aspect-auto lg:h-[85vh] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-200"
                >
                    {heroUrl && <MediaBlock url={heroUrl} alt={project.title} />}
                </motion.div>
            </section>

            {/* Başlık & Metadata */}
            <section className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14 mt-8 md:mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col mb-8 md:mb-10"
                >
                    <span className="text-[12px] md:text-[14px] tracking-widest uppercase text-black/40 mb-2" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                        PROJECT
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] uppercase text-black leading-[1] tracking-tight" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                        {project.title}
                    </h1>
                </motion.div>

                <div className="w-full h-[1px] bg-black mb-16 md:mb-20"></div>

                {/* Sol: Client/Services, Sağ: The Case */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    <div className="w-full lg:w-[45%] grid grid-cols-2 gap-y-12 gap-x-6 pr-0 lg:pr-10">
                        {project.client && (
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[14px] md:text-[16px] uppercase tracking-wide" style={{ fontFamily: 'var(--font-archivo-black)' }}>CLIENT</h3>
                                <p className="text-[13px] md:text-[14px] text-black/80 font-light">{project.client}</p>
                            </div>
                        )}
                        {services.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[14px] md:text-[16px] uppercase tracking-wide" style={{ fontFamily: 'var(--font-archivo-black)' }}>SERVICES</h3>
                                <div className="flex flex-col gap-2 text-[13px] md:text-[14px] text-black/80 font-light">
                                    {services.map((s, i) => <span key={i}>{s}</span>)}
                                </div>
                            </div>
                        )}
                        {project.year && (
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[14px] md:text-[16px] uppercase tracking-wide" style={{ fontFamily: 'var(--font-archivo-black)' }}>YEAR</h3>
                                <p className="text-[13px] md:text-[14px] text-black/80 font-light">{project.year}</p>
                            </div>
                        )}
                    </div>

                    {descriptionParagraphs.length > 0 && (
                        <div className="w-full lg:w-[55%] flex flex-col gap-6 md:gap-8 lg:pl-10">
                            <h2 className="text-[45px] md:text-[60px] lg:text-[70px] uppercase leading-[0.85] tracking-tight m-0 p-0" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                                THE CASE
                            </h2>
                            <div className="flex flex-col gap-6 text-[14px] md:text-[15px] leading-[1.8] text-black/80 font-light max-w-[850px]">
                                {(caseExpanded ? descriptionParagraphs : descriptionParagraphs.slice(0, 2)).map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            {descriptionParagraphs.length > 2 && (
                                <button
                                    onClick={() => setCaseExpanded(!caseExpanded)}
                                    className="mt-2 self-start text-[13px] md:text-[14px] uppercase tracking-widest text-black border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
                                    style={{ fontFamily: 'var(--font-archivo-black)' }}
                                >
                                    {caseExpanded ? "Show Less ↑" : "Read More ↓"}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Esnek Medya Akışı */}
            {extraMediaRows.length > 0 && (
                <div className="mt-4 md:mt-8 flex flex-col gap-4 md:gap-8">
                    {extraMediaRows.map((row: any, rowIdx: number) => (
                        <section key={row.id || rowIdx} className="w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className={`grid gap-4 md:gap-8 ${
                                row.layout === 'single' ? 'grid-cols-1' :
                                row.layout === 'double' ? 'grid-cols-1 md:grid-cols-2' :
                                'grid-cols-1 md:grid-cols-3'
                            }`}>
                                {row.items?.map((item: any, itemIdx: number) => (
                                    <motion.div
                                        key={itemIdx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                                        className={`relative w-full overflow-hidden rounded-[2rem] shadow-xl ${
                                            row.layout === 'triple-vertical' ? 'aspect-[9/16]' :
                                            row.layout === 'single' ? 'aspect-[16/9] md:aspect-[21/9]' :
                                            'aspect-square'
                                        }`}
                                    >
                                        <MediaBlock url={item.url} alt={`${project.title} media`} />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            {/* Eski format media array desteği */}
            {!extraMediaRows.length && project.media?.length > 0 && (
                <section className="w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {project.media.map((m: any, i: number) => (
                        <div key={i} className="relative w-full aspect-square overflow-hidden rounded-[2rem] shadow-xl">
                            <MediaBlock url={m.url} alt={`media-${i}`} />
                        </div>
                    ))}
                </section>
            )}

            {/* Stats */}
            {stats.length > 0 && (
                <section className="max-w-[1700px] mx-auto px-6 py-16 md:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {stats.map((stat: any, i: number) => (
                            <div key={i} className="space-y-4">
                                <h3 className="text-7xl md:text-[7.5rem] tracking-tighter leading-none" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                                    {stat.value}
                                </h3>
                                <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Kapanış Banner */}
            {conclusionUrl && (
                <section className="w-full mt-24 md:mt-32 px-4 md:px-8 lg:px-12 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-[1700px] aspect-[16/9] md:h-[70vh] md:aspect-auto lg:h-[85vh] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#0a0a0a]"
                    >
                        <MediaBlock url={conclusionUrl} alt="Conclusion" />
                    </motion.div>
                </section>
            )}

            {/* Geri Dön */}
            <div className="flex justify-center mt-24 md:mt-32">
                <Link href="/work">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black text-white px-10 md:px-12 py-5 md:py-6 rounded-full inline-flex items-center gap-4 cursor-pointer"
                    >
                        <span className="text-xl md:text-3xl uppercase tracking-tight" style={{ fontFamily: 'var(--font-archivo-black)' }}>Back to Work</span>
                        <span className="text-2xl md:text-3xl">→</span>
                    </motion.div>
                </Link>
            </div>
        </main>
    );
}
