"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { label: "Toplam Proje", value: "24", change: "+3 bu ay" },
  { label: "Medya Dosyası", value: "186", change: "+12 bu hafta" },
  { label: "Sayfa Görüntüleme", value: "4.2K", change: "Son 30 gün" },
  { label: "İletişim Formu", value: "8", change: "Yanıt bekliyor" },
];

const QUICK_LINKS = [
  { label: "Yeni Proje Ekle", href: "/admin/calishmalar/yeni", color: "bg-black text-white" },
  { label: "Medya Yükle", href: "/admin/medya", color: "bg-black/5 text-black" },
  { label: "Anasayfa Düzenle", href: "/admin/anasayfa", color: "bg-black/5 text-black" },
  { label: "İletişim Mesajları", href: "/admin/iletisim", color: "bg-black/5 text-black" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
          Hoş geldin 👋
        </h1>
        <p className="text-sm text-black/45 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Nida Studio yönetim paneline hoş geldin. Sol menüden ilgili bölüme geçiş yapabilirsin.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-white rounded-xl border border-black/8 p-5"
          >
            <div className="text-2xl font-semibold text-black mb-1" style={{ fontFamily: "var(--font-inter)" }}>{stat.value}</div>
            <div className="text-xs font-semibold text-black mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>{stat.label}</div>
            <div className="text-xs text-black/35" style={{ fontFamily: "var(--font-inter)" }}>{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Hızlı Erişim */}
      <div className="bg-white rounded-xl border border-black/8 p-6 mb-6">
        <h2 className="text-sm font-semibold text-black mb-5" style={{ fontFamily: "var(--font-inter)" }}>Hızlı Erişim</h2>
        <div className="flex flex-wrap gap-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-4 py-2.5 rounded-lg transition-opacity hover:opacity-70 ${link.color}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bölümler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Çalışmalar", desc: "Proje ekle, düzenle, video yükle", href: "/admin/calishmalar" },
          { title: "Anasayfa", desc: "Hero, marquee, istatistikler", href: "/admin/anasayfa" },
          { title: "Hizmetler", desc: "Hizmet içeriklerini güncelle", href: "/admin/hizmetler" },
          { title: "Hakkımızda", desc: "Ekip, müşteriler, hikaye", href: "/admin/hakkimizda" },
          { title: "İletişim", desc: "Form mesajları ve iletişim bilgileri", href: "/admin/iletisim" },
          { title: "Medya", desc: "Tüm görseller ve videolar", href: "/admin/medya" },
        ].map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
          >
            <Link
              href={item.href}
              className="flex items-center justify-between bg-white rounded-xl border border-black/8 p-5 hover:border-black/20 transition-all group"
            >
              <div>
                <div className="text-sm font-semibold text-black mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>{item.title}</div>
                <div className="text-xs text-black/40" style={{ fontFamily: "var(--font-inter)" }}>{item.desc}</div>
              </div>
              <span className="text-black/25 group-hover:text-black transition-colors text-lg">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
