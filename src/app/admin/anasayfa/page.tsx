"use client";
import React, { useState, useEffect } from "react";
import { getSiteContent, setSiteContent, SiteContent } from "@/lib/db";

const ITEMS = [
  { label: "Hero Başlığı", key: "heroTitle", type: "text", desc: "Anasayfadaki büyük başlık metni" },
  { label: "Hero Alt Metin", key: "heroSub", type: "textarea", desc: "Başlığın altındaki kısa açıklama" },
  { label: "Marquee Metni", key: "marquee", type: "textarea", desc: "Kayan yazı bandı içeriği" },
  { label: "Hero Video 1", key: "heroVideo", type: "text", desc: "1. video URL" },
  { label: "Hero Video 2", key: "heroVideo2", type: "text", desc: "2. video URL" },
  { label: "Hero Video 3", key: "heroVideo3", type: "text", desc: "3. video URL" },
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

export default function AdminAnasayfa() {
  const [values, setValues] = useState<SiteContent>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSiteContent()
      .then((data) => {
        if (data) setValues(data);
      })
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Anasayfa</h1>
          <p className="text-sm text-black/45 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Hero, marquee ve istatistik içerikleri</p>
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
          {ITEMS.map((item) => (
            <div key={item.key} className="bg-white rounded-xl border border-black/8 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</div>
                  <div className="text-xs text-black/40 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{item.desc}</div>
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
        </div>
      )}
    </div>
  );
}
