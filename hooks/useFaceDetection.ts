import { useRef, useCallback } from "react";

export interface FaceDetectionResult {
  detected: boolean;
  confidence: number;
}

export function useFaceDetection() {
  const lastFrameDataRef = useRef<Uint8ClampedArray | null>(null);
  const stableFramesRef = useRef(0);
  const detectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const detectFace = useCallback((
    canvas: HTMLCanvasElement,
    onFaceStable: () => void
  ): FaceDetectionResult => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return { detected: false, confidence: 0 };

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Simple motion detection (works better than complex face detection in browser)
      // Based on frame difference - if frames are similar, person is stable
      if (lastFrameDataRef.current) {
        let diff = 0;
        const sampleRate = 16; // Sample every 16 pixels for performance
        
        for (let i = 0; i < data.length; i += 4 * sampleRate) {
          const r1 = data[i];
          const g1 = data[i + 1];
          const b1 = data[i + 2];
          
          const r2 = lastFrameDataRef.current[i];
          const g2 = lastFrameDataRef.current[i + 1];
          const b2 = lastFrameDataRef.current[i + 2];
          
          diff += Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
        }

        const pixelCount = data.length / (4 * sampleRate);
        const avgDiff = diff / pixelCount / 3;

        // If difference is small, person is stable
        if (avgDiff < 20) {
          stableFramesRef.current += 1;

          // After 45 stable frames (~1.5s at 30fps), trigger capture
          if (stableFramesRef.current >= 45) {
            stableFramesRef.current = 0;
            onFaceStable();
            return { detected: true, confidence: 1 };
          }

          return { detected: true, confidence: stableFramesRef.current / 45 };
        } else {
          stableFramesRef.current = 0;
          return { detected: true, confidence: 0 };
        }
      }

      // Store current frame for next comparison
      lastFrameDataRef.current = new Uint8ClampedArray(data);

      return { detected: false, confidence: 0 };
    } catch (error) {
      console.error("Face detection error:", error);
      return { detected: false, confidence: 0 };
    }
  }, []);

  const detectSmile = useCallback((
    canvas: HTMLCanvasElement
  ): boolean => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;

    try {
      // Simple smile detection using brightness in lower half of frame
      // (Smiling typically exposes more teeth = brighter pixels)
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const mouthY = height * 0.65; // Approximate mouth region
      
      const imageData = ctx.getImageData(
        centerX - 100,
        mouthY - 30,
        200,
        60
      );
      
      const data = imageData.data;
      let brightPixels = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness > 180) {
          brightPixels++;
        }
      }
      
      const totalPixels = data.length / 4;
      const brightRatio = brightPixels / totalPixels;
      
      // If more than 15% of mouth region is bright, consider it a smile
      return brightRatio > 0.15;
    } catch (error) {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    lastFrameDataRef.current = null;
    stableFramesRef.current = 0;
    if (detectionTimeoutRef.current) {
      clearTimeout(detectionTimeoutRef.current);
    }
  }, []);

  return {
    detectFace,
    detectSmile,
    reset,
  };
}
