"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';

const AdminPortfolio = () => {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    category: 'SEO',
    year: '2024',
    client: '',
    bgColor: '#fbc9e7',
    imageUrl: '',
    coverVideoUrl: '',
    textColor: 'black',
    overview: '',
    challenge: '',
    approach: '',
    stats: [
        { value: '', label: '' },
        { value: '', label: '' },
        { value: '', label: '' }
    ],
    media: [
        { type: 'image', url: '' }
    ]
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      let data: any[] = [];
      snapshot.forEach(document => data.push({ id: document.id, ...document.data() }));
      setWorks(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if(window.confirm('Bu işi silmek istediğinize emin misiniz?')) {
      await deleteDoc(doc(db, 'portfolio', id));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'portfolio', editingId), formData);
        alert('İş başarıyla güncellendi!');
      } else {
        await addDoc(collection(db, 'portfolio'), formData);
        alert('Yeni iş başarıyla eklendi!');
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Hata oluştu.');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
        title: '',
        category: 'SEO',
        year: '2024',
        client: '',
        bgColor: '#fbc9e7',
        imageUrl: '',
        coverVideoUrl: '',
        textColor: 'black',
        overview: '',
        challenge: '',
        approach: '',
        stats: [
            { value: '', label: '' },
            { value: '', label: '' },
            { value: '', label: '' }
        ],
        media: [
            { type: 'image', url: '' }
        ]
    });
  };

  const handleEdit = (work: any) => {
    setFormData(work);
    setEditingId(work.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const addMedia = () => {
    setFormData({ ...formData, media: [...formData.media, { type: 'image', url: '' }] });
  };

  const updateMedia = (index: number, field: string, value: string) => {
    const newMedia = [...formData.media];
    newMedia[index] = { ...newMedia[index], [field]: value };
    setFormData({ ...formData, media: newMedia });
  };

  const removeMedia = (index: number) => {
    setFormData({ ...formData, media: formData.media.filter((_: any, i: number) => i !== index) });
  };

  if(loading) return <div className="p-8 text-center text-xl font-bold">Yükleniyor...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1D6BFF', fontSize: '2rem', fontWeight: '900' }}>PORTFÖY YÖNETİMİ</h2>
        <button 
          onClick={() => { if(showForm) resetForm(); else setShowForm(true); }} 
          style={{ padding: '1rem 2rem', backgroundColor: showForm ? '#ff4b4b' : '#1D6BFF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
        >
          {showForm ? 'İPTAL' : '+ YENİ İŞ EKLE'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '24px', marginBottom: '4rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          <div style={{ gridColumn: 'span 2', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Temel Bilgiler</h3>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>İş Başlığı</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Kategori</label>
            <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Yıl</label>
            <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Müşteri (Client)</label>
            <input type="text" value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Liste Görseli URL (Kapak)</label>
            <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.4rem' }}>🖱️ Mouse üzerine gelince bu görsel gösterilir</p>
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="kapak" style={{ marginTop: '0.75rem', width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #eee' }} />
            )}
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Kart Video URL</label>
            <input type="text" value={formData.coverVideoUrl || ''} onChange={(e) => setFormData({...formData, coverVideoUrl: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} placeholder=".mp4 / .webm URL girin" />
            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.4rem' }}>▶️ Mouse yokken bu video otomatik oynar</p>
            {formData.coverVideoUrl && (
              <video src={formData.coverVideoUrl} muted loop autoPlay playsInline style={{ marginTop: '0.75rem', width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #eee' }} />
            )}
          </div>

          <div style={{ gridColumn: 'span 2', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem', marginTop: '2rem' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Detaylı İçerik</h3>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Proje Özeti (Overview)</label>
            <textarea rows={4} value={formData.overview} onChange={(e) => setFormData({...formData, overview: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Zorluklar (The Challenge)</label>
            <textarea rows={4} value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.8rem' }}>Yaklaşım (Our Approach)</label>
            <textarea rows={4} value={formData.approach} onChange={(e) => setFormData({...formData, approach: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '2rem' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>İstatistikler (Stats)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '12px' }}>
                    <input placeholder="Değer (Örn: +310%)" type="text" value={formData.stats[i]?.value} onChange={(e) => updateStat(i, 'value', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '0.5rem', fontWeight: 'bold' }} />
                    <textarea placeholder="Açıklama" rows={3} value={formData.stats[i]?.label} onChange={(e) => updateStat(i, 'label', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem' }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold' }}>Medya Galerisi (Görsel & Video)</label>
                <button type="button" onClick={addMedia} style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ Medya Ekle</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.media.map((m: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '12px' }}>
                    <select value={m.type} onChange={(e) => updateMedia(i, 'type', e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="image">Görsel</option>
                        <option value="video">Video</option>
                    </select>
                    <input placeholder="URL" type="text" value={m.url} onChange={(e) => updateMedia(i, 'url', e.target.value)} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <button type="button" onClick={() => removeMedia(i)} style={{ padding: '0.8rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Sil</button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" style={{ gridColumn: 'span 2', padding: '1.5rem', backgroundColor: '#1D6BFF', color: 'white', fontWeight: '900', fontSize: '1.2rem', border: 'none', borderRadius: '15px', cursor: 'pointer', marginTop: '2rem', boxShadow: '0 10px 20px rgba(29, 107, 255, 0.3)' }}>
            {editingId ? 'DEĞİŞİKLİKLERİ KAYDET' : 'PROJEYİ YAYINLA'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
        {works.map(work => (
          <div key={work.id} style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
            <div style={{ height: '200px', backgroundColor: work.bgColor || '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {work.imageUrl
                ? /\.(mp4|webm|ogg|mov)(\?|$)/i.test(work.imageUrl)
                  ? <video src={work.imageUrl} style={{ height: '70%', width: '70%', objectFit: 'contain' }} autoPlay muted loop playsInline />
                  : <img src={work.imageUrl} alt={work.title} style={{ height: '70%', width: '70%', objectFit: 'contain' }} />
                : null}
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', color: '#333' }}>{work.title}</h4>
                <span style={{ fontSize: '0.9rem', opacity: 0.6, fontWeight: 'bold' }}>{work.category} / {work.year}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(work)} style={{ padding: '0.6rem 1rem', background: '#f0f4ff', color: '#1D6BFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Düzenle</button>
                <button onClick={() => handleDelete(work.id)} style={{ padding: '0.6rem 1rem', background: '#ffecec', color: 'red', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Sil</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortfolio;
