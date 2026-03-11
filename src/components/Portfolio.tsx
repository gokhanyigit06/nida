"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Portfolio = () => {
    const [works, setWorks] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "portfolio"), (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorks(items);
        });
        return () => unsubscribe();
    }, []);

  return (
    <section id="works" style={{
      padding: '6rem 4rem',
      backgroundColor: '#fbf8f1'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="heading-font" style={{ fontSize: '5.5rem', lineHeight: '0.85', letterSpacing: '-2px' }}>
          OUR FEATURED<br/>WORKS
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2.5rem'
      }}>
        {works.map((work, index) => (
          <motion.div 
            key={work.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              borderRadius: '40px',
              padding: '2.5rem',
              backgroundColor: work.bgColor || '#fbc9f2',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '550px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: work.textColor || '#000'
            }}
          >
            {/* Top Label */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
              <span>({index + 1})</span>
              <span>{work.category} / {work.year}</span>
            </div>

            {/* Laptop Mockup Area */}
            <div style={{
              width: '100%',
              height: '350px',
              backgroundColor: 'white',
              borderRadius: '24px',
              margin: '2rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <img src={work.imageUrl} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Bottom Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h3 className="heading-font" style={{ fontSize: '3rem', margin: 0 }}>{work.title}</h3>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ↗
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
