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
    <section id="works" className="px-6 py-16 md:px-16 md:py-24 bg-[#fbf8f1]">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="heading-font text-[3.5rem] md:text-[5.5rem] leading-[0.85] tracking-[-0.03em] m-0 lowercase">
          OUR FEATURED<br/>WORKS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {works.map((work, index) => (
          <motion.div 
            key={work.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="rounded-[40px] p-8 md:p-12 relative overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-between"
            style={{ 
                backgroundColor: work.bgColor || '#fbc9f2',
                color: work.textColor || '#000'
            }}
          >
            {/* Top Label */}
            <div className="flex justify-between font-bold text-lg md:text-xl">
              <span>({index + 1})</span>
              <span className="opacity-70">{work.category} / {work.year}</span>
            </div>

            {/* Laptop Mockup Area */}
            <div className="w-full h-[300px] md:h-[400px] bg-white rounded-[32px] my-8 flex items-center justify-center overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
              <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
            </div>

            {/* Bottom Info */}
            <div className="flex justify-between items-end">
              <h3 className="heading-font text-4xl md:text-6xl m-0 leading-tight">{work.title}</h3>
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-2xl md:text-3xl cursor-pointer hover:rotate-45 transition-transform shadow-lg"
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
