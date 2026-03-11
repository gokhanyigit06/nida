"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "testimonials"), (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTestimonials(items);
        });
        return () => unsubscribe();
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" style={{
      padding: '8rem 4rem',
      backgroundColor: '#fcd3ef',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Wave Divider Placeholder */}
      <div className="scalloped-top" style={{ filter: 'brightness(10)' }}></div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="heading-font" style={{ fontSize: '5.5rem', lineHeight: '0.85', letterSpacing: '-2px' }}>
          TRUSTED BY<br/>GROWING BRANDS
        </h2>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
         <AnimatePresence mode="wait">
            <motion.div 
               key={currentIndex}
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -100 }}
               style={{ textAlign: 'center' }}
            >
               <h3 className="heading-font" style={{ fontSize: '3rem', color: '#1a1a1a', marginBottom: '2rem' }}>
                "{testimonials[currentIndex].quote}"
               </h3>
               <p style={{ fontSize: '1.4rem', lineHeight: '1.6', fontWeight: '500', color: '#333', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                {testimonials[currentIndex].text}
               </p>

               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', overflow: 'hidden' }}>
                    <img src={testimonials[currentIndex].imageUrl} alt={testimonials[currentIndex].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>{testimonials[currentIndex].name}</div>
                    <div style={{ opacity: 0.6, fontWeight: '600' }}>{testimonials[currentIndex].title}</div>
                 </div>
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Navigation Arrows */}
         <div style={{ 
            position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between',
            transform: 'translateY(-50%)', pointerEvents: 'none'
         }}>
           <button onClick={prev} style={{ pointerEvents: 'auto', background: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>←</button>
           <button onClick={next} style={{ pointerEvents: 'auto', background: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>→</button>
         </div>
      </div>

    </section>
  );
};

export default Testimonials;
