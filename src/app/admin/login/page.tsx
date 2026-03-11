"use client";
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err) {
      setError('Geçersiz e-posta veya şifre.');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-[#f4f4f4]">
      <div className="bg-white p-12 rounded-xl shadow-2xl w-[400px]">
        <h2 className="heading-font text-center text-3xl mb-8 text-[#1a6ff8]">YÖNETİM PANELİ</h2>
        {error && <p className="text-red-500 text-center mb-4 font-bold">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="E-Posta" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a6ff8]" 
            required
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a6ff8]" 
            required
          />
          <button 
            type="submit" 
            className="p-4 rounded-lg border-none bg-[#e2f638] text-black font-bold text-lg cursor-pointer hover:bg-[#d4e634] transition-colors heading-font"
          >
            GİRİŞ YAP
          </button>
        </form>
      </div>
    </div>
  );
}
