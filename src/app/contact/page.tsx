"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const defaultData = {
  email: "hello@zentragency.com",
  phone: "+1 (234) 567-8900",
  hoursLine1: "Mon–Fri: 9:00 AM – 6:00 PM",
  hoursLine2: "Sat–Sun: Closed",
  heading: "REACH US\nDIRECTLY",
  subtext: "Tell us about your goals, challenges, and ideas — and we'll help you turn them into results.",
};

const ContactPage = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "siteConfig", "contact"));
        if (snap.exists()) {
          setData({ ...defaultData, ...snap.data() });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const headingLines = data.heading.split('\n');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[38vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        <motion.h1 
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-[10vw] md:text-[8vw] text-white font-normal uppercase leading-none select-none tracking-tight"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          LET'S TALK
        </motion.h1>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-1">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-[40px] text-white fill-current">
            <path d="M0,0 C150,0 150,100 300,100 C450,100 450,0 600,0 C750,0 750,100 900,100 C1050,100 1050,0 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-6xl mx-auto px-8 py-16 md:px-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-[8vw] md:text-[4.2rem] font-semibold leading-[1.1] text-black uppercase tracking-tight">
                {headingLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < headingLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-lg md:text-xl text-[#2D2D2D]/60 max-w-md font-medium leading-relaxed">
                {data.subtext}
              </p>
            </div>

            <div className="space-y-8">
              <div className="group transition-all">
                <h3 className="text-xl font-semibold text-black uppercase mb-1 tracking-tight">Email</h3>
                <a href={`mailto:${data.email}`} className="text-lg md:text-xl text-[#2D2D2D]/80 hover:text-black transition-all font-medium border-b border-transparent hover:border-black">
                  {data.email}
                </a>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black uppercase mb-1 tracking-tight">Phone</h3>
                <a href={`tel:${data.phone}`} className="text-lg md:text-xl text-[#2D2D2D]/80 hover:text-black transition-all font-medium">
                  {data.phone}
                </a>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black uppercase mb-1 tracking-tight">Hours</h3>
                <p className="text-lg md:text-xl text-[#2D2D2D]/80 font-medium leading-relaxed">
                  {data.hoursLine1}<br />
                  {data.hoursLine2}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="bg-[#FAF7F0] p-8 md:p-10 rounded-[40px] shadow-sm border border-black/[0.02]">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-base font-semibold text-[#2D2D2D]/70 ml-3">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Full name" 
                  className="w-full p-5 rounded-[25px] border-none bg-white text-lg placeholder:text-gray-200 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-semibold text-[#2D2D2D]/70 ml-3">Company</label>
                  <input 
                    type="text" 
                    placeholder="Company name" 
                    className="w-full p-5 rounded-[25px] border-none bg-white text-lg placeholder:text-gray-200 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-semibold text-[#2D2D2D]/70 ml-3">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="Phone number" 
                    className="w-full p-5 rounded-[25px] border-none bg-white text-lg placeholder:text-gray-200 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base font-semibold text-[#2D2D2D]/70 ml-3">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-5 rounded-[25px] border-none bg-white text-lg placeholder:text-gray-200 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-semibold text-[#2D2D2D]/70 ml-3">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Write your message" 
                  className="w-full p-5 rounded-[25px] border-none bg-white text-lg placeholder:text-gray-200 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-black text-white py-5 rounded-[25px] text-xl md:text-2xl font-bold tracking-tight flex items-center justify-center gap-3 shadow-xl hover:bg-gray-900 transition-all mt-4"
              >
                Let's Talk <span className="text-2xl md:text-3xl">→</span>
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
