"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Gallery data with all photos organized by folder
const GALLERY_DATA: Record<string, string[]> = {
  "beautiful you": [
    "BBYA7929.JPG",
    "CWJR7476 - Copy.JPG",
    "DITM2535.JPG",
    "DXZL6955.JPG",
    "EEDU6924.JPG",
    "ELOW1136.JPG",
    "FDSJ4195.JPG",
    "FUPJ7691.JPG",
    "GONI9465.JPG",
    "HXJJ2096.JPG",
    "IMG_0682.PNG",
    "IMG_1336.PNG",
    "JVJN4928.JPG",
    "KHQL8916.JPG",
    "QRQU8270.JPG",
    "SGZJ8886.JPG",
    "UGGA0878.JPG",
    "WHXK0936.JPG",
    "WQNA8846.JPG",
  ],
  "gwallior": [
    "CDMW1218.JPG",
    "DNRS5428.JPG",
    "IYOB7944.JPG",
    "JZGL9883.JPG",
    "MBNI7257.JPG",
    "TKMJ4984.JPG",
    "UNEB9833.JPG",
    "VXOS5212.JPG",
  ],
  "mumbai trip": [
    "BHES3570 - Copy.JPG",
    "CTQX3669 - Copy.JPG",
    "CXNW9812 - Copy.JPG",
    "EMNA1130 - Copy.JPG",
    "IFNI0864 - Copy.JPG",
    "IUFH2697 - Copy.JPG",
    "JCVE2583 - Copy.JPG",
    "JYCH5579 - Copy.JPG",
    "JZGL9883 - Copy.JPG",
    "KZPW0592 - Copy.JPG",
    "LERC6640 - Copy.JPG",
    "LGJU0251 - Copy.JPG",
    "NAAE3793 - Copy.JPG",
    "NGVK0971 - Copy.JPG",
    "NINH5051 - Copy.JPG",
    "NJBZ3377 - Copy.JPG",
    "RBMG2088 - Copy.JPG",
    "RVJR9762 - Copy.JPG",
    "TFCQ9257 - Copy.JPG",
    "VFZJ0941 - Copy.JPG",
    "VKAU9687 - Copy.JPG",
    "WRMM5114 - Copy.JPG",
    "WRMM5114.JPG",
    "XDXZ4782.JPG",
    "XZTU4526.JPG",
    "YGDI6889.JPG",
  ],
  "vindavan": [
    "CMCV0223.JPG",
    "EMJD0052.JPG",
    "GBQI6929.JPG",
    "HUTV1243.JPG",
    "OXVU4787.JPG",
    "PKUC7118.JPG",
  ],
};

interface PhotoItem {
  src: string;
  alt: string;
  folder: string;
}

export default function MemoriesPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const allPhotos: PhotoItem[] = [];
      Object.entries(GALLERY_DATA).forEach(([folder, files]) => {
        files.forEach((file) => {
          if (file.toUpperCase().endsWith(".JPG") || file.toUpperCase().endsWith(".PNG")) {
            allPhotos.push({
              src: `/assets/images/${folder}/${file}`,
              alt: file.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "").replace("Copy", "").trim(),
              folder,
            });
          }
        });
      });

      // Shuffle array  
      for (let i = allPhotos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPhotos[i], allPhotos[j]] = [allPhotos[j], allPhotos[i]];
      }

      setPhotos(allPhotos);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((lightboxIndex + 1) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, photos.length]);

  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif gold-text mb-3"
          >
            Our Memories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg"
          >
            Every moment with you is a treasure
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="polaroid-card animate-pulse"
                style={{
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                }}
              >
                <div className="polaroid-photo bg-gray-800/50" />
                <div className="polaroid-caption h-4 bg-gray-700/30 rounded mt-2" />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0, rotate: Math.random() * 20 - 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: Math.random() * 6 - 3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.02,
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.2 }
                }}
                className="polaroid-card cursor-pointer group"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="polaroid-photo relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity shine-effect" />
                  
                  {/* Magnifying glass icon on hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </motion.div>

                  {/* Corner accent */}
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-500/30" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-500/30" />
                </div>
                
                <div className="polaroid-caption">
                  <p className="text-xs md:text-sm text-gray-600 handwriting truncate">
                    {photo.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Polaroid frame */}
              <div className="polaroid-card mx-auto" style={{ transform: "rotate(0deg)" }}>
                <div className="polaroid-photo relative" style={{ height: "60vh", maxHeight: "600px" }}>
                  <img
                    src={photos[lightboxIndex].src}
                    alt={photos[lightboxIndex].alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="polaroid-caption"
                >
                  <p className="text-base md:text-lg text-gray-700 handwriting text-center">
                    {photos[lightboxIndex].alt}
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    {photos[lightboxIndex].folder} • {lightboxIndex + 1} of {photos.length}
                  </p>
                </motion.div>
              </div>

              {/* Navigation buttons */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-900/30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-900/30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-4 right-0 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-900/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Keyboard hints */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-gold-400/60 text-xs"
              >
                <span>← →  Navigate</span>
                <span>ESC  Close</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
