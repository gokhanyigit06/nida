/**
 * Nida Studio — Firestore & Storage veri katmanı
 * Tüm admin ve public sayfalar bu hook'ları kullanır.
 */
import { db, storage } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  QuerySnapshot,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// ── Tipler ────────────────────────────────────────────────────

export type Work = {
  id: string;
  title: string;
  category: string;
  year: string;
  videoUrl: string;   // Firebase Storage URL
  thumbUrl: string;   // Opsiyonel thumbnail
  visible: boolean;
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type SiteContent = {
  heroTitle: string;
  heroSub: string;
  marquee: string;
  heroVideo: string;
  stat1: string;
  stat2: string;
  stat3: string;
  stat4: string;
};

export type AboutContent = {
  heroDesc: string;
  storyTitle: string;
  storyDesc: string;
  teamTitle: string;
  clientsDesc: string;
  yearRange: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  address: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  tags: string;
  order: number;
};

// ── WORKS ─────────────────────────────────────────────────────

export const worksCollection = collection(db, "works");

export async function getWorks(): Promise<Work[]> {
  const q = query(worksCollection, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Work));
}

export function subscribeWorks(cb: (works: Work[]) => void) {
  const q = query(worksCollection, orderBy("order", "asc"));
  return onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Work)));
  });
}

export async function addWork(data: Omit<Work, "id">): Promise<string> {
  const ref = await addDoc(worksCollection, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return ref.id;
}

export async function updateWork(id: string, data: Partial<Work>) {
  await updateDoc(doc(db, "works", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteWork(id: string) {
  await deleteDoc(doc(db, "works", id));
}

// ── SITE CONTENT (anasayfa metinleri) ─────────────────────────

export async function getSiteContent(): Promise<SiteContent | null> {
  const snap = await getDoc(doc(db, "siteConfig", "homepage"));
  return snap.exists() ? (snap.data() as SiteContent) : null;
}

export async function setSiteContent(data: SiteContent) {
  await setDoc(doc(db, "siteConfig", "homepage"), { ...data, updatedAt: serverTimestamp() });
}

// ── ABOUT (hakkımızda) ────────────────────────────────────────

export async function getAboutContent(): Promise<AboutContent | null> {
  const snap = await getDoc(doc(db, "siteConfig", "about"));
  return snap.exists() ? (snap.data() as AboutContent) : null;
}

export async function setAboutContent(data: AboutContent) {
  await setDoc(doc(db, "siteConfig", "about"), { ...data, updatedAt: serverTimestamp() });
}

// ── CONTACT INFO (iletişim bilgileri) ─────────────────────────

export async function getContactInfo(): Promise<ContactInfo | null> {
  const snap = await getDoc(doc(db, "siteConfig", "contact"));
  return snap.exists() ? (snap.data() as ContactInfo) : null;
}

export async function setContactInfo(data: ContactInfo) {
  await setDoc(doc(db, "siteConfig", "contact"), { ...data, updatedAt: serverTimestamp() });
}

// ── SERVICES (hizmetler) ──────────────────────────────────────

export const servicesCollection = collection(db, "services");

export async function getServices(): Promise<Service[]> {
  const q = query(servicesCollection, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
}

export async function addService(data: Omit<Service, "id">) {
  await addDoc(servicesCollection, { ...data, createdAt: serverTimestamp() });
}

export async function updateService(id: string, data: Partial<Service>) {
  await updateDoc(doc(db, "services", id), data);
}

export async function deleteService(id: string) {
  await deleteDoc(doc(db, "services", id));
}

// ── HIZMETLER CONFIG (CTA bölümü) ────────────────────────────

export type HizmetlerConfig = {
  ctaTitle: string;
  ctaButton: string;
};

export async function getHizmetlerConfig(): Promise<HizmetlerConfig | null> {
  const snap = await getDoc(doc(db, "siteConfig", "hizmetler"));
  return snap.exists() ? (snap.data() as HizmetlerConfig) : null;
}

export async function setHizmetlerConfig(data: HizmetlerConfig) {
  await setDoc(doc(db, "siteConfig", "hizmetler"), { ...data, updatedAt: serverTimestamp() });
}


// ── STORAGE — Video / Görsel yükleme ─────────────────────────

export type UploadProgress = { progress: number; url?: string; error?: string };

/**
 * Firebase Storage'a dosya yükler.
 * @param file  Yüklenecek File nesnesi
 * @param path  Storage yolu (örn: "works/lune.mp4")
 * @param onProgress  İlerleme callback'i (0-100)
 */
export function uploadFile(
  file: File,
  path: string,
  onProgress: (p: UploadProgress) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress({ progress });
      },
      (error) => {
        onProgress({ progress: 0, error: error.message });
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onProgress({ progress: 100, url });
        resolve(url);
      }
    );
  });
}

export async function deleteFile(path: string) {
  await deleteObject(ref(storage, path));
}
