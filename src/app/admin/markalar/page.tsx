"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  uploadFile,
  Brand,
} from "@/lib/db";

const empty: Omit<Brand, "id"> = { name: "", year: new Date().getFullYear().toString(), logoUrl: "", order: 0 };

export default function AdminMarkalar() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState<Partial<Brand>>({});
  const [isNew, setIsNew] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Yükleme hatası");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEdit({ ...empty, order: brands.length }); setIsNew(true); setShowModal(true); };
  const openEdit = (b: Brand) => { setEdit({ ...b }); setIsNew(false); setShowModal(true); };

  const handleLogo = async (file: File) => {
    setUploadProgress(0);
    const path = `brands/${Date.now()}_${file.name}`;
    uploadFile(file, path, (state) => {
      setUploadProgress(state.progress);
      if (state.url) {
        setEdit((p) => ({ ...p, logoUrl: state.url! }));
        setUploadProgress(null);
      }
      if (state.error) {
        setError(state.error);
        setUploadProgress(null);
      }
    });
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await addBrand(edit as Omit<Brand, "id">);
      } else {
        const { id, ...rest } = edit as Brand;
        await updateBrand(id, rest);
      }
      setShowModal(false);
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteBrand(id);
      setBrands((p) => p.filter((b) => b.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Silme başarısız");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Markalar</h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{brands.length} marka</p>
        </div>
        <button onClick={openNew} className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
          + Marka Ekle
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>⚠ {error}</div>
      )}

      {loading ? (
        <div className="text-sm text-black/40 py-12 text-center" style={{ fontFamily: "var(--font-inter)" }}>Yükleniyor…</div>
      ) : brands.length === 0 ? (
        <div className="text-center py-16 text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>Henüz marka eklenmedi.</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {brands.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-black/8 p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-black/30 font-medium" style={{ fontFamily: "var(--font-inter)" }}>0{i + 1}</div>
                  <div className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{b.name}</div>
                  <div className="text-xs text-black/40" style={{ fontFamily: "var(--font-inter)" }}>{b.year}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(b)} className="text-xs text-black/40 hover:text-black font-medium" style={{ fontFamily: "var(--font-inter)" }}>Düzenle</button>
                  <button onClick={() => remove(b.id)} className="text-xs text-red-400 hover:text-red-600 font-medium" style={{ fontFamily: "var(--font-inter)" }}>Sil</button>
                </div>
              </div>
              {/* Logo preview */}
              <div className="w-full h-16 rounded-lg bg-black/[0.03] border border-black/8 flex items-center justify-center overflow-hidden">
                {b.logoUrl ? (
                  <Image src={b.logoUrl} alt={b.name} width={80} height={40} className="object-contain max-h-12" />
                ) : (
                  <span className="text-xs text-black/20" style={{ fontFamily: "var(--font-inter)" }}>Logo yok</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-8"
            >
              <h2 className="text-lg font-semibold text-black mb-6" style={{ fontFamily: "var(--font-inter)" }}>{isNew ? "Yeni Marka" : "Markayı Düzenle"}</h2>
              <div className="flex flex-col gap-4">
                {/* İsim */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Marka Adı</label>
                  <input type="text" value={edit.name ?? ""} onChange={(e) => setEdit((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                </div>
                {/* Yıl */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Yıl</label>
                  <input type="text" value={edit.year ?? ""} onChange={(e) => setEdit((p) => ({ ...p, year: e.target.value }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                </div>
                {/* Logo */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Logo</label>
                  <div className="flex gap-3 items-center">
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="px-4 py-2.5 bg-black/[0.04] rounded-lg text-sm text-black/60 hover:bg-black/[0.07] transition-colors font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                      {uploadProgress !== null ? `Yükleniyor %${Math.round(uploadProgress)}` : "Dosya Seç"}
                    </button>
                    {edit.logoUrl && (
                      <div className="h-10 w-20 rounded-md bg-black/[0.03] border border-black/8 flex items-center justify-center overflow-hidden">
                        <Image src={edit.logoUrl} alt="logo" width={64} height={32} className="object-contain max-h-8" />
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogo(f); }} />
                </div>
                {/* Sıra */}
                <div>
                  <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Sıra</label>
                  <input type="number" value={edit.order ?? 0} onChange={(e) => setEdit((p) => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                </div>
              </div>
              {error && (
                <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600" style={{ fontFamily: "var(--font-inter)" }}>⚠ {error}</div>
              )}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-black/15 text-sm font-medium text-black rounded-lg py-3 hover:bg-black/5 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>İptal</button>
                <button onClick={save} disabled={saving || uploadProgress !== null}
                  className="flex-1 bg-black text-white text-sm font-semibold rounded-lg py-3 hover:bg-black/80 transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>
                  {saving ? "Kaydediliyor…" : "Kaydet"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
