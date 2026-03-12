"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed md:absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1200px] bg-white text-black px-8 md:px-12 py-3 md:py-6 rounded-full shadow-2xl flex justify-between items-center transition-all duration-300"
      >
        <Link href="/" className="no-underline color-inherit">
          <div className="heading-font text-2xl md:text-3xl tracking-tighter">
            NİDA
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-lg">
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/work" className="hover:opacity-70 transition-opacity">Work</Link>
          <Link href="#about" className="hover:opacity-70 transition-opacity">About me</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="hidden md:block no-underline">
          <div className="font-bold text-3xl text-[#cc0000] flex items-center gap-1 group">
            Let's Talk <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-current rounded-full" 
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-current rounded-full" 
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-current rounded-full" 
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-white pt-32 px-8 md:hidden flex flex-col gap-8 text-center"
          >
            <nav className="flex flex-col gap-6 text-3xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/work" onClick={() => setIsOpen(false)}>Work</Link>
              <Link href="#about" onClick={() => setIsOpen(false)}>About me</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </nav>
            
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="mt-8 bg-[#1D6BFF] text-white py-6 rounded-3xl text-2xl font-black"
              style={{ fontFamily: 'var(--font-archivo-black)' }}
            >
              LET'S TALK →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
