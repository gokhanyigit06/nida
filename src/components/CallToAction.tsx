"use client";
import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '8rem 2rem 6rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      
      {/* Decorative Scribbles & Shapes */}
      {/* Top Left Scribble */}
      <div style={{ position: 'absolute', top: '15%', left: '15%', opacity: 0.9 }}>
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-10deg)' }}>
          <path d="M10 50 Q 20 20 40 40 T 70 20" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M20 70 L 40 80 M 30 90 L 50 70 M 60 85 L 75 60" stroke="black" strokeWidth="4" strokeLinecap="round" />
          <polygon points="50,40 70,80 30,80" fill="#ffb6e6" transform="translate(10, -20) rotate(30 50 60)" />
        </svg>
      </div>

      {/* Top Right Scribble */}
      <div style={{ position: 'absolute', top: '15%', right: '15%', opacity: 0.9 }}>
         <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(20deg)' }}>
           <path d="M20 50 Q 50 10 80 50" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
           <path d="M40 80 L 40 20 M 30 30 L 70 70 M 70 30 L 30 70" stroke="black" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
         </svg>
      </div>
      
      {/* Phone Icon Bottom Right */}
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', transform: 'rotate(-25deg) scale(0.8)' }}>
        <svg width="60" height="90" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
           {/* Phone body */}
           <rect x="5" y="5" width="30" height="50" rx="2" fill="#000000" />
           <rect x="5" y="5" width="30" height="50" rx="2" stroke="black" strokeWidth="2" />
           {/* Screen */}
           <rect x="8" y="8" width="24" height="20" fill="white" />
           <rect x="8" y="8" width="24" height="20" stroke="black" strokeWidth="1.5" />
           {/* Buttons */}
           <rect x="10" y="32" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="17.5" y="32" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="25" y="32" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="10" y="38" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="17.5" y="38" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="25" y="38" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="10" y="44" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="17.5" y="44" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
           <rect x="25" y="44" width="5" height="4" fill="white" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom Left scribbles */}
      <div style={{ position: 'absolute', bottom: '15%', left: '15%', opacity: 0.9 }}>
        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-10deg)' }}>
          <path d="M5 10 Q 10 30 30 25" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M5 30 Q 15 45 40 40" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Branding Orange Cloud */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '35%',
          left: '5%',
          zIndex: 2
        }}
      >
        <div style={{ position: 'relative', width: '220px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Worm/Cloud overlapping SVG */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} viewBox="0 0 220 80" preserveAspectRatio="none">
                <rect x="30" y="15" width="160" height="50" fill="#ff5e3b" />
                <circle cx="35" cy="40" r="30" fill="#ff5e3b" />
                <circle cx="72.5" cy="40" r="30" fill="#ff5e3b" />
                <circle cx="110" cy="40" r="30" fill="#ff5e3b" />
                <circle cx="147.5" cy="40" r="30" fill="#ff5e3b" />
                <circle cx="185" cy="40" r="30" fill="#ff5e3b" />
            </svg>
            <span style={{ color: 'white', fontFamily: "var(--font-archivo-black)", fontSize: '1.2rem', letterSpacing: '1px' }}>BRANDING</span>
        </div>
      </motion.div>

      {/* Marketing Green Cloud */}
      <motion.div
        animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          zIndex: 2
        }}
      >
        <div style={{ position: 'relative', width: '220px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} viewBox="0 0 220 80" preserveAspectRatio="none">
                <rect x="30" y="15" width="160" height="50" fill="#32c56a" />
                <circle cx="35" cy="40" r="30" fill="#32c56a" />
                <circle cx="72.5" cy="40" r="30" fill="#32c56a" />
                <circle cx="110" cy="40" r="30" fill="#32c56a" />
                <circle cx="147.5" cy="40" r="30" fill="#32c56a" />
                <circle cx="185" cy="40" r="30" fill="#32c56a" />
            </svg>
            <span style={{ color: 'white', fontFamily: "var(--font-archivo-black)", fontSize: '1.2rem', letterSpacing: '1px' }}>MARKETING</span>
        </div>
      </motion.div>


      <h2 className="heading-font" style={{
        fontSize: '8vw',
        lineHeight: '0.8',
        margin: '0 0 2rem 0',
        letterSpacing: '-4px',
        color: '#1a1a1a',
        position: 'relative',
        zIndex: 5
      }}>
        LET'S GROW BRAND<br/>TOGETHER
      </h2>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          backgroundColor: '#fadbf3',
          border: 'none',
          padding: '1.2rem 3rem',
          borderRadius: '50px',
          fontWeight: '700',
          fontSize: '1.4rem',
          color: '#1a1a1a',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 5,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          letterSpacing: '-1px'
        }}
      >
        Get Started <span>→</span>
      </motion.button>
      
    </section>
  );
};

export default CallToAction;
