export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  publicId?: string;
}

export interface UploadMetadata {
  timestamp: string;
  device: string;
  screenSize: string;
  filter: string;
}

// Replace these with your actual Cloudinary credentials
// Or use environment variables (recommended)
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET";
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadToCloudinary(
  file: Blob,
  metadata: UploadMetadata,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "photobooth");
    
    // Add metadata as context
    const contextData = `timestamp=${metadata.timestamp}|device=${metadata.device}|screen=${metadata.screenSize}|filter=${metadata.filter}`;
    formData.append("context", contextData);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            success: true,
            url: response.secure_url,
            publicId: response.public_id,
          });
        } else {
          resolve({
            success: false,
            error: `Upload failed with status ${xhr.status}`,
          });
        }
      });

      xhr.addEventListener("error", () => {
        resolve({
          success: false,
          error: "Network error occurred during upload",
        });
      });

      xhr.addEventListener("timeout", () => {
        resolve({
          success: false,
          error: "Upload timeout - please try again",
        });
      });

      xhr.open("POST", CLOUDINARY_API_URL);
      xhr.timeout = 30000; // 30 second timeout
      xhr.send(formData);
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

export function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

export function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  
  if (/iPhone|iPad|iPod/.test(ua)) {
    return "iOS";
  } else if (/Android/.test(ua)) {
    return "Android";
  } else if (/Windows/.test(ua)) {
    return "Windows";
  } else if (/Macintosh/.test(ua)) {
    return "MacOS";
  }
  
  return "Unknown";
}

export function getScreenSize(): string {
  return `${window.screen.width}x${window.screen.height}`;
}
