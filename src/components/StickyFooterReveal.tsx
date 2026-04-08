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

    const measure = () => {
      setFooterHeight(footerRef.current!.offsetHeight);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <>
      {/* Spacer: footer yüksekliği kadar yer açar, kayma tamamlandığında durur */}
      <div style={{ height: footerHeight }} aria-hidden />

      {/* Fixed footer — içeriğin altında z-0 */}
      <div ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>
    </>
  );
}
