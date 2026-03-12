"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Upload, AlertCircle, CheckCircle2, Plus, Trash2, LayoutGrid, ChevronUp, ChevronDown } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Image from "next/image";

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "error" | "success" | "idle", msg: string }>({ type: "idle", msg: "" });

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [year, setYear] = useState("2024");
    const [client, setClient] = useState("");
    const [services, setServices] = useState("");
    const [description, setDescription] = useState("");
    const [bgColor, setBgColor] = useState("#fbc9f2");
    const [textColor, setTextColor] = useState("black");

    const [imagePlaceholder, setImagePlaceholder] = useState<File | null>(null);
    const [heroImage, setHeroImage] = useState<File | null>(null);
    const [conclusionImage, setConclusionImage] = useState<File | null>(null);

    const [previews, setPreviews] = useState({ thumb: "", hero: "", conclusion: "" });
    const [mediaTypes, setMediaTypes] = useState({ thumb: "image", hero: "image", conclusion: "image" });

    const [extraRows, setExtraRows] = useState<any[]>([]);

    const addExtraRow = (layout: "single" | "double" | "triple" | "triple-vertical") => {
        const itemCount = layout === "single" ? 1 : layout === "double" ? 2 : 3;
        setExtraRows([...extraRows, {
            id: Math.random().toString(36).substr(2, 9),
            layout,
            files: Array(itemCount).fill(null),
            previews: Array(itemCount).fill(""),
            mediaTypes: Array(itemCount).fill("image")
        }]);
    };

    const removeExtraRow = (id: string) => setExtraRows(extraRows.filter(r => r.id !== id));

    const moveRowUp = (index: number) => {
        if (index === 0) return;
        const rows = [...extraRows];
        [rows[index - 1], rows[index]] = [rows[index], rows[index - 1]];
        setExtraRows(rows);
    };

    const moveRowDown = (index: number) => {
        if (index === extraRows.length - 1) return;
        const rows = [...extraRows];
        [rows[index + 1], rows[index]] = [rows[index], rows[index + 1]];
        setExtraRows(rows);
    };

    const handleExtraMediaChange = (e: React.ChangeEvent<HTMLInputElement>, rowId: string, index: number) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        const mediaType = file.type.startsWith("video/") ? "video" : "image";
        setExtraRows(extraRows.map(row => {
            if (row.id !== rowId) return row;
            const newFiles = [...row.files];
            const newPreviews = [...row.previews];
            const newMediaTypes = [...row.mediaTypes];
            newFiles[index] = file;
            newPreviews[index] = previewUrl;
            newMediaTypes[index] = mediaType;
            return { ...row, files: newFiles, previews: newPreviews, mediaTypes: newMediaTypes };
        }));
    };

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>, type: "thumb" | "hero" | "conclusion") => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        const mediaType = file.type.startsWith("video/") ? "video" : "image";
        if (type === "thumb") { setImagePlaceholder(file); setPreviews(p => ({ ...p, thumb: previewUrl })); setMediaTypes(t => ({ ...t, thumb: mediaType })); }
        else if (type === "hero") { setHeroImage(file); setPreviews(p => ({ ...p, hero: previewUrl })); setMediaTypes(t => ({ ...t, hero: mediaType })); }
        else if (type === "conclusion") { setConclusionImage(file); setPreviews(p => ({ ...p, conclusion: previewUrl })); setMediaTypes(t => ({ ...t, conclusion: mediaType })); }
    };

    const uploadFile = async (file: File, folder: string) => {
        const fileRef = ref(storage, `portfolio/${folder}/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "idle", msg: "" });
        try {
            if (!title || !category || !imagePlaceholder || !heroImage || !conclusionImage) {
                throw new Error("Lütfen tüm görselleri ve zorunlu alanları doldurun!");
            }
            const folderName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const thumbUrl = await uploadFile(imagePlaceholder, folderName);
            const heroUrl = await uploadFile(heroImage, folderName);
            const conclusionUrl = await uploadFile(conclusionImage, folderName);

            const servicesArray = services.split(",").map(s => s.trim()).filter(Boolean);
            const descriptionArray = description.split("\n").map(d => d.trim()).filter(Boolean);

            const projectData = {
                title,
                category,
                year,
                client,
                services: servicesArray,
                description: descriptionArray,
                bgColor,
                textColor,
                imagePlaceholder: thumbUrl,
                imageUrl: thumbUrl,
                heroImage: heroUrl,
                conclusionImage: conclusionUrl,
                mediaTypes,
                extraMediaRows: await Promise.all(extraRows.map(async (row) => {
                    const items = await Promise.all(row.files.map(async (file: File | null, idx: number) => {
                        if (file) {
                            const url = await uploadFile(file, `${folderName}/extra`);
                            return { url, type: row.mediaTypes[idx] };
                        }
                        return null;
                    }));
                    return { id: row.id, layout: row.layout, items: items.filter(Boolean) };
                })),
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, "portfolio"), projectData);
            setStatus({ type: "success", msg: "Proje başarıyla eklendi! ✨" });
            setTimeout(() => router.push("/admin/projects"), 2000);
        } catch (error: any) {
            setStatus({ type: "error", msg: error.message || "Bir hata oluştu!" });
        } finally {
            setLoading(false);
        }
    };

    const MediaSlot = ({ label, type, preview, mediaType }: { label: string; type: "thumb" | "hero" | "conclusion"; preview: string; mediaType: string }) => (
        <div className="flex flex-col gap-4">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black text-center">{label}</label>
            <label className="relative w-full aspect-[4/3] bg-black border border-white/5 rounded-3xl hover:border-white/40 transition-all cursor-pointer overflow-hidden group">
                <input type="file" accept="image/*,video/*" onChange={(e) => handleMediaChange(e, type)} className="hidden" />
                {preview ? (
                    mediaType === "video"
                        ? <video src={preview} autoPlay muted loop className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                        : <Image src={preview} alt={label} fill className="object-cover group-hover:opacity-50 transition-opacity" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 group-hover:text-white/40">
                        <Upload className="w-10 h-10 mb-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Görsel / Video Seç</span>
                    </div>
                )}
            </label>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans overflow-x-hidden">
            <header className="flex items-center gap-6 mb-12 w-full max-w-[1000px] mx-auto">
                <button onClick={() => router.back()} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl md:text-5xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                    YENİ <span className="text-white/40">PROJE</span>
                </h1>
            </header>

            <main className="w-full max-w-[1000px] mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                    {/* Temel Bilgiler */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col gap-8">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-6">1. Temel Bilgiler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Proje Başlığı *</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="Örn: KÖFTE PİYAZ" className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors uppercase text-xl" style={{ fontFamily: 'var(--font-bebas-neue)' }} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Kategori *</label>
                                <input value={category} onChange={e => setCategory(e.target.value)} required placeholder="Örn: VIDEO EDITING" className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors uppercase" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Yıl</label>
                                <input value={year} onChange={e => setYear(e.target.value)} placeholder="2024" className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Kutu Arkaplan Rengi (#hex)</label>
                                <input value={bgColor} onChange={e => setBgColor(e.target.value)} placeholder="#fbc9f2" className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Metin Rengi</label>
                                <select value={textColor} onChange={e => setTextColor(e.target.value)} className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer">
                                    <option value="black">Siyah</option>
                                    <option value="white">Beyaz</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Detay Bilgileri */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col gap-8">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-6">2. Müşteri & İçerik</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Müşteri / Marka</label>
                                <input value={client} onChange={e => setClient(e.target.value)} placeholder="Örn: ACME CO." className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Hizmetler (Virgülle ayırın)</label>
                                <input value={services} onChange={e => setServices(e.target.value)} placeholder="Örn: VIDEO EDITING, COLOR GRADING" className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors" />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Proje Açıklaması (Her satır ayrı paragraf)</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Projenin hikayesini buraya yazın..." className="bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 transition-colors resize-y leading-relaxed" />
                            </div>
                        </div>
                    </div>

                    {/* Esnek Medya */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col gap-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-6">
                            <h2 className="text-xl font-bold uppercase tracking-widest text-white/50">3. Esnek Medya Akışı</h2>
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={() => addExtraRow("single")} className="bg-white/5 hover:bg-white/10 text-white/70 text-[10px] font-black py-2.5 px-4 rounded-xl border border-white/10 transition-all uppercase">+ TEKLİ</button>
                                <button type="button" onClick={() => addExtraRow("double")} className="bg-white/5 hover:bg-white/10 text-white/70 text-[10px] font-black py-2.5 px-4 rounded-xl border border-white/10 transition-all uppercase">+ İKİLİ</button>
                                <button type="button" onClick={() => addExtraRow("triple")} className="bg-white/5 hover:bg-white/10 text-white/70 text-[10px] font-black py-2.5 px-4 rounded-xl border border-white/10 transition-all uppercase">+ ÜÇLÜ</button>
                                <button type="button" onClick={() => addExtraRow("triple-vertical")} className="bg-white/5 hover:bg-white/10 text-white/70 text-[10px] font-black py-2.5 px-4 rounded-xl border border-white/10 transition-all uppercase">+ DİKEY</button>
                            </div>
                        </div>
                        {extraRows.length === 0 ? (
                            <div className="py-16 flex flex-col items-center justify-center text-white/10 border-2 border-dashed border-white/5 rounded-[2rem]">
                                <LayoutGrid className="w-16 h-16 mb-4 opacity-10" />
                                <p className="text-sm font-bold uppercase tracking-[0.2em]">Akış henüz boş</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-12">
                                {extraRows.map((row, rowIdx) => (
                                    <div key={row.id} className="relative p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 group/row hover:border-white/10 transition-colors">
                                        <div className="absolute -top-4 right-8 flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                            <button type="button" onClick={() => moveRowUp(rowIdx)} disabled={rowIdx === 0} className="w-9 h-9 bg-white/20 hover:bg-white text-white hover:text-black rounded-xl border border-white/20 flex items-center justify-center transition-all disabled:opacity-30"><ChevronUp className="w-5 h-5" /></button>
                                            <button type="button" onClick={() => moveRowDown(rowIdx)} disabled={rowIdx === extraRows.length - 1} className="w-9 h-9 bg-white/20 hover:bg-white text-white hover:text-black rounded-xl border border-white/20 flex items-center justify-center transition-all disabled:opacity-30"><ChevronDown className="w-5 h-5" /></button>
                                            <button type="button" onClick={() => removeExtraRow(row.id)} className="w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center"><Trash2 className="w-5 h-5" /></button>
                                        </div>
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">ADIM {rowIdx + 1}</div>
                                            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">{row.layout} BLOCK</div>
                                        </div>
                                        <div className={`grid gap-5 ${row.layout === "single" ? "grid-cols-1" : row.layout === "double" ? "grid-cols-2" : "grid-cols-3"}`}>
                                            {row.files.map((_: any, idx: number) => (
                                                <label key={idx} className={`relative w-full overflow-hidden bg-black border border-dashed border-white/10 rounded-2xl hover:border-white/40 cursor-pointer flex flex-col items-center justify-center group/item ${row.layout === "triple-vertical" ? "aspect-[9/16]" : row.layout === "single" ? "aspect-[21/9]" : "aspect-square"}`}>
                                                    <input type="file" accept="image/*,video/*" onChange={(e) => handleExtraMediaChange(e, row.id, idx)} className="hidden" />
                                                    {row.previews[idx] ? (
                                                        row.mediaTypes[idx] === "video"
                                                            ? <video src={row.previews[idx]} autoPlay muted loop className="w-full h-full object-cover group-hover/item:opacity-40 transition-opacity" />
                                                            : <Image src={row.previews[idx]} alt="preview" fill className="object-cover group-hover/item:opacity-40 transition-opacity" />
                                                    ) : (
                                                        <div className="flex flex-col items-center text-white/10 group-hover/item:text-white/40 transition-colors">
                                                            <Plus className="w-8 h-8 mb-2" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Yükle</span>
                                                        </div>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Ana Medya */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col gap-8">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-6">4. Ana Medya Alanları *</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <MediaSlot label="Kart Thumbnail" type="thumb" preview={previews.thumb} mediaType={mediaTypes.thumb} />
                            <MediaSlot label="Üst Hero Banner" type="hero" preview={previews.hero} mediaType={mediaTypes.hero} />
                            <MediaSlot label="Alt Kapanış Banner" type="conclusion" preview={previews.conclusion} mediaType={mediaTypes.conclusion} />
                        </div>
                    </div>

                    {status.type === "error" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl flex items-center gap-4">
                            <AlertCircle className="w-6 h-6 shrink-0" />
                            <p className="font-bold">{status.msg}</p>
                        </motion.div>
                    )}
                    {status.type === "success" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/20 text-green-500 p-6 rounded-2xl flex items-center gap-4">
                            <CheckCircle2 className="w-6 h-6 shrink-0" />
                            <p className="font-bold">{status.msg}</p>
                        </motion.div>
                    )}

                    <div className="sticky bottom-10 z-50 flex justify-end">
                        <button type="submit" disabled={loading || status.type === "success"} className="bg-white hover:bg-white/90 text-black shadow-2xl px-12 py-5 rounded-full uppercase text-xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                            {loading ? <><Loader2 className="w-6 h-6 animate-spin text-black/50" /><span>YÜKLENİYOR...</span></> : <><Plus className="w-6 h-6" /><span>PROJEYİ YAYINLA</span></>}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
