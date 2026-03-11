"use client";
import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (!user && pathname !== '/admin/login') {
    return null; // Will redirect in useEffect
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#f4f4f4] text-black">
      {/* Sidebar */}
      <div className="w-64 bg-white p-8 border-r border-gray-200 flex flex-col">
        <h2 className="heading-font text-[#1a6ff8] text-2xl mb-8">ADMIN Paneli</h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link 
            href="/admin" 
            className={`font-bold p-3 rounded-lg transition-colors ${pathname === '/admin' ? 'bg-[#f4f4f4] text-[#1a6ff8]' : 'hover:bg-gray-50'}`}
          >
            🏠 Ana Sayfa
          </Link>
          <Link 
            href="/admin/hero" 
            className={`font-bold p-3 rounded-lg transition-colors ${pathname === '/admin/hero' ? 'bg-[#f4f4f4] text-[#1a6ff8]' : 'hover:bg-gray-50'}`}
          >
            🚀 Hero Alanı
          </Link>
          <Link 
            href="/admin/portfolio" 
            className={`font-bold p-3 rounded-lg transition-colors ${pathname === '/admin/portfolio' ? 'bg-[#f4f4f4] text-[#1a6ff8]' : 'hover:bg-gray-50'}`}
          >
            🎨 Portföy İşleri
          </Link>
          <Link 
            href="/admin/testimonials" 
            className={`font-bold p-3 rounded-lg transition-colors ${pathname === '/admin/testimonials' ? 'bg-[#f4f4f4] text-[#1a6ff8]' : 'hover:bg-gray-50'}`}
          >
            💬 Yorumlar
          </Link>
        </nav>
        <button 
          onClick={handleLogout} 
          className="p-4 bg-[#ff5e3b] text-white border-none rounded-lg font-bold cursor-pointer hover:bg-[#e45131] transition-colors"
        >
          Güvenli Çıkış
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-12 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
