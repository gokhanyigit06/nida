"use client";
import React, { useRef, useEffect, useState } from 'react';
import Footer from './Footer';

/**
 * Footer her zaman sayfanın altında fixed olarak durur (z-0).
 * Ana içerik (z-10, bg-white) scroll edildikçe üzerinden kayarak
 * footer'ı ortaya çıkarır. Footer tam göründüğünde kayma durur.
 */
export default function StickyFooterReveal() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    // ResizeObserver ile footer yüksekliğini her değişimde güncelle
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    observer.observe(footerRef.current);

    // İlk ölçüm — observer bazen ilk frame'i kaçırabilir
    setFooterHeight(footerRef.current.offsetHeight);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Spacer: footer yüksekliği kadar yer açar */}
      <div style={{ height: footerHeight || undefined }} aria-hidden />

      {/* Fixed footer — içeriğin altında z-0 */}
      <div ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0 overflow-visible">
        <Footer />
      </div>
    </>
  );
}
