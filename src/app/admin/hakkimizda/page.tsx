"use client";
import React, { useState, useEffect } from "react";
import { getAboutContent, setAboutContent, AboutContent } from "@/lib/db";

const SECTIONS = [
  { key: "heroDesc", label: "Hero Açıklama", type: "textarea" },
  { key: "storyTitle", label: "Hikaye Başlığı", type: "textarea" },
  { key: "storyDesc", label: "Hikaye Açıklaması", type: "textarea" },
  { key: "teamTitle", label: "Ekip Bölümü Başlığı", type: "textarea" },
  { key: "clientsDesc", label: "Müşteriler Açıklaması", type: "textarea" },
  { key: "yearRange", label: "Yıl Aralığı", type: "text" },
];

const DEFAULTS: AboutContent = {
  heroDesc: "Karmaşayı sadeliğe dönüştürerek, en güçlü etkiyi yaratan bir tasarım stüdyosuyuz.",
  storyTitle: "Nida, görüntünün bir markayı dönüştürebileceğine olan güçlü inançla doğdu.",
  storyDesc: "Yaratıcı endüstrideki gürültü ve karmaşadan uzaklaşarak; farklı, net, niyet ve sadeliğe odaklanan bir stüdyo kurmak için yola çıktık.",
  teamTitle: "Video editçiler, yaratıcı kafalar ve hikaye anlatıcılarından oluşan bir aileyiz.",
  clientsDesc: "Net, anlamlı ve kalıcı işler yaratmak için vizyoner markalarla işbirliği yapıyoruz.",
  yearRange: "2020–2025",
};

const TEAM_MEMBERS = [
  { id: 1, name: "Nida Yılmaz", role: "Kurucu & Yaratıcı Direktör" },
  { id: 2, name: "Mert Aydın", role: "Video Prodüksiyon Direktörü" },
  { id: 3, name: "Selin Kaya", role: "İçerik & Strateji Uzmanı" },
];

export default function AdminHakkimizda() {
  const [values, setValues] = useState<AboutContent>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAboutContent()
      .then((data) => { if (data) setValues(data); })
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

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Hakkımızda</h1>
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

      {/* Metin içerikleri */}
      <div className="flex flex-col gap-4 mb-8">
        <h2 className="text-sm font-semibold text-black/50 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>İçerikler</h2>
        {loading ? (
          <div className="text-sm text-black/40 py-8 text-center" style={{ fontFamily: "var(--font-inter)" }}>Yükleniyor…</div>
        ) : (
          SECTIONS.map((item) => (
            <div key={item.key} className="bg-white rounded-xl border border-black/8 p-5">
              <label className="text-sm font-semibold text-black block mb-3" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</label>
              {item.type === "textarea" ? (
                <textarea rows={3} value={(values as Record<string, string>)[item.key] ?? ""}
                  onChange={(e) => setValues((p) => ({ ...p, [item.key]: e.target.value }))}
                  className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors resize-none" style={{ fontFamily: "var(--font-inter)" }} />
              ) : (
                <input type="text" value={(values as Record<string, string>)[item.key] ?? ""}
                  onChange={(e) => setValues((p) => ({ ...p, [item.key]: e.target.value }))}
                  className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
              )}
            </div>
          ))
        )}
      </div>

      {/* Ekip */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-black/50 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>Ekip Üyeleri</h2>
        {TEAM_MEMBERS.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-black/8 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black/8 flex items-center justify-center text-sm font-bold text-black/40 shrink-0">
              {m.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{m.name}</div>
              <div className="text-xs text-black/45" style={{ fontFamily: "var(--font-inter)" }}>{m.role}</div>
            </div>
            <button className="text-xs text-black/35 hover:text-black font-medium transition-colors border border-black/10 px-3 py-1.5 rounded-lg" style={{ fontFamily: "var(--font-inter)" }}>
              Fotoğraf Yükle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
