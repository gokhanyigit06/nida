"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const defaultData = {
  heroTagline: "WE ARE NIDA",
  heroQuote: "A creative agency obsessed with making brands unforgettable.",
  whoTitle: "WHO WE ARE",
  whoPara1: "Nida is a full-service creative studio built for brands that refuse to blend in. We craft visual identities, marketing strategies, and content that makes people stop scrolling.",
  whoPara2: "From video editing to digital strategy — we bring the creative firepower brands need to grow. Every project is an opportunity to build something that lasts.",
  missionTitle: "OUR MISSION",
  missionText: "To turn bold ideas into unforgettable experiences. We believe great creative work doesn't just look good — it works hard, moves people, and drives results.",
  visionTitle: "OUR VISION",
  visionText: "A world where every brand tells a story worth hearing. We exist to be the creative partner that makes that happen.",
  stat1Value: "150+", stat1Label: "Projects Delivered",
  stat2Value: "4", stat2Label: "Years of Experience",
  stat3Value: "98%", stat3Label: "Client Satisfaction",
  stat4Value: "12", stat4Label: "Industry Awards",
  value1Title: "BOLD CREATIVITY", value1Text: "We push past the obvious and find ideas that surprise.",
  value2Title: "RESULTS FIRST", value2Text: "Beautiful work that also drives measurable business outcomes.",
  value3Title: "RADICAL HONESTY", value3Text: "We tell you what you need to hear, not just what you want.",
  value4Title: "RELENTLESS CRAFT", value4Text: "Every pixel, every word, every frame — obsessively refined.",
  team1Name: "Nida Yılmaz", team1Role: "Founder & Creative Director", team1Bio: "With a decade of experience across global brands, Nida built this agency to prove that world-class creative work can come from anywhere.", team1Image: "",
  team2Name: "Mert Aydın", team2Role: "Head of Video Production", team2Bio: "Award-winning cinematographer and editor who has produced content for brands across 3 continents.", team2Image: "",
  team3Name: "Selin Kaya", team3Role: "Brand Strategy Lead", team3Bio: "Former brand consultant for Fortune 500 companies. Loves turning complex ideas into clear, powerful brand stories.", team3Image: "",
  ctaTitle: "READY TO CREATE SOMETHING GREAT?",
  ctaButton: "Let's Talk →",
};

type Key = keyof typeof defaultData;

const inputStyle: React.CSSProperties = { padding: "0.8rem 1rem", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "0.95rem", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#777", display: "block", marginBottom: "0.4rem" };
const sectionHeadStyle: React.CSSProperties = { fontWeight: 800, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#1a6ff8", padding: "0.5rem 0", borderBottom: "1px solid #f0f0f0", marginBottom: "0.25rem" };
const cardStyle: React.CSSProperties = { background: "white", padding: "1.75rem", borderRadius: "18px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "1.2rem" };

export default function AdminAbout() {
  const [form, setForm] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "siteConfig", "about")).then((snap) => {
      if (snap.exists()) setForm({ ...defaultData, ...snap.data() });
      setLoading(false);
    });
  }, []);

  const set = (key: Key, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    await setDoc(doc(db, "siteConfig", "about"), form);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({ label, k, multi = false }: { label: string; k: Key; multi?: boolean }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      {multi
        ? <textarea rows={3} value={form[k]} onChange={(e) => set(k, e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" value={form[k]} onChange={(e) => set(k, e.target.value)} style={inputStyle} />
      }
    </div>
  );

  if (loading) return <div style={{ padding: "4rem", color: "#999", fontWeight: 700 }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h2 style={{ fontSize: "1.7rem", fontWeight: 900, margin: 0 }}>🧭 About Us Sayfası</h2>
        <p style={{ color: "#888", marginTop: "0.4rem", fontSize: "0.9rem" }}>Değişiklik yap → Kaydet → Site otomatik güncellenir.</p>
      </div>

      {/* Hero */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>Hero Bölümü</p>
        <Field label="Üst Etiket (Tagline)" k="heroTagline" />
        <Field label="Ana Başlık / Slogan" k="heroQuote" multi />
      </div>

      {/* Who We Are */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>Kim Biz (Who We Are)</p>
        <Field label="Bölüm Başlığı" k="whoTitle" />
        <Field label="1. Paragraf" k="whoPara1" multi />
        <Field label="2. Paragraf" k="whoPara2" multi />
      </div>

      {/* Mission & Vision */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>Misyon & Vizyon</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="Misyon Başlığı" k="missionTitle" />
          <Field label="Vizyon Başlığı" k="visionTitle" />
        </div>
        <Field label="Misyon Metni" k="missionText" multi />
        <Field label="Vizyon Metni" k="visionText" multi />
      </div>

      {/* Stats */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>İstatistikler</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.75rem" }}>
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Field label={`Değer ${n}`} k={`stat${n}Value` as Key} />
              <Field label={`Etiket ${n}`} k={`stat${n}Label` as Key} />
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>Değerlerimiz (4 Değer)</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", background: "#f9f9f9", padding: "1rem", borderRadius: "12px" }}>
              <Field label={`Değer ${n} Başlık`} k={`value${n}Title` as Key} />
              <Field label={`Değer ${n} Açıklama`} k={`value${n}Text` as Key} multi />
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>Ekip Üyeleri (3 Kişi)</p>
        {([1, 2, 3] as const).map((n) => (
          <div key={n} style={{ background: "#f9f9f9", padding: "1.2rem", borderRadius: "14px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ ...sectionHeadStyle, color: "#555", margin: 0 }}>Kişi {n}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="İsim" k={`team${n}Name` as Key} />
              <Field label="Unvan / Rol" k={`team${n}Role` as Key} />
            </div>
            <Field label="Biyografi" k={`team${n}Bio` as Key} multi />
            <Field label="Fotoğraf URL (isteğe bağlı)" k={`team${n}Image` as Key} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={cardStyle}>
        <p style={sectionHeadStyle}>Alt CTA Bölümü</p>
        <Field label="CTA Başlığı" k="ctaTitle" multi />
        <Field label="Buton Metni" k="ctaButton" />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: "1.1rem 2rem",
          background: saved ? "#22c55e" : "#1a6ff8",
          color: "white",
          border: "none",
          borderRadius: "14px",
          fontWeight: 900,
          fontSize: "1rem",
          cursor: saving ? "not-allowed" : "pointer",
          transition: "background 0.3s",
          letterSpacing: "0.04em",
          marginBottom: "2rem",
        }}
      >
        {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi!" : "Değişiklikleri Kaydet"}
      </button>
    </div>
  );
}
