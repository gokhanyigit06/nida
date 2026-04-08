"use client";
import React, { useState, useEffect } from "react";
import { getContactInfo, setContactInfo, ContactInfo } from "@/lib/db";

const MOCK_MESSAGES = [
  { id: 1, name: "Ahmet K.", email: "ahmet@example.com", message: "Merhaba, ürün videosu çektirmek istiyoruz. Fiyat teklifi alabilir miyiz?", date: "8 Nis 2025", read: false },
  { id: 2, name: "Zeynep S.", email: "zeynep@marka.com", message: "Instagram reels içeriği konusunda görüşmek istiyoruz.", date: "7 Nis 2025", read: false },
  { id: 3, name: "Can B.", email: "can@startup.io", message: "Pitch deck videosu için nasıl bir süreç işletiyorsunuz?", date: "5 Nis 2025", read: true },
];

const CONTACT_FIELDS = [
  { label: "E-posta", key: "email" },
  { label: "Telefon", key: "phone" },
  { label: "Instagram", key: "instagram" },
  { label: "Twitter / X", key: "twitter" },
  { label: "LinkedIn", key: "linkedin" },
  { label: "Adres", key: "address" },
];

const DEFAULTS: ContactInfo = {
  email: "merhaba@nidastudio.com",
  phone: "+90 500 123 45 67",
  instagram: "https://instagram.com/nidastudio",
  twitter: "https://twitter.com/nidastudio",
  linkedin: "https://linkedin.com/company/nidastudio",
  address: "Zorlu Center, Levent, İstanbul, Türkiye",
};

export default function AdminIletisim() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [info, setInfo] = useState<ContactInfo>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<(typeof MOCK_MESSAGES)[0] | null>(null);

  useEffect(() => {
    getContactInfo()
      .then((data) => { if (data) setInfo(data); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const markRead = (id: number) => setMessages((p) => p.map((m) => m.id === id ? { ...m, read: true } : m));
  const deleteMsg = (id: number) => { setMessages((p) => p.filter((m) => m.id !== id)); setSelected(null); };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await setContactInfo(info);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold text-black tracking-tight mb-8" style={{ fontFamily: "var(--font-inter)" }}>İletişim</h1>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
          ⚠ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Form mesajları */}
        <div>
          <h2 className="text-sm font-semibold text-black/50 uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Gelen Mesajlar <span className="text-black bg-black/10 rounded-full px-2 py-0.5 ml-2 font-bold text-xs">{messages.filter(m => !m.read).length}</span>
          </h2>
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <button key={msg.id} onClick={() => { setSelected(msg); markRead(msg.id); }}
                className={`text-left bg-white rounded-xl border p-4 w-full transition-all hover:border-black/20 ${selected?.id === msg.id ? "border-black" : "border-black/8"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1" />}
                    <span className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{msg.name}</span>
                  </div>
                  <span className="text-xs text-black/30 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>{msg.date}</span>
                </div>
                <p className="text-xs text-black/45 line-clamp-2" style={{ fontFamily: "var(--font-inter)" }}>{msg.message}</p>
              </button>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-12 text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>Henüz mesaj yok.</div>
            )}
          </div>
        </div>

        {/* Seçili mesaj detayı */}
        <div>
          {selected ? (
            <div className="bg-white rounded-xl border border-black/8 p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-base font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>{selected.name}</div>
                  <div className="text-sm text-black/45" style={{ fontFamily: "var(--font-inter)" }}>{selected.email}</div>
                </div>
                <button onClick={() => deleteMsg(selected.id)} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Sil</button>
              </div>
              <p className="text-sm text-black/70 leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>{selected.message}</p>
              <a href={`mailto:${selected.email}`}
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                E-posta ile Yanıtla →
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-black/8 flex items-center justify-center h-48">
              <p className="text-sm text-black/30" style={{ fontFamily: "var(--font-inter)" }}>Mesaj seçin</p>
            </div>
          )}
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-black/50 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>İletişim Bilgileri</h2>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all disabled:opacity-50 ${saved ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {saving ? "Kaydediliyor…" : saved ? "✓ Kaydedildi" : "Kaydet"}
          </button>
        </div>
        {loading ? (
          <div className="text-sm text-black/40 py-8 text-center" style={{ fontFamily: "var(--font-inter)" }}>Yükleniyor…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTACT_FIELDS.map((item) => (
              <div key={item.key} className="bg-white rounded-xl border border-black/8 p-4">
                <label className="text-xs font-semibold text-black/40 block mb-2" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</label>
                <input type="text" value={(info as Record<string, string>)[item.key] ?? ""}
                  onChange={(e) => { setInfo((p) => ({ ...p, [item.key]: e.target.value })); setSaved(false); }}
                  className="w-full bg-black/[0.04] rounded-lg px-3 py-2.5 text-sm text-black outline-none focus:bg-black/[0.07] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
