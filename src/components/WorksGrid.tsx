"use client";
import React, { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";

interface Work {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl?: string;
  coverVideoUrl?: string;
  media?: { type: 'image' | 'video'; url: string }[];
}

const WorkCard = ({ work, index }: { work: Work; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // coverVideoUrl öncelikli, yoksa media array'inden video ara
  const videoUrl = work.coverVideoUrl ||
    work.media?.find((m) => m.type === "video")?.url ||
    null;
  const coverImage = work.imageUrl ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovered) {
      video.pause();
    } else {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [hovered]);

  const mediaStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.5s ease",
  };

  return (
    <Link href={`/work/${work.id}`} style={{ display: "block", textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "840px",
          height: "470px",
          overflow: "hidden",
          background: "#111",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >




        {/* Kapak görseli — hover'da görünür */}
        {coverImage && (
          <img
            src={coverImage}
            alt={work.title}
            style={{ ...mediaStyle, opacity: hovered ? 1 : 0 }}
          />
        )}

        {/* Video — hover yokken oynar */}
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            style={{ ...mediaStyle, opacity: hovered ? 0 : 1 }}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : coverImage ? (
          <img
            src={coverImage}
            alt={work.title}
            style={{ ...mediaStyle, opacity: hovered ? 0 : 1 }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#1c1c1c" }} />
        )}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.85) 100%)",
          zIndex: 5, pointerEvents: "none",
        }} />

        {/* Alt bilgi */}
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          zIndex: 10,
        }}>
          <h3 style={{
            color: "#fff", margin: 0, fontSize: "1.5rem", fontWeight: 900,
            textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.1,
            maxWidth: "80%", fontFamily: "var(--font-archivo-black), sans-serif",
          }}>
            {work.title}
          </h3>
          <span style={{
            color: hovered ? "#fff" : "rgba(255,255,255,0.5)",
            fontSize: "1.5rem",
            transition: "transform 0.3s, color 0.3s",
            transform: hovered ? "translate(4px, -4px)" : "none",
            display: "block",
          }}>
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
};

const WorksGrid = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "portfolio"), (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Work[];
      setWorks(items.slice(0, 10));
    });
    return () => unsub();
  }, []);

  if (works.length === 0) return null;

  return (
    <section style={{ background: "#ffffff", padding: 0, paddingBottom: "130px", overflowX: "hidden" }}>
      {/* Başlık */}
      <div style={{ textAlign: "center", padding: "80px 2rem 60px" }}>
        <h2 style={{
          fontFamily: "var(--font-archivo-black), sans-serif",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 900,
          color: "#1a1a1a",
          textTransform: "uppercase",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          margin: 0,
        }}>
          OUR FEATURED<br />WORKS
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "840px 840px",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {works.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
};

export default WorksGrid;
