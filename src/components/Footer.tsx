"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1a6ff8',
      color: 'white',
      padding: '8rem 4rem 2rem 4rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Scalloped Border */}
      <div className="scalloped-top" style={{ filter: 'brightness(10)' }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Info Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', marginBottom: '8rem' }}>
          
          <div style={{ display: 'flex', gap: '6rem', flexWrap: 'wrap' }}>

          </div>
          

        </div>

        {/* Huge Text Section */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Small star above */}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             style={{ position: 'absolute', top: '-110px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px', zIndex: 1 }}
          >
             <svg viewBox="0 0 24 24" fill="#ffffff"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
          </motion.div>

          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            


            <h1 className="heading-font" style={{ 
              fontSize: '13.5vw', 
              margin: '0', 
              lineHeight: '0.8', 
              letterSpacing: '-5px', 
              whiteSpace: 'nowrap',
              textShadow: '0px 10px 30px rgba(0,0,0,0.1)',
              paddingTop: '3rem',
              color: 'white',
              position: 'relative',
              zIndex: 2
            }}>
              NİDA STUDIO
            </h1>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', fontSize: '0.9rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Terms & Conditions</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
          </div>
          <div style={{ fontWeight: '500' }}>
            All Right Reserved @Framerbite
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
