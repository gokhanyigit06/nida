"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminProjectsList() {
    const router = useRouter();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "portfolio"));
            const fetched: any[] = [];
            querySnapshot.forEach((d) => fetched.push({ id: d.id, ...d.data() }));
            setProjects(fetched);
        } catch (error) {
            console.error("Projeler yüklenirken hata:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm(`Bu projeyi silmek istediğinize emin misiniz?`)) return;
        try {
            setDeletingId(id);
            await deleteDoc(doc(db, "portfolio", id));
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Silme hatası:", error);
            alert("Silme işlemi sırasında bir hata oluştu.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans overflow-x-hidden relative">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white rounded-full blur-[200px] opacity-[0.03] pointer-events-none"></div>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10 w-full max-w-[1400px] mx-auto border-b border-white/10 pb-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push("/admin")}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-white/50 font-bold tracking-[0.2em] text-xs uppercase mb-2">Yönetim Paneli</span>
                        <h1 className="text-3xl md:text-5xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                            TÜM <span className="text-white/40">PROJELER</span>
                        </h1>
                    </div>
                </div>

                <button
                    onClick={() => router.push("/admin/projects/new")}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 active:scale-95 transition-all text-sm font-bold uppercase tracking-widest shadow-xl"
                >
                    <Plus className="w-4 h-4" />
                    YENİ PROJE YAYINLA
                </button>
            </header>

            <main className="w-full max-w-[1400px] mx-auto relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-white/30">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <span className="font-bold tracking-widest uppercase text-sm">PROJELER YÜKLENİYOR...</span>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#0a0a0a] rounded-[2rem] border border-white/10">
                        <h2 className="text-2xl uppercase mb-2" style={{ fontFamily: 'var(--font-bebas-neue)' }}>SİTEDE HİÇ PROJE YOK</h2>
                        <p className="text-white/40 font-medium tracking-widest uppercase text-xs">Hemen üstteki butondan yeni bir tane oluştur.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={project.id}
                                className="bg-[#0a0a0a] border border-white/10 hover:border-white/30 rounded-3xl overflow-hidden flex flex-col transition-colors"
                            >
                                <div className="relative w-full aspect-[4/3] bg-black">
                                    {(project.imagePlaceholder || project.imageUrl) ? (
                                        <Image
                                            src={project.imagePlaceholder || project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-80"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold tracking-widest uppercase">Görsel Yok</div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="uppercase text-3xl tracking-wide truncate" style={{ fontFamily: 'var(--font-bebas-neue)' }}>{project.title}</h3>
                                        <p className="text-white/40 text-xs font-bold tracking-widest uppercase truncate">{project.category} / {project.year}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => router.push(`/admin/projects/${project.id}`)}
                                            className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold tracking-widest uppercase text-[10px]"
                                        >
                                            <Edit className="w-3 h-3" /> Düzenle
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            disabled={deletingId === project.id}
                                            className="w-12 bg-red-500/10 border border-red-500/20 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-colors disabled:opacity-50"
                                        >
                                            {deletingId === project.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
