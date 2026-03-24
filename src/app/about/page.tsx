"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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

  stat1Value: "150+",
  stat1Label: "Projects Delivered",
  stat2Value: "4",
  stat2Label: "Years of Experience",
  stat3Value: "98%",
  stat3Label: "Client Satisfaction",
  stat4Value: "12",
  stat4Label: "Industry Awards",

  value1Title: "BOLD CREATIVITY",
  value1Text: "We push past the obvious and find ideas that surprise.",
  value2Title: "RESULTS FIRST",
  value2Text: "Beautiful work that also drives measurable business outcomes.",
  value3Title: "RADICAL HONESTY",
  value3Text: "We tell you what you need to hear, not just what you want.",
  value4Title: "RELENTLESS CRAFT",
  value4Text: "Every pixel, every word, every frame — obsessively refined.",

  team1Name: "Nida Yılmaz",
  team1Role: "Founder & Creative Director",
  team1Bio: "With a decade of experience across global brands, Nida built this agency to prove that world-class creative work can come from anywhere.",
  team1Image: "",

  team2Name: "Mert Aydın",
  team2Role: "Head of Video Production",
  team2Bio: "Award-winning cinematographer and editor who has produced content for brands across 3 continents.",
  team2Image: "",

  team3Name: "Selin Kaya",
  team3Role: "Brand Strategy Lead",
  team3Bio: "Former brand consultant for Fortune 500 companies. Loves turning complex ideas into clear, powerful brand stories.",
  team3Image: "",

  ctaTitle: "READY TO CREATE SOMETHING GREAT?",
  ctaButton: "Let's Talk →",
};

type AboutData = typeof defaultData;

export default function AboutPage() {
  const [data, setData] = useState<AboutData>(defaultData);

  useEffect(() => {
    getDoc(doc(db, "siteConfig", "about"))
      .then((snap) => {
        if (snap.exists()) setData({ ...defaultData, ...snap.data() });
      })
      .catch(console.error);
  }, []);

  const fadeUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <Header />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "120px" }}>
        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

        {/* big bg text */}
        <div style={{ position: "absolute", bottom: "-4vw", left: "50%", transform: "translateX(-50%)", fontSize: "clamp(6rem, 18vw, 20rem)", fontWeight: 900, color: "rgba(255,255,255,0.03)", whiteSpace: "nowrap", fontFamily: "var(--font-archivo-black), sans-serif", letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none" }}>
          NIDA
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", zIndex: 10, padding: "0 2rem" }}
        >
          <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "2rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "99px", padding: "0.5rem 1.2rem" }}>
            {data.heroTagline}
          </div>
          <h1 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.04em", margin: "0 auto 2rem", maxWidth: "900px", textTransform: "uppercase" }}>
            {data.heroQuote}
          </h1>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: "2.5rem", color: "rgba(255,255,255,0.3)", fontSize: "1.5rem" }}
        >
          ↓
        </motion.div>

        {/* wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", overflow: "hidden", lineHeight: 0, transform: "translateY(1px)" }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: "block", width: "200%", height: "60px", fill: "#fff" }}>
            <path d="M0,0 C150,0 150,100 300,100 C450,100 450,0 600,0 C750,0 750,100 900,100 C1050,100 1050,0 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8rem 2rem" }}>
        <motion.div {...fadeUp} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#aaa", textTransform: "uppercase" }}>01 — About</span>
            <h2 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", margin: "1rem 0 0", textTransform: "uppercase", color: "#0a0a0a" }}>
              {data.whoTitle}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{ fontSize: "1.15rem", color: "#444", lineHeight: 1.75, margin: 0 }}>{data.whoPara1}</p>
            <p style={{ fontSize: "1.15rem", color: "#444", lineHeight: 1.75, margin: 0 }}>{data.whoPara2}</p>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#0a0a0a", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[
            { v: data.stat1Value, l: data.stat1Label },
            { v: data.stat2Value, l: data.stat2Label },
            { v: data.stat3Value, l: data.stat3Label },
            { v: data.stat4Value, l: data.stat4Label },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <div style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: "0.75rem" }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        {[
          { title: data.missionTitle, text: data.missionText, num: "02" },
          { title: data.visionTitle, text: data.visionText, num: "03" },
        ].map((item, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ borderTop: "2px solid #0a0a0a", paddingTop: "2rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", color: "#aaa", textTransform: "uppercase" }}>{item.num} —</span>
            <h2 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 900, margin: "0.75rem 0 1.5rem", textTransform: "uppercase", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
              {item.title}
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.75, margin: 0 }}>{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: "#f7f5f0", padding: "8rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#aaa", textTransform: "uppercase" }}>04 — Values</span>
            <h2 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, margin: "1rem 0 0", textTransform: "uppercase", color: "#0a0a0a", letterSpacing: "-0.03em" }}>
              WHAT WE STAND FOR
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", background: "#ddd" }}>
            {[
              { t: data.value1Title, d: data.value1Text },
              { t: data.value2Title, d: data.value2Text },
              { t: data.value3Title, d: data.value3Text },
              { t: data.value4Title, d: data.value4Text },
            ].map((v, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ background: "#fff", padding: "3rem", position: "relative" }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#bbb", marginBottom: "1.5rem" }}>0{i + 1}</div>
                <h3 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#0a0a0a" }}>{v.t}</h3>
                <p style={{ fontSize: "1rem", color: "#666", lineHeight: 1.7, margin: 0 }}>{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8rem 2rem" }}>
        <motion.div {...fadeUp} style={{ marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#aaa", textTransform: "uppercase" }}>05 — Team</span>
          <h2 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, margin: "1rem 0 0", textTransform: "uppercase", color: "#0a0a0a", letterSpacing: "-0.03em" }}>
            THE PEOPLE BEHIND IT
          </h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { name: data.team1Name, role: data.team1Role, bio: data.team1Bio, img: data.team1Image },
            { name: data.team2Name, role: data.team2Role, bio: data.team2Bio, img: data.team2Image },
            { name: data.team3Name, role: data.team3Role, bio: data.team3Bio, img: data.team3Image },
          ].map((member, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <div style={{ width: "100%", aspectRatio: "4/5", background: "#0a0a0a", borderRadius: "24px", marginBottom: "1.5rem", overflow: "hidden" }}>
                {member.img
                  ? <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", color: "rgba(255,255,255,0.1)", fontFamily: "var(--font-archivo-black)" }}>
                      {member.name.charAt(0)}
                    </div>
                }
              </div>
              <h3 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "1.3rem", fontWeight: 900, margin: "0 0 0.25rem", textTransform: "uppercase", letterSpacing: "-0.02em" }}>{member.name}</h3>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", color: "#999", textTransform: "uppercase", marginBottom: "1rem" }}>{member.role}</div>
              <p style={{ fontSize: "0.95rem", color: "#666", lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0a0a0a", padding: "8rem 2rem", textAlign: "center" }}>
        <motion.div {...fadeUp}>
          <h2 style={{ fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "clamp(2rem, 5vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 auto 3rem", maxWidth: "800px", lineHeight: 0.95 }}>
            {data.ctaTitle}
          </h2>
          <a href="/contact" style={{ display: "inline-block", background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-archivo-black), sans-serif", fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.01em", padding: "1.2rem 3rem", borderRadius: "99px", textDecoration: "none", textTransform: "uppercase", transition: "transform 0.2s, opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {data.ctaButton}
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
