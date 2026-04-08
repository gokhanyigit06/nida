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
    <section id="testimonials" className="site-px py-20 md:py-32 bg-[#fcd3ef] relative overflow-hidden">
      
      {/* Scalloped Border Overlay */}
      <div className="scalloped-top brightness-[10] absolute top-0 left-0 w-full h-8 z-10" />

      <div className="text-center mb-16 md:mb-24">
        <h2 className="heading-font text-[3.5rem] md:text-[5.5rem] leading-[0.85] tracking-[-0.03em] m-0 lowercase">
          TRUSTED BY<br/>GROWING BRANDS
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto relative px-4">
         <AnimatePresence mode="wait">
            <motion.div 
               key={currentIndex}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               className="text-center"
            >
               <h3 className="heading-font text-3xl md:text-5xl text-black mb-10 md:mb-16 leading-tight italic">
                "{testimonials[currentIndex].quote}"
               </h3>
               
               <p className="text-lg md:text-2xl leading-relaxed font-medium text-gray-800 max-w-[900px] mx-auto mb-12 md:mb-16 opacity-80">
                {testimonials[currentIndex].text}
               </p>

               <div className="flex flex-col items-center gap-4">
                 <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white p-1 shadow-2xl overflow-hidden">
                    <img src={testimonials[currentIndex].imageUrl} alt={testimonials[currentIndex].name} className="w-full h-full object-cover rounded-full" />
                 </div>
                 <div className="text-center">
                    <div className="font-archivo-black text-xl md:text-2xl uppercase tracking-tighter">{testimonials[currentIndex].name}</div>
                    <div className="text-base md:text-lg opacity-60 font-bold uppercase tracking-widest mt-1">{testimonials[currentIndex].title}</div>
                 </div>
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Navigation Arrows */}
         <div className="flex justify-center gap-6 mt-16 md:mt-24">
           <button 
             onClick={prev} 
             className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
           >
             ←
           </button>
           <button 
             onClick={next} 
             className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
           >
             →
           </button>
         </div>
      </div>

    </section>
  );
};

export default Testimonials;
