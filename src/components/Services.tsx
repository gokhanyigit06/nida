"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <section id="services" style={{
      padding: '6rem 4rem',
      backgroundColor: '#ffffff',
      color: '#000',
      position: 'relative'
    }}>
      {/* Top row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4rem'
      }}>
        {/* Left: Title + Floating Badge */}
        <div style={{ position: 'relative', flex: 1 }}>
           {/* Floating Bone Badge */}
           <motion.div 
             initial={{ rotate: -10 }}
             animate={{ rotate: 10 }}
             transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
             style={{
               position: 'absolute',
               top: '-40px',
               right: '100px',
               backgroundColor: '#ff5e3b',
               color: 'white',
               fontFamily: "var(--font-archivo-black)",
               padding: '10px 20px',
               borderRadius: '30px',
               transform: 'rotate(15deg)',
               zIndex: 2,
               boxShadow: '0 5px 15px rgba(255, 94, 59, 0.4)'
             }}
           >
             SERVICES
           </motion.div>
           
           <h2 className="heading-font" style={{ 
             fontSize: '5rem', 
             lineHeight: '0.8', 
             letterSpacing: '-2px',
             margin: 0
           }}>
             SERVICES WE<br/>PROVIDE
           </h2>
        </div>

        {/* Right: Description + Button */}
        <div style={{ flex: 1, maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            fontWeight: '500',
            color: '#333'
          }}>
            Discover the full range of marketing services designed to grow your brand and maximize performance.
          </p>
          <button style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            padding: '16px 36px',
            borderRadius: '99px',
            fontSize: '1.2rem',
            fontWeight: '800',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}>
            All Services <span>→</span>
          </button>
        </div>
      </div>

      {/* Cards Row */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        
        {/* Card 1: SEO Digital Strategy */}
        <div style={{
          flex: 1,
          background: '#f9dfba',
          borderRadius: '40px',
          padding: '3rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 className="heading-font" style={{ fontSize: '2.5rem', lineHeight: '0.9', marginBottom: '1.5rem', zIndex: 2 }}>
            SEO DIGITAL<br/>STRATEGY
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '500', zIndex: 2, maxWidth: '80%' }}>
            We craft customized marketing roadmaps that align with your goals — blending research, creativity.
          </p>
          <img 
            src="/seo_robot.png" 
            alt="SEO Robot" 
            style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              right: '10px', 
              width: '250px',
              zIndex: 1,
              mixBlendMode: 'multiply'
            }} 
          />
        </div>

        {/* Card 2: Branding & Creative Design */}
        <div style={{
          flex: 1,
          backgroundColor: '#e6ff67',
          borderRadius: '40px',
          padding: '3rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 className="heading-font" style={{ fontSize: '2.5rem', lineHeight: '0.9', marginBottom: '1.5rem', zIndex: 2 }}>
            BRANDING &<br/>CREATIVE DESIGN
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '500', zIndex: 2, maxWidth: '80%' }}>
            Brand identity that stands out. From logo to visual storytelling, we bring your brand's personality to life.
          </p>
          <img 
            src="/branding_robot.png" 
            alt="Branding Robot" 
            style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              right: '10px', 
              width: '250px',
              zIndex: 1,
              mixBlendMode: 'multiply'
            }} 
          />
        </div>

      </div>

    </section>
  );
};

export default Services;
