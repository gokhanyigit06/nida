"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

type MediaItem = {
  id: string;
  name: string;
  type: "video" | "image";
  size: string;
  url: string;
  storagePath: string;
  date: string;
};

const FILTERS = ["Tümü", "Video", "Görsel"];

export default function AdminMedya() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState("Tümü");
  const [copied, setCopied] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadName, setUploadName] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Firestore'dan medya listesini çek
  const fetchMedia = async () => {
    try {
      const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const items: MediaItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MediaItem, "id">),
      }));
      setMedia(items);
    } catch (err) {
      console.error("Medya yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const filtered =
    filter === "Tümü"
      ? media
      : media.filter((m) =>
          filter === "Video" ? m.type === "video" : m.type === "image"
        );

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video");
    const isImage = file.type.startsWith("image");
    if (!isVideo && !isImage) {
      alert("Sadece video veya görsel dosyaları desteklenmektedir.");
      return;
    }

    const storagePath = `media/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setUploadProgress(0);
    setUploadName(file.name);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(pct);
      },
      (error) => {
        console.error("Yükleme hatası:", error);
        alert("Yükleme başarısız: " + error.message);
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const sizeInMB = (file.size / 1024 / 1024).toFixed(1);
          const now = new Date();
          const dateStr = now.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          await addDoc(collection(db, "media"), {
            name: file.name,
            type: isVideo ? "video" : "image",
            size: `${sizeInMB} MB`,
            url,
            storagePath,
            date: dateStr,
            createdAt: Timestamp.now(),
          });

          await fetchMedia();
        } catch (err) {
          console.error("Firestore kayıt hatası:", err);
          alert("Dosya yüklendi fakat kaydedilemedi.");
        } finally {
          setUploading(false);
          setUploadProgress(0);
          setUploadName("");
          if (inputRef.current) inputRef.current.value = "";
        }
      }
    );
  };

  const deleteItem = async (item: MediaItem) => {
    if (!confirm(`"${item.name}" silinsin mi?`)) return;
    setDeletingId(item.id);
    try {
      // Storage'dan sil
      const storageRef = ref(storage, item.storagePath);
      await deleteObject(storageRef).catch(() => {
        // Eğer Storage'da bulunamazsa sessizce geç
      });
      // Firestore'dan sil
      await deleteDoc(doc(db, "media", item.id));
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("Silme işlemi başarısız.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-semibold text-black tracking-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Medya
          </h1>
          <p
            className="text-sm text-black/45 mt-0.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {loading ? "Yükleniyor…" : `${media.length} dosya`}
          </p>
        </div>

        <label
          className={`bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer select-none ${
            uploading ? "opacity-50 pointer-events-none" : "hover:bg-black/80"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {uploading ? `Yükleniyor… %${uploadProgress}` : "+ Dosya Yükle"}
          <input
            ref={inputRef}
            type="file"
            accept="video/*,image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Upload progress bar */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-5 bg-white border border-black/8 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium text-black truncate max-w-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {uploadName}
              </span>
              <span
                className="text-xs text-black/40 ml-4 shrink-0"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                %{uploadProgress}
              </span>
            </div>
            <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filtre */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              filter === f
                ? "bg-black text-white"
                : "bg-white text-black/50 border border-black/10 hover:text-black"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Medya listesi */}
      <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
        <div
          className="grid grid-cols-[auto_1fr_80px_140px_120px_80px] gap-4 px-5 py-3 border-b border-black/8 text-xs font-semibold text-black/40 uppercase tracking-wider"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>Tür</span>
          <span>Dosya</span>
          <span>Boyut</span>
          <span>URL</span>
          <span>Tarih</span>
          <span className="text-right">İşlem</span>
        </div>

        {loading ? (
          <div
            className="text-center py-16 text-sm text-black/30"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Medya yükleniyor…
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 text-sm text-black/30"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Bu türde dosya bulunamadı.
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[auto_1fr_80px_140px_120px_80px] gap-4 items-center px-5 py-4 border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors"
              >
                {/* Tür ikonu */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    item.type === "video"
                      ? "bg-black text-white"
                      : "bg-black/8 text-black"
                  }`}
                >
                  {item.type === "video" ? "▶" : "◻"}
                </div>

                <span
                  className="text-sm font-medium text-black truncate"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.name}
                </span>

                <span
                  className="text-xs text-black/40"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.size}
                </span>

                <button
                  onClick={() => copyUrl(item.id, item.url)}
                  className={`text-xs font-medium transition-colors text-left truncate ${
                    copied === item.id
                      ? "text-green-500"
                      : "text-black/40 hover:text-black"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {copied === item.id ? "✓ Kopyalandı!" : "URL Kopyala"}
                </button>

                <span
                  className="text-xs text-black/35"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.date}
                </span>

                <button
                  onClick={() => deleteItem(item)}
                  disabled={deletingId === item.id}
                  className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors text-right disabled:opacity-40"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {deletingId === item.id ? "Siliniyor…" : "Sil"}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <p
        className="text-xs text-black/30 mt-4"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Yüklenen dosyalar Firebase Storage'a kaydedilir ve kalıcı olarak
        saklanır.
      </p>
    </div>
  );
}
