"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteContent, setSiteContent, SiteContent } from "@/lib/db";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

type MediaItem = {
  id: string;
  name: string;
  type: "video" | "image";
  url: string;
  date: string;
};

const TEXT_ITEMS = [
  { label: "Hero Başlığı", key: "heroTitle", type: "text", desc: "Anasayfadaki büyük başlık metni" },
  { label: "Hero Alt Metin", key: "heroSub", type: "textarea", desc: "Başlığın altındaki kısa açıklama" },
  { label: "Marquee Metni", key: "marquee", type: "textarea", desc: "Kayan yazı bandı içeriği" },
];

const VIDEO_KEYS: { label: string; key: keyof SiteContent }[] = [
  { label: "Hero Video 1", key: "heroVideo" },
  { label: "Hero Video 2", key: "heroVideo2" },
  { label: "Hero Video 3", key: "heroVideo3" },
];

const DEFAULTS: SiteContent = {
  heroTitle: "Nida Studio®",
  heroSub: "Video prodüksiyon ve yaratıcı içerik stüdyosu.",
  marquee: "Video Prodüksiyon · Kurgu & Post-Prodüksiyon · Sosyal Medya İçeriği · Marka Videolar ·",
  heroVideo: "",
  heroVideo2: "",
  heroVideo3: "",
  stat1: "",
  stat2: "",
  stat3: "",
  stat4: "",
};

// ── Media Picker Modal ────────────────────────────────────────────
function MediaPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MediaItem, "id">) }));
        setItems(docs.filter((d) => d.type === "video"));
      })
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/8">
            <div>
              <h2 className="text-base font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>
                Medya Kütüphanesi
              </h2>
              <p className="text-xs text-black/40 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                Video seç
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/50 hover:bg-black/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>
                Yükleniyor…
              </div>
            ) : items.length === 0 ? (
              <div className="py-12 text-center" style={{ fontFamily: "var(--font-inter)" }}>
                <p className="text-sm text-black/30">Henüz video yüklenmemiş.</p>
                <p className="text-xs text-black/20 mt-1">Medya sayfasından önce video yükleyin.</p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onSelect(item.url); onClose(); }}
                  className="w-full flex items-center gap-3 px-6 py-3.5 text-left hover:bg-black/[0.03] transition-colors border-b border-black/5 last:border-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center text-white text-xs shrink-0">
                    ▶
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black truncate" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs text-black/35 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.date}
                    </p>
                  </div>
                  <span className="text-xs text-black/25 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
                    Seç →
                  </span>
                </button>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Video Field ───────────────────────────────────────────────────
function VideoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const isFirebaseUrl = value.startsWith("https://");

  return (
    <div className="bg-white rounded-xl border border-black/8 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>
            {label}
          </div>
          <div className="text-xs text-black/40 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            Firebase Storage video URL
          </div>
        </div>
        <button
          onClick={() => setPickerOpen(true)}
          className="text-xs font-semibold px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition-colors shrink-0 ml-3"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Seç
        </button>
      </div>

      {/* URL preview */}
      {value ? (
        <div className={`rounded-lg px-4 py-3 flex items-center gap-2 ${isFirebaseUrl ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <span className="text-sm shrink-0">{isFirebaseUrl ? "✓" : "⚠"}</span>
          <span
            className={`text-xs flex-1 truncate ${isFirebaseUrl ? "text-green-700" : "text-red-600"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isFirebaseUrl ? value : `Geçersiz URL: "${value}" — Medyadan seç!`}
          </span>
          {value && (
            <button
              onClick={() => onChange("")}
              className="text-xs text-black/30 hover:text-black/60 shrink-0 ml-1"
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <div
          className="rounded-lg px-4 py-3 bg-black/[0.04] text-xs text-black/30 cursor-pointer hover:bg-black/[0.07] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
          onClick={() => setPickerOpen(true)}
        >
          Video seçilmedi — "Seç" butonuna tıklayın
        </div>
      )}

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onChange}
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminAnasayfa() {
  const [values, setValues] = useState<SiteContent>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSiteContent()
      .then((data) => { if (data) setValues(data); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await setSiteContent(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
            Anasayfa
          </h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            Hero, marquee ve video içerikleri
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 ${
            saved ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {saving ? "Kaydediliyor…" : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
          ⚠ {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-black/40 py-12 text-center" style={{ fontFamily: "var(--font-inter)" }}>
          Yükleniyor…
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Metin alanları */}
          {TEXT_ITEMS.map((item) => (
            <div key={item.key} className="bg-white rounded-xl border border-black/8 p-5">
              <div className="mb-3">
                <div className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.label}
                </div>
                <div className="text-xs text-black/40 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.desc}
                </div>
              </div>
              {item.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={(values as Record<string, string>)[item.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [item.key]: e.target.value }))}
                  className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors resize-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              ) : (
                <input
                  type="text"
                  value={(values as Record<string, string>)[item.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [item.key]: e.target.value }))}
                  className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              )}
            </div>
          ))}

          {/* Bölüm başlığı */}
          <div className="pt-2 pb-1">
            <p className="text-xs font-semibold text-black/40 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
              Hero Videoları
            </p>
            <p className="text-xs text-black/30 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
              Önce Medya sayfasından video yükleyin, ardından buradan seçin.
            </p>
          </div>

          {/* Video alanları */}
          {VIDEO_KEYS.map(({ label, key }) => (
            <VideoField
              key={key}
              label={label}
              value={(values as Record<string, string>)[key] ?? ""}
              onChange={(url) => setValues((prev) => ({ ...prev, [key]: url }))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
