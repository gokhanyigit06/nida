"use client";
import React, { useState } from "react";

const ITEMS = [
  { label: "Hero Başlığı", key: "heroTitle", value: "Nida Studio®", type: "text", desc: "Anasayfadaki büyük başlık metni" },
  { label: "Hero Alt Metin", key: "heroSub", value: "Video prodüksiyon ve yaratıcı içerik stüdyosu.", type: "textarea", desc: "Başlığın altındaki kısa açıklama" },
  { label: "Marquee Metni", key: "marquee", value: "Video Prodüksiyon · Kurgu & Post-Prodüksiyon · Sosyal Medya İçeriği · Marka Videolar ·", type: "textarea", desc: "Kayan yazı bandı içeriği" },
  { label: "Hero Video", key: "heroVideo", value: "/hero-video.mp4", type: "text", desc: "Ana video dosyasının yolu (public/ klasöründen)" },
  { label: "120+ Proje Sayısı", key: "stat1", value: "120+", type: "text", desc: "İstatistik 1" },
  { label: "Müşteri Sayısı", key: "stat2", value: "100+", type: "text", desc: "İstatistik 2" },
  { label: "Memnuniyet Oranı", key: "stat3", value: "%97", type: "text", desc: "İstatistik 3" },
  { label: "Deneyim Yılı", key: "stat4", value: "5+", type: "text", desc: "İstatistik 4" },
];

export default function AdminAnasayfa() {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(ITEMS.map((i) => [i.key, i.value]))
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all ${saved ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

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
                value={values[item.key]}
                onChange={(e) => setValues((prev) => ({ ...prev, [item.key]: e.target.value }))}
                className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors resize-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            ) : (
              <input
                type="text"
                value={values[item.key]}
                onChange={(e) => setValues((prev) => ({ ...prev, [item.key]: e.target.value }))}
                className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
