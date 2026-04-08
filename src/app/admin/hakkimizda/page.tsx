"use client";
import React, { useState } from "react";

const SECTIONS = [
  { key: "heroDesc", label: "Hero Açıklama", type: "textarea", value: "Karmaşayı sadeliğe dönüştürerek, en güçlü etkiyi yaratan bir tasarım stüdyosuyuz." },
  { key: "storyTitle", label: "Hikaye Başlığı", type: "textarea", value: "Nida, görüntünün bir markayı dönüştürebileceğine olan güçlü inançla doğdu." },
  { key: "storyDesc", label: "Hikaye Açıklaması", type: "textarea", value: "Yaratıcı endüstrideki gürültü ve karmaşadan uzaklaşarak; farklı, net, niyet ve sadeliğe odaklanan bir stüdyo kurmak için yola çıktık." },
  { key: "teamTitle", label: "Ekip Bölümü Başlığı", type: "textarea", value: "Video editçiler, yaratıcı kafalar ve hikaye anlatıcılarından oluşan bir aileyiz." },
  { key: "clientsDesc", label: "Müşteriler Açıklaması", type: "textarea", value: "Net, anlamlı ve kalıcı işler yaratmak için vizyoner markalarla işbirliği yapıyoruz." },
  { key: "yearRange", label: "Yıl Aralığı", type: "text", value: "2020–2025" },
];

const TEAM_MEMBERS = [
  { id: 1, name: "Nida Yılmaz", role: "Kurucu & Yaratıcı Direktör", photo: "" },
  { id: 2, name: "Mert Aydın", role: "Video Prodüksiyon Direktörü", photo: "" },
  { id: 3, name: "Selin Kaya", role: "İçerik & Strateji Uzmanı", photo: "" },
];

export default function AdminHakkimizda() {
  const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(SECTIONS.map((s) => [s.key, s.value])));
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>Hakkımızda</h1>
        <button onClick={handleSave} className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all ${saved ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"}`} style={{ fontFamily: "var(--font-inter)" }}>
          {saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      {/* Metin içerikleri */}
      <div className="flex flex-col gap-4 mb-8">
        <h2 className="text-sm font-semibold text-black/50 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>İçerikler</h2>
        {SECTIONS.map((item) => (
          <div key={item.key} className="bg-white rounded-xl border border-black/8 p-5">
            <label className="text-sm font-semibold text-black block mb-3" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</label>
            {item.type === "textarea" ? (
              <textarea rows={3} value={values[item.key]} onChange={(e) => setValues((p) => ({ ...p, [item.key]: e.target.value }))}
                className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors resize-none" style={{ fontFamily: "var(--font-inter)" }} />
            ) : (
              <input type="text" value={values[item.key]} onChange={(e) => setValues((p) => ({ ...p, [item.key]: e.target.value }))}
                className="w-full bg-black/[0.04] rounded-lg px-4 py-3 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
            )}
          </div>
        ))}
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
