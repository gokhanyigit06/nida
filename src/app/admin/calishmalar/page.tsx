"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  subscribeWorks,
  addWork,
  updateWork,
  deleteWork,
  uploadFile,
  type Work,
} from "@/lib/db";

const CATEGORIES = [
  "Sanat Yönetimi","Kurumsal Kimlik","Dijital Tasarım",
  "Web Tasarımı","Dijital Pazarlama","E-Ticaret","Strateji","Sosyal Medya",
];

const emptyWork: Omit<Work, "id"> = {
  title: "", category: CATEGORIES[0], year: new Date().getFullYear().toString(),
  videoUrl: "", thumbUrl: "", visible: true, order: 99,
};

type UploadState = { progress: number; uploading: boolean; error?: string };

export default function AdminCalishmalar() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editWork, setEditWork] = useState<Partial<Work>>(emptyWork);
  const [isNew, setIsNew] = useState(true);
  const [saving, setSaving] = useState(false);
  const [upload, setUpload] = useState<UploadState>({ progress: 0, uploading: false });
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Gerçek zamanlı Firestore aboneliği
  useEffect(() => {
    const unsub = subscribeWorks((data) => {
      setWorks(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const openNew = () => { setEditWork({ ...emptyWork, order: works.length }); setIsNew(true); setUpload({ progress: 0, uploading: false }); setShowModal(true); };
  const openEdit = (w: Work) => { setEditWork({ ...w }); setIsNew(false); setUpload({ progress: 0, uploading: false }); setShowModal(true); };

  // Video dosyası seçilince Storage'a yükle
  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `works/${Date.now()}_${file.name}`;
    setUpload({ progress: 0, uploading: true });
    try {
      const url = await uploadFile(file, path, ({ progress }) =>
        setUpload({ progress, uploading: true })
      );
      setEditWork((p) => ({ ...p, videoUrl: url }));
      setUpload({ progress: 100, uploading: false });
    } catch {
      setUpload({ progress: 0, uploading: false, error: "Yükleme başarısız." });
    }
  };

  const save = async () => {
    if (!editWork.title) return;
    setSaving(true);
    try {
      if (isNew) {
        await addWork(editWork as Omit<Work, "id">);
      } else {
        await updateWork(editWork.id!, editWork);
      }
      setShowModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu projeyi silmek istiyor musun?")) return;
    await deleteWork(id);
  };

  const toggleVisible = async (w: Work) => {
    await updateWork(w.id, { visible: !w.visible });
  };

  if (loading) {
    return <div className="text-sm text-black/40 pt-8" style={{ fontFamily: "var(--font-inter)" }}>Yükleniyor...</div>;
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Çalışmalar</h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            {works.length} proje · {works.filter((w) => w.visible).length} aktif
          </p>
        </div>
        <button onClick={openNew} className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
          + Proje Ekle
        </button>
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_80px_140px_80px] gap-4 px-5 py-3 border-b border-black/8 text-xs font-semibold text-black/40 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
          <span>Proje</span><span>Kategori</span><span>Yıl</span><span>Video</span><span className="text-right">İşlem</span>
        </div>

        {works.length === 0 && (
          <div className="text-center py-16 text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>
            Henüz proje yok. + Proje Ekle ile başla.
          </div>
        )}

        {works.map((work, i) => (
          <motion.div key={work.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="grid grid-cols-[1fr_1fr_80px_140px_80px] gap-4 items-center px-5 py-4 border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleVisible(work)} className={`w-2 h-2 rounded-full shrink-0 transition-colors ${work.visible ? "bg-black" : "bg-black/20"}`} title={work.visible ? "Gizle" : "Göster"} />
              <span className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{work.title}</span>
            </div>
            <span className="text-xs text-black/50" style={{ fontFamily: "var(--font-inter)" }}>{work.category}</span>
            <span className="text-xs text-black/50 tabular-nums" style={{ fontFamily: "var(--font-inter)" }}>{work.year}</span>
            <span className={`text-xs font-medium truncate ${work.videoUrl ? "text-black" : "text-black/25"}`} style={{ fontFamily: "var(--font-inter)" }}>
              {work.videoUrl ? "✓ Video var" : "— Yok"}
            </span>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => openEdit(work)} className="text-xs text-black/40 hover:text-black transition-colors font-medium" style={{ fontFamily: "var(--font-inter)" }}>Düzenle</button>
              <button onClick={() => handleDelete(work.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium" style={{ fontFamily: "var(--font-inter)" }}>Sil</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => !saving && setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-8 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-lg font-semibold text-black mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                {isNew ? "Yeni Proje" : `Düzenle: ${editWork.title}`}
              </h2>

              <div className="flex flex-col gap-4">
                {/* Başlık */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Proje Adı</label>
                  <input type="text" placeholder="Lune" value={editWork.title ?? ""} onChange={(e) => setEditWork((p) => ({ ...p, title: e.target.value }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black placeholder:text-black/25 outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                </div>

                {/* Kategori */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Kategori</label>
                  <select value={editWork.category} onChange={(e) => setEditWork((p) => ({ ...p, category: e.target.value }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Yıl */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Yıl</label>
                  <input type="text" placeholder="2025" value={editWork.year ?? ""} onChange={(e) => setEditWork((p) => ({ ...p, year: e.target.value }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black placeholder:text-black/25 outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                </div>

                {/* Video yükleme */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Kapak Videosu</label>
                  {editWork.videoUrl ? (
                    <div className="flex items-center gap-3 bg-black/[0.04] rounded-lg px-4 py-3">
                      <span className="text-xs text-black/60 flex-1 truncate" style={{ fontFamily: "var(--font-inter)" }}>✓ Video yüklendi</span>
                      <button onClick={() => setEditWork((p) => ({ ...p, videoUrl: "" }))} className="text-xs text-red-400 hover:text-red-600 font-medium shrink-0" style={{ fontFamily: "var(--font-inter)" }}>Kaldır</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 bg-black/[0.04] rounded-lg px-4 py-6 border-2 border-dashed border-black/10 hover:border-black/20 cursor-pointer transition-colors">
                      {upload.uploading ? (
                        <>
                          <div className="w-full bg-black/10 rounded-full h-1.5">
                            <div className="bg-black h-1.5 rounded-full transition-all" style={{ width: `${upload.progress}%` }} />
                          </div>
                          <span className="text-xs text-black/50" style={{ fontFamily: "var(--font-inter)" }}>{Math.round(upload.progress)}% yükleniyor...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl">🎬</span>
                          <span className="text-xs text-black/50 text-center" style={{ fontFamily: "var(--font-inter)" }}>Video seç (mp4, mov, webm)</span>
                        </>
                      )}
                      <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} disabled={upload.uploading} />
                    </label>
                  )}
                  {upload.error && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>{upload.error}</p>}
                </div>

                {/* Sıralama */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Sıra</label>
                  <input type="number" value={editWork.order ?? 0} onChange={(e) => setEditWork((p) => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                </div>

                {/* Görünürlük toggle */}
                <div className="flex items-center gap-3">
                  <button onClick={() => setEditWork((p) => ({ ...p, visible: !p.visible }))}
                    className={`w-10 h-5 rounded-full transition-colors relative ${editWork.visible ? "bg-black" : "bg-black/15"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${editWork.visible ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <span className="text-sm text-black/60" style={{ fontFamily: "var(--font-inter)" }}>Sitede göster</span>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button disabled={saving} onClick={() => setShowModal(false)} className="flex-1 border border-black/15 text-sm font-medium text-black rounded-lg py-3 hover:bg-black/5 transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>İptal</button>
                <button disabled={saving || upload.uploading} onClick={save}
                  className="flex-1 bg-black text-white text-sm font-semibold rounded-lg py-3 hover:bg-black/80 transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
