"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-white border-b border-black/8 flex items-center justify-between site-px py-1 z-[100] relative"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline group shrink-0">
          <Image
            src="/nida-logo.svg"
            alt="Nida"
            width={114}
            height={56}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Center Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'çalışmalar', href: '/work' },
            { label: 'hizmetler', href: '/hizmetler' },
            { label: 'hakkımda', href: '/about' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-black text-xl font-medium hover:opacity-50 transition-opacity duration-200 lowercase tracking-wide"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-5">
          <div className="border border-black/25 rounded-full px-3.5 py-1.5 text-base font-medium tracking-widest text-black cursor-pointer hover:bg-black hover:text-white transition-all duration-200">
            TR
          </div>
          <Link
            href="/contact"
            className="text-black text-xl font-semibold hover:opacity-50 transition-opacity duration-200 lowercase tracking-wide"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            iletişim
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menüyü aç/kapat"
        >
          <motion.div animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-5 h-px bg-black" />
          <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-px bg-black" />
          <motion.div animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-5 h-px bg-black" />
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-8 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-8">
              {[
                { label: 'çalışmalar', href: '/work' },
                { label: 'hizmetler', href: '/hizmetler' },
                { label: 'hakkımda', href: '/about' },
                { label: 'iletişim', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-black text-black lowercase tracking-tighter border-b border-black/10 pb-6"
                  style={{ fontFamily: 'var(--font-archivo-black)' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
