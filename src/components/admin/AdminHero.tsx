"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AdminHero = () => {
  const [formData, setFormData] = useState<any>({
    line1: 'MAKE YOUR',
    line2: 'BRAND',
    line3: 'MEMORABLE',
    bottomTitle: 'BRAND\nNEW\nWAVES.',
    bottomDesc: 'We craft strategies that turn clicks into customers and campaigns into lasting brand stories.'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'content', 'hero'), formData);
      setMessage('Hero bölümü başarıyla güncellendi!');
    } catch (err) {
      console.error('Error saving hero data:', err);
      setMessage('Güncelleme sırasında bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1D6BFF', fontWeight: 'bold', fontSize: '1.5rem' }}>Hero (Üst Alan) Düzenle</h2>
      
      {message && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: message.includes('hata') ? '#ffecec' : '#ecffea', 
          color: message.includes('hata') ? '#d32f2f' : '#2e7d32', 
          marginBottom: '1.5rem', 
          borderRadius: '8px',
          fontWeight: '500'
        }}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        
        <div style={{ backgroundColor: '#f8faff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e1e8f5' }}>
          <h3 style={{ marginBottom: '1.2rem', color: '#333', fontWeight: 'bold' }}>Ana Dev Başlık (Tipografi)</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>1. Satır (Örn: MAKE YOUR)</label>
              <input 
                type="text" 
                name="line1" 
                value={formData.line1} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccd6e0', fontSize: '1.1rem' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>2. Satır (Örn: BRAND)</label>
              <input 
                type="text" 
                name="line2" 
                value={formData.line2} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccd6e0', fontSize: '1.1rem' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>3. Satır (Örn: MEMORABLE)</label>
              <input 
                type="text" 
                name="line3" 
                value={formData.line3} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccd6e0', fontSize: '1.1rem' }} 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Sol Alt Kalın Başlık (Alt satıra geçmek için Enter kullanın)</label>
            <textarea 
              name="bottomTitle" 
              value={formData.bottomTitle} 
              onChange={handleChange} 
              rows={3} 
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccd6e0', fontSize: '1rem', fontFamily: 'monospace' }}
              placeholder="BRAND&#10;NEW&#10;WAVES."
            ></textarea>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Sağ Alt İtalik Açıklama Metni</label>
            <textarea 
              name="bottomDesc" 
              value={formData.bottomDesc} 
              onChange={handleChange} 
              rows={3} 
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccd6e0', fontSize: '1rem' }}
            ></textarea>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <button 
            type="submit" 
            disabled={saving} 
            style={{ 
              width: '100%',
              padding: '1.2rem', 
              backgroundColor: saving ? '#ccc' : '#1D6BFF', 
              color: 'white', 
              fontWeight: 'bold', 
              fontSize: '1.1rem', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s shadow-md',
              boxShadow: '0 4px 12px rgba(29, 107, 255, 0.2)'
            }}
          >
            {saving ? 'GÜNCELLENİYOR...' : 'DEĞİŞİKLİKLERİ YAYINLA'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminHero;
