"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Quote = () => {
  return (
    <section style={{
      padding: '8rem 2rem',
      backgroundColor: '#ffffff',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: '60vh'
    }}>
      
      {/* Background Animated Pill Shapes - Scaled Down */}
      <motion.div
        animate={{ 
          rotate: [30, 35, 30],
          y: [-10, 10, -10]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '120px',
          height: '350px',
          backgroundColor: '#fadbf3',
          borderRadius: '75px',
          zIndex: 1,
          left: '35%',
          top: '5%'
        }}
      />

      <motion.div
        animate={{ 
          rotate: [-45, -50, -45],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '140px',
          height: '325px',
          backgroundColor: '#ffcff2',
          borderRadius: '75px',
          zIndex: 1,
          right: '35%',
          top: '20%'
        }}
      />
      
      <motion.div
        animate={{ 
          rotate: [-60, -55, -60],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '100px',
          height: '250px',
          backgroundColor: '#fcd3ef',
          borderRadius: '50px',
          zIndex: 1,
          left: '42%',
          bottom: '10%'
        }}
      />

      {/* Main Text */}
      <div className="heading-font" style={{
        position: 'relative',
        zIndex: 2,
        fontSize: '4.5vw',
        textAlign: 'center',
        lineHeight: '0.85',
        letterSpacing: '-2px',
        maxWidth: '1200px',
        color: '#1a1a1a'
      }}>
        WE CRAFT<br/>
        STRATEGIES THAT<br/>
        TURN INTO<br/>
        <span style={{ letterSpacing: '-3px' }}>CAMPAIGNS</span><br/>
        LASTING BRAND<br/>
        STORIES.
      </div>

    </section>
  );
};

export default Quote;
