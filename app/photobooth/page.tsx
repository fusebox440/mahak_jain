"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCamera } from "@/hooks/useCamera";
import { useFaceDetection } from "@/hooks/useFaceDetection";
import { FilterType, FILTERS, applyFilterToCanvas } from "@/utils/filters";
import {
  uploadToCloudinary,
  dataURLtoBlob,
  getDeviceInfo,
  getScreenSize,
} from "@/utils/cloudinary";

interface CapturedPhoto {
  id: string;
  dataURL: string;
  timestamp: Date;
  filter: FilterType;
}

export default function PhotoboothPage() {
  const {
    isActive,
    error: cameraError,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame,
    facing,
  } = useCamera();

  const { detectFace, detectSmile, reset: resetDetection } = useFaceDetection();

  const [selectedFilter, setSelectedFilter] = useState<FilterType>("natural");
  const [countdown, setCountdown] = useState<number>(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [gallery, setGallery] = useState<CapturedPhoto[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [previewFilter, setPreviewFilter] = useState<FilterType>("natural");

  const animationFrameRef = useRef<number | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start camera on mount and cleanup on unmount
  useEffect(() => {
    startCamera();
    
    return () => {
      // Stop camera
      stopCamera();
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Reset face detection
      resetDetection();
      
      // Clear preview canvas
      if (previewCanvasRef.current) {
        const ctx = previewCanvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
        }
      }
    };
  }, []);

  // Live preview with filter
  const updatePreview = useCallback(() => {
    if (!videoRef.current || !previewCanvasRef.current || !isActive) {
      animationFrameRef.current = requestAnimationFrame(updatePreview);
      return;
    }

    const video = videoRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx || video.readyState < 2) {
      animationFrameRef.current = requestAnimationFrame(updatePreview);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply selected filter to preview
    if (selectedFilter !== "natural") {
      applyFilterToCanvas(canvas, selectedFilter);
    }

    animationFrameRef.current = requestAnimationFrame(updatePreview);
  }, [isActive, selectedFilter]);

  useEffect(() => {
    if (isActive) {
      animationFrameRef.current = requestAnimationFrame(updatePreview);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, updatePreview]);

  // Warn before leaving with unsaved photo
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (capturedPhoto && !gallery.find(p => p.dataURL === capturedPhoto)) {
        e.preventDefault();
        e.returnValue = "You have an unsaved photo. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    // Add event listener for page unload
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [capturedPhoto, gallery]);

  // Handle page visibility - pause camera when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else if (isActive) {
        animationFrameRef.current = requestAnimationFrame(updatePreview);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, updatePreview]);

  const startCountdown = useCallback(() => {
    if (countdown > 0) return;

    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        setTimeout(() => {
          handleCapture();
          setCountdown(0);
        }, 100);
      }
    }, 1000);
  }, [countdown]);

  const handleCapture = useCallback(() => {
    const frame = captureFrame();
    if (!frame) return;

    // Apply filter to captured frame
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        applyFilterToCanvas(canvas, selectedFilter);
        const filteredDataURL = canvas.toDataURL("image/jpeg", 0.95);
        setCapturedPhoto(filteredDataURL);
        setPreviewFilter(selectedFilter);
      }
    };
    img.src = frame;

    resetDetection();
  }, [captureFrame, selectedFilter, resetDetection]);

  const handleRetake = () => {
    setCapturedPhoto(null);
    setPreviewFilter("natural");
    setUploadStatus("");
    resetDetection();
  };

  const handleSave = async () => {
    if (!capturedPhoto) return;

    const photo: CapturedPhoto = {
      id: Date.now().toString(),
      dataURL: capturedPhoto,
      timestamp: new Date(),
      filter: previewFilter,
    };

    setGallery((prev) => [...prev, photo]);
    setIsUploading(true);
    setUploadStatus("Uploading...");

    const blob = dataURLtoBlob(capturedPhoto);
    const metadata = {
      timestamp: new Date().toISOString(),
      device: getDeviceInfo(),
      screenSize: getScreenSize(),
      filter: previewFilter,
    };

    const result = await uploadToCloudinary(blob, metadata, (progress) => {
      setUploadProgress(progress);
    });

    setIsUploading(false);

    if (result.success) {
      setUploadStatus("✅ Uploaded successfully!");
      setTimeout(() => {
        setUploadStatus("");
        setCapturedPhoto(null);
      }, 2000);
    } else {
      setUploadStatus(`❌ Upload failed: ${result.error}`);
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  const handleDownload = () => {
    if (!capturedPhoto) return;

    try {
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filterName = previewFilter !== "natural" ? `_${previewFilter}` : "";
      link.download = `mahak-photobooth_${timestamp}${filterName}.jpg`;
      link.href = capturedPhoto;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      setUploadStatus("✓ Photo downloaded successfully!");
      setTimeout(() => setUploadStatus(""), 2000);
    } catch (error) {
      console.error("Download failed:", error);
      setUploadStatus("❌ Download failed. Please try again.");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  const handleApplyFilterToPreview = (filter: FilterType) => {
    if (!capturedPhoto) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        applyFilterToCanvas(canvas, filter);
        setCapturedPhoto(canvas.toDataURL("image/jpeg", 0.95));
        setPreviewFilter(filter);
      }
    };
    img.src = capturedPhoto;
  };

  if (cameraError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-serif text-gold-400 mb-4">Camera Error</h2>
          <p className="text-dark-500 mb-6">{cameraError}</p>
          <button onClick={startCamera} className="btn-gold">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-3">
            Steal a Smile 📸
          </h1>
          <p className="text-dark-500">
            Tap the button and get ready for a 3-second countdown!
          </p>
        </motion.div>

        {/* Camera Preview */}
        <div className="relative aspect-[4/5] max-w-md mx-auto mb-6 rounded-3xl overflow-hidden glass-card">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover hidden"
            playsInline
            muted
            autoPlay
          />
          <canvas
            ref={previewCanvasRef}
            className={`absolute inset-0 w-full h-full object-cover ${
              capturedPhoto ? "hidden" : "block"
            }`}
          />
          <canvas ref={canvasRef} className="hidden" />

          {capturedPhoto && (
            <img
              src={capturedPhoto}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Countdown Overlay */}
          <AnimatePresence>
            {countdown > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50"
              >
                <div className="text-9xl font-bold gold-text">{countdown}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Controls */}
          {!capturedPhoto && (
            <div className="absolute top-4 left-4 right-4 flex justify-end items-center">
              <div className="flex gap-2">
                <button
                  onClick={switchCamera}
                  className="p-3 bg-dark-50/80 backdrop-blur-sm text-gold-400 rounded-full"
                >
                  🔄
                </button>
                <button
                  onClick={() => {
                    stopCamera();
                    window.history.back();
                  }}
                  className="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full text-sm hover:bg-red-600/80 transition-colors"
                  title="Close Camera"
                >
                  ✕ Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Carousel */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-3 justify-start md:justify-center px-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  if (capturedPhoto) {
                    handleApplyFilterToPreview(filter.value);
                  } else {
                    setSelectedFilter(filter.value);
                  }
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full transition-all ${
                  (capturedPhoto ? previewFilter : selectedFilter) === filter.value
                    ? "bg-gold-500 text-dark-50"
                    : "bg-dark-100 text-gold-400 hover:bg-dark-50"
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        {!capturedPhoto ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={startCountdown}
              disabled={!isActive || countdown > 0}
              className="btn-gold px-12 py-4 text-lg disabled:opacity-50"
            >
              {countdown > 0 ? `⏱️ ${countdown}...` : "📸 Capture"}
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={handleRetake} className="btn-dark">
              ↺ Retake
            </button>
            <button onClick={handleDownload} className="btn-dark">
              ⬇ Download
            </button>
            <button
              onClick={handleSave}
              disabled={isUploading}
              className="btn-gold disabled:opacity-50"
            >
              {isUploading ? `⏳ ${uploadProgress.toFixed(0)}%` : "💾 Save"}
            </button>
          </div>
        )}

        {/* Upload Status */}
        {uploadStatus && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-gold-400"
          >
            {uploadStatus}
          </motion.p>
        )}

        {/* Gallery Strip */}
        {gallery.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-serif text-gold-400 mb-4 text-center">
              Your Captures
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {gallery.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale:0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCapturedPhoto(photo.dataURL)}
                  className="flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden cursor-pointer glass-card"
                >
                  <img
                    src={photo.dataURL}
                    alt="Captured memory"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
