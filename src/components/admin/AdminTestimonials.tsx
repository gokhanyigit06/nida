"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';

const AdminTestimonials = () => {
  const [yorumlar, setYorumlar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    quote: '',
    text: '',
    name: '',
    title: '',
    imageUrl: '/avatar_1.png'
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      let data: any[] = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setYorumlar(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if(window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      await deleteDoc(doc(db, 'testimonials', id));
    }
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'testimonials'), formData);
      setShowForm(false);
      setFormData({ quote: '', text: '', name: '', title: '', imageUrl: '/avatar_1.png' });
    } catch (err) {
      console.error(err);
      alert('Yükleme sırasında hata oluştu.');
    }
  };

  if(loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1a6ff8' }}>Yorumlar Yönetimi</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '0.8rem 1.5rem', backgroundColor: showForm ? '#ccc' : '#e2f638', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          {showForm ? 'İptal Et' : '+ Yeni Yorum Ekle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>İsim Soyisim</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Unvan / Şirket</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Başlık (Büyük Harfli Spot Cümle)</label>
            <input type="text" required value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Uzun Yorum Metni</label>
            <textarea required value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} rows={4} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}></textarea>
          </div>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Görsel URL</label>
            <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ padding: '1rem', backgroundColor: '#1a6ff8', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>KAYDET</button>
        </form>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {yorumlar.length === 0 ? <p>Henüz hiç yorum eklenmemiş.</p> : null}
        {yorumlar.map(y => (
          <div key={y.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{y.name} <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'normal' }}>- {y.title}</span></h3>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontStyle: 'italic' }}>{y.quote}</p>
              <p style={{ margin: 0, color: '#444' }}>{y.text}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <button onClick={() => handleDelete(y.id)} style={{ padding: '0.5rem 1rem', background: '#ffecec', color: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer', height: 'fit-content' }}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
