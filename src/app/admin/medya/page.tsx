"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type MediaItem = { id: number; name: string; type: "video" | "image"; size: string; path: string; date: string };

const INITIAL_MEDIA: MediaItem[] = [
  { id: 1, name: "hero-video.mp4", type: "video", size: "124 MB", path: "/hero-video.mp4", date: "8 Nis 2025" },
  { id: 2, name: "lune.mp4", type: "video", size: "48 MB", path: "/works/lune.mp4", date: "7 Nis 2025" },
  { id: 3, name: "aren.mp4", type: "video", size: "62 MB", path: "/works/aren.mp4", date: "7 Nis 2025" },
  { id: 4, name: "about-hero.jpg", type: "image", size: "2.4 MB", path: "/about-hero.jpg", date: "5 Nis 2025" },
  { id: 5, name: "nida-logo.svg", type: "image", size: "12 KB", path: "/nida-logo.svg", date: "1 Nis 2025" },
];

const FILTERS = ["Tümü", "Video", "Görsel"];

export default function AdminMedya() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [filter, setFilter] = useState("Tümü");
  const [copied, setCopied] = useState<number | null>(null);

  const filtered = filter === "Tümü" ? media : media.filter((m) => (filter === "Video" ? m.type === "video" : m.type === "image"));

  const copyPath = (id: number, path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const deleteItem = (id: number) => setMedia((p) => p.filter((m) => m.id !== id));

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Medya</h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{media.length} dosya</p>
        </div>
        <label className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
          + Dosya Yükle
          <input type="file" accept="video/*,image/*" className="hidden" onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const newItem: MediaItem = { id: Date.now(), name: file.name, type: file.type.startsWith("video") ? "video" : "image", size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, path: `/works/${file.name}`, date: "Bugün" };
            setMedia((p) => [newItem, ...p]);
          }} />
        </label>
      </div>

      {/* Filtre */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${filter === f ? "bg-black text-white" : "bg-white text-black/50 border border-black/10 hover:text-black"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Medya listesi */}
      <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_80px_100px_120px_80px] gap-4 px-5 py-3 border-b border-black/8 text-xs font-semibold text-black/40 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
          <span>Tür</span><span>Dosya</span><span>Boyut</span><span>Yol</span><span>Tarih</span><span className="text-right">İşlem</span>
        </div>
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="grid grid-cols-[auto_1fr_80px_100px_120px_80px] gap-4 items-center px-5 py-4 border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors"
          >
            {/* Tür ikonu */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${item.type === "video" ? "bg-black text-white" : "bg-black/8 text-black"}`}>
              {item.type === "video" ? "▶" : "◻"}
            </div>
            <span className="text-sm font-medium text-black truncate" style={{ fontFamily: "var(--font-inter)" }}>{item.name}</span>
            <span className="text-xs text-black/40" style={{ fontFamily: "var(--font-inter)" }}>{item.size}</span>
            <button onClick={() => copyPath(item.id, item.path)}
              className={`text-xs font-medium transition-colors text-left truncate ${copied === item.id ? "text-green-500" : "text-black/40 hover:text-black"}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {copied === item.id ? "Kopyalandı!" : "Kopyala"}
            </button>
            <span className="text-xs text-black/35" style={{ fontFamily: "var(--font-inter)" }}>{item.date}</span>
            <button onClick={() => deleteItem(item.id)} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors text-right" style={{ fontFamily: "var(--font-inter)" }}>Sil</button>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>Bu türde dosya bulunamadı.</div>
        )}
      </div>

      <p className="text-xs text-black/30 mt-4" style={{ fontFamily: "var(--font-inter)" }}>
        Not: Dosyalar projenin <code className="bg-black/5 px-1 rounded">public/</code> klasörüne yüklenmelidir.
      </p>
    </div>
  );
}
