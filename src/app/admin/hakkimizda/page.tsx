"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getAboutContent, setAboutContent, uploadFile, AboutContent } from "@/lib/db";

const SECTIONS = [
  { key: "heroTitle", label: "Hero Başlığı", type: "text", desc: "Büyük başlık metni (örn: hakkımda.)" },
  { key: "yearRange", label: "Yıl Aralığı", type: "text", desc: "Deneyim yıl aralığı" },
];

const DEFAULTS: AboutContent = {
  heroTitle: "hakkımda.",
  heroImage: "",
  heroDesc: "",
  storyTitle: "",
  storyDesc: "",
  teamTitle: "",
  clientsDesc: "",
  yearRange: "2020–2025",
};

export default function AdminHakkimizda() {
  const [values, setValues] = useState<AboutContent>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAboutContent()
      .then((data) => { if (data) setValues((p) => ({ ...p, ...data })); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await setAboutContent(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handlePhoto = (file: File) => {
    setUploadProgress(0);
    const path = `about/hero_${Date.now()}_${file.name}`;
    uploadFile(file, path, (state) => {
      setUploadProgress(state.progress);
      if (state.url) {
        setValues((p) => ({ ...p, heroImage: state.url! }));
        setUploadProgress(null);
      }
      if (state.error) {
        setError(state.error);
        setUploadProgress(null);
      }
    });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Hakkımda</h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Hero görseli ve başlık</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 ${saved ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"}`}
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
        <div className="text-sm text-black/40 py-12 text-center" style={{ fontFamily: "var(--font-inter)" }}>Yükleniyor…</div>
      ) : (
        <div className="flex flex-col gap-4">

          {/* ── Hero Görseli ── */}
          <div className="bg-white rounded-xl border border-black/8 p-5">
            <div className="text-sm font-semibold text-black mb-1" style={{ fontFamily: "var(--font-inter)" }}>Hero Görseli</div>
            <div className="text-xs text-black/40 mb-4" style={{ fontFamily: "var(--font-inter)" }}>Hakkımda sayfasındaki büyük görsel (21:9 oran önerilir)</div>

            {/* Preview */}
            <div
              className="w-full relative overflow-hidden rounded-lg bg-black/[0.04] border border-black/8 mb-4"
              style={{ aspectRatio: '21 / 9' }}
            >
              {values.heroImage ? (
                <Image src={values.heroImage} alt="Hero" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-xs text-black font-medium" style={{ fontFamily: "var(--font-inter)" }}>Görsel yok</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadProgress !== null}
                className="px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {uploadProgress !== null ? `Yükleniyor %${Math.round(uploadProgress)}` : "Fotoğraf Yükle"}
              </button>
              {values.heroImage && (
                <button
                  type="button"
                  onClick={() => setValues((p) => ({ ...p, heroImage: "" }))}
                  className="text-sm text-red-400 hover:text-red-600 font-medium"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Kaldır
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhoto(f); }}
            />
          </div>

          {/* ── Metin Alanları ── */}
          {SECTIONS.map((item) => (
            <div key={item.key} className="bg-white rounded-xl border border-black/8 p-5">
              <div className="text-sm font-semibold text-black mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</div>
              <div className="text-xs text-black/40 mb-3" style={{ fontFamily: "var(--font-inter)" }}>{item.desc}</div>
              <input
                type="text"
                value={(values as Record<string, string>)[item.key] ?? ""}
                onChange={(e) => setValues((p) => ({ ...p, [item.key]: e.target.value }))}
                className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
