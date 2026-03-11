"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
        maxWidth: '1200px',
        width: 'calc(100% - 4rem)',
        position: 'absolute',
        top: '2rem',
        left: '50%',
        x: '-50%',
        padding: '1.8rem 4rem',
        borderRadius: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        zIndex: 100
      }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="heading-font" style={{ fontSize: '2rem', letterSpacing: '-1px' }}>
          NİDA
        </div>
      </Link>
      
      <nav style={{
        display: 'flex',
        gap: '2rem',
        fontWeight: '700',
        fontSize: '1.1rem'
      }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <Link href="/work" style={{ color: 'inherit', textDecoration: 'none' }}>Work</Link>
        <Link href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About us</Link>
        <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
      </nav>

      <Link href="/contact" style={{ textDecoration: 'none' }}>
        <div style={{
          fontWeight: '700',
          fontSize: '1.2rem',
          color: '#ff5e3b',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          Let's Talk <span>→</span>
        </div>
      </Link>
    </motion.header>
  );
};

export default Header;
