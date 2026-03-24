"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const defaultData = {
  email: "hello@zentragency.com",
  phone: "+1 (234) 567-8900",
  hoursLine1: "Mon–Fri: 9:00 AM – 6:00 PM",
  hoursLine2: "Sat–Sun: Closed",
  heading: "REACH US\nDIRECTLY",
  subtext: "Tell us about your goals, challenges, and ideas — and we'll help you turn them into results.",
};

export default function AdminContact() {
  const [form, setForm] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "siteConfig", "contact"));
        if (snap.exists()) {
          setForm({ ...defaultData, ...snap.data() });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "siteConfig", "contact"), form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert("Kayıt sırasında hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof typeof defaultData, multiline = false) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#666" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          style={{ padding: "0.9rem 1.1rem", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "1rem", fontFamily: "inherit", resize: "vertical", outline: "none" }}
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          style={{ padding: "0.9rem 1.1rem", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "1rem", fontFamily: "inherit", outline: "none" }}
        />
      )}
    </div>
  );

  if (loading) return (
    <div style={{ padding: "4rem", textAlign: "center", fontWeight: 700, color: "#999" }}>Yükleniyor...</div>
  );

  return (
    <div style={{ maxWidth: "720px" }}>
      <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>📬 İletişim Sayfası</h2>
      <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
        Aşağıdaki bilgileri değiştirip kaydet — site otomatik güncellenir.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", background: "white", padding: "2rem", borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

        <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "0.75rem", marginBottom: "0.25rem" }}>
          <span style={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a6ff8" }}>Başlık & Açıklama</span>
        </div>
        {field("Sol Başlık ('\\n' ile satır kır)", "heading", true)}
        {field("Alt Açıklama Metni", "subtext", true)}

        <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "0.75rem", marginTop: "0.5rem" }}>
          <span style={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a6ff8" }}>İletişim Bilgileri</span>
        </div>
        {field("E-posta Adresi", "email")}
        {field("Telefon Numarası", "phone")}
        {field("Çalışma Saatleri - Satır 1", "hoursLine1")}
        {field("Çalışma Saatleri - Satır 2", "hoursLine2")}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            marginTop: "0.5rem",
            padding: "1rem 2rem",
            background: saved ? "#22c55e" : "#1a6ff8",
            color: "white",
            border: "none",
            borderRadius: "14px",
            fontWeight: 900,
            fontSize: "1rem",
            cursor: saving ? "not-allowed" : "pointer",
            transition: "background 0.3s",
            letterSpacing: "0.05em",
          }}
        >
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi!" : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </div>
  );
}
