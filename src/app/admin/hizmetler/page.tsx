"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getServices,
  addService,
  updateService,
  deleteService,
  Service,
} from "@/lib/db";

const empty: Omit<Service, "id"> = { title: "", description: "", tags: "", order: 0 };

export default function AdminHizmetler() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState<Partial<Service>>({});
  const [isNew, setIsNew] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Yükleme hatası");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEdit({ ...empty, order: services.length }); setIsNew(true); setShowModal(true); };
  const openEdit = (s: Service) => { setEdit({ ...s }); setIsNew(false); setShowModal(true); };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await addService(edit as Omit<Service, "id">);
      } else {
        const { id, ...rest } = edit as Service;
        await updateService(id, rest);
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
      await deleteService(id);
      setServices((p) => p.filter((s) => s.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Silme başarısız");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Hizmetler</h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{services.length} hizmet</p>
        </div>
        <button onClick={openNew} className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>+ Hizmet Ekle</button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
          ⚠ {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-black/40 py-12 text-center" style={{ fontFamily: "var(--font-inter)" }}>Yükleniyor…</div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>Henüz hizmet eklenmedi.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-black/8 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-xs text-black/30 font-medium mb-1" style={{ fontFamily: "var(--font-inter)" }}>0{i + 1}</div>
                  <div className="text-base font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{s.title}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(s)} className="text-xs text-black/40 hover:text-black font-medium transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Düzenle</button>
                  <button onClick={() => remove(s.id)} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Sil</button>
                </div>
              </div>
              <p className="text-sm text-black/50 mb-3" style={{ fontFamily: "var(--font-inter)" }}>{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.split(",").map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-black/[0.05] rounded-full text-black/60" style={{ fontFamily: "var(--font-inter)" }}>{t.trim()}</span>
                ))}
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
              <h2 className="text-lg font-semibold text-black mb-6" style={{ fontFamily: "var(--font-inter)" }}>{isNew ? "Yeni Hizmet" : "Hizmeti Düzenle"}</h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Başlık", key: "title", type: "text" },
                  { label: "Açıklama", key: "description", type: "textarea" },
                  { label: "Etiketler (virgülle ayır)", key: "tags", type: "textarea" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="text-xs font-semibold text-black block mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>{label}</label>
                    {type === "textarea" ? (
                      <textarea rows={3} value={(edit as Record<string, string>)[key] ?? ""} onChange={(e) => setEdit((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors resize-none" style={{ fontFamily: "var(--font-inter)" }} />
                    ) : (
                      <input type="text" value={(edit as Record<string, string>)[key] ?? ""} onChange={(e) => setEdit((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
                    )}
                  </div>
                ))}
              </div>
              {error && (
                <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
                  ⚠ {error}
                </div>
              )}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-black/15 text-sm font-medium text-black rounded-lg py-3 hover:bg-black/5 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>İptal</button>
                <button onClick={save} disabled={saving} className="flex-1 bg-black text-white text-sm font-semibold rounded-lg py-3 hover:bg-black/80 transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>
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
