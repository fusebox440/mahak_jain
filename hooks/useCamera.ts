import { useState, useRef, useCallback, useEffect } from "react";

export type CameraFacing = "user" | "environment";
export type AspectRatio = "4:5" | "1:1";

export interface CameraState {
  isActive: boolean;
  facing: CameraFacing;
  aspectRatio: AspectRatio;
  error: string | null;
  stream: MediaStream | null;
}

export function useCamera() {
  const [state, setState] = useState<CameraState>({
    isActive: false,
    facing: "user",
    aspectRatio: "4:5",
    error: null,
    stream: null,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = useCallback(async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setState(prev => ({
          ...prev,
          error: "Camera not supported on this browser"
        }));
        return false;
      }

      // Stop existing stream if any
      if (state.stream) {
        state.stream.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: state.facing,
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState(prev => ({
        ...prev,
        isActive: true,
        stream,
        error: null,
      }));

      return true;
    } catch (error: any) {
      let errorMessage = "Failed to access camera";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage = "Camera permission denied. Please allow camera access.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        errorMessage = "No camera found on this device.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        errorMessage = "Camera is already in use by another application.";
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isActive: false,
      }));

      return false;
    }
  }, [state.facing, state.stream]);

  const stopCamera = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach(track => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      stream: null,
    }));
  }, [state.stream]);

  const switchCamera = useCallback(async () => {
    const newFacing: CameraFacing = state.facing === "user" ? "environment" : "user";
    setState(prev => ({ ...prev, facing: newFacing }));
    
    if (state.isActive) {
      stopCamera();
      setTimeout(() => startCamera(), 100);
    }
  }, [state.facing, state.isActive, startCamera, stopCamera]);

  const changeAspectRatio = useCallback((ratio: AspectRatio) => {
    setState(prev => ({ ...prev, aspectRatio: ratio }));
  }, []);

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) return null;

    // Set canvas dimensions based on aspect ratio
    const aspectRatio = state.aspectRatio === "4:5" ? 4 / 5 : 1;
    canvas.width = video.videoWidth;
    canvas.height = video.videoWidth / aspectRatio;

    // Draw video frame to canvas
    ctx.drawImage(
      video,
      0,
      (video.videoHeight - canvas.height) / 2,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return canvas.toDataURL("image/jpeg", 0.95);
  }, [state.aspectRatio]);

  // Handle tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state.isActive) {
        stopCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [state.isActive, stopCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.stream) {
        state.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [state.stream]);

  return {
    ...state,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    switchCamera,
    changeAspectRatio,
    captureFrame,
  };
}
