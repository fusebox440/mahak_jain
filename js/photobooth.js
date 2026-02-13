(function () {
  const reactions = [
    "That smile just made my day ✨",
    "Okay wow... heart officially stolen 💘",
    "How are you this pretty even casually? 🌸",
    "Saved one more memory I’ll replay forever 💞"
  ];

  const state = {
    stream: null,
    capturedBlob: null,
    activeFilter: (window.SITE_CONFIG && window.SITE_CONFIG.photobooth && window.SITE_CONFIG.photobooth.defaultFilter) || "soft-glow",
    smileTriggered: false,
    detector: null,
    smileTimer: null,
    hasUploaded: false
  };

  const elements = {
    video: document.getElementById("cameraVideo"),
    canvas: document.getElementById("captureCanvas"),
    previewImage: document.getElementById("previewImage"),
    stage: document.getElementById("cameraStage"),
    manualCapture: document.getElementById("manualCapture"),
    retakeBtn: document.getElementById("retakeBtn"),
    filterSelect: document.getElementById("filterSelect"),
    uploadStatus: document.getElementById("uploadStatus"),
    reactionText: document.getElementById("reactionText")
  };

  function setStatus(text) {
    if (elements.uploadStatus) elements.uploadStatus.textContent = text;
  }

  function setReaction(text) {
    if (!elements.reactionText) return;
    elements.reactionText.textContent = text;
    if (window.gsap) {
      gsap.fromTo(elements.reactionText, { opacity: 0.4, y: 8 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
    }
  }

  function getDeviceType() {
    const ua = navigator.userAgent || "";
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
    if (/mobile|iphone|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
    return "desktop";
  }

  function applyFilter(ctx, width, height, filterName) {
    switch (filterName) {
      case "soft-glow":
        ctx.filter = "brightness(1.05) contrast(1.05) saturate(1.08)";
        break;
      case "vintage-warm":
        ctx.filter = "sepia(0.3) saturate(1.12) contrast(0.95)";
        break;
      case "dreamy-blur":
        ctx.filter = "blur(0.8px) brightness(1.04)";
        break;
      case "bw-love-letter":
        ctx.filter = "grayscale(1) contrast(1.1)";
        break;
      case "sunset-warmth":
        ctx.filter = "sepia(0.2) saturate(1.2) hue-rotate(-8deg)";
        break;
      case "pink-haze":
        ctx.filter = "saturate(1.14) brightness(1.06)";
        break;
      case "film-grain":
      default:
        ctx.filter = "contrast(1.05) saturate(1.02)";
        break;
    }

    ctx.drawImage(elements.video, 0, 0, width, height);

    if (filterName === "film-grain") {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * 20;
        data[i] = Math.min(255, Math.max(0, data[i] + grain));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
      }
      ctx.putImageData(imageData, 0, 0);
    }

    if (filterName === "pink-haze") {
      ctx.fillStyle = "rgba(247, 202, 208, 0.16)";
      ctx.fillRect(0, 0, width, height);
    }

    if (filterName === "soft-glow") {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, width * 0.12, width / 2, height / 2, width * 0.62);
      gradient.addColorStop(0, "rgba(255,255,255,0.05)");
      gradient.addColorStop(1, "rgba(230,199,156,0.15)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  }

  async function uploadToCloudinary(blob) {
    const cloudinaryConfig = (window.SITE_CONFIG && window.SITE_CONFIG.cloudinary) || {};
    const cloudName = cloudinaryConfig.cloudName;
    const uploadPreset = cloudinaryConfig.uploadPreset;

    if (!cloudName || !uploadPreset || cloudName === "your_cloud_name" || uploadPreset === "your_unsigned_upload_preset") {
      setStatus("Set Cloudinary cloud name and unsigned preset in js/site-config.js to enable upload.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", blob, `smile-${Date.now()}.jpg`);
    formData.append("upload_preset", uploadPreset);

    const timestamp = new Date().toISOString();
    const deviceType = getDeviceType();
    const filterUsed = state.activeFilter;
    formData.append("context", `timestamp=${timestamp}|deviceType=${deviceType}|filterUsed=${filterUsed}`);
    formData.append("tags", "steal-a-smile,valentine-week,romantic");

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const result = await response.json();

    const localUploads = JSON.parse(localStorage.getItem("photobooth-uploads") || "[]");
    localUploads.unshift({
      timestamp,
      deviceType,
      filterUsed,
      cloudinaryUrl: result.secure_url
    });
    localStorage.setItem("photobooth-uploads", JSON.stringify(localUploads.slice(0, 30)));

    return result;
  }

  function showPreview(canvas) {
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    elements.previewImage.src = dataUrl;
    elements.previewImage.style.display = "block";
    elements.video.style.display = "none";
    setReaction(reactions[Math.floor(Math.random() * reactions.length)]);
  }

  async function captureFrame(reason) {
    if (!elements.video || !elements.canvas || state.hasUploaded) return;

    const width = elements.video.videoWidth || 1280;
    const height = elements.video.videoHeight || 720;
    elements.canvas.width = width;
    elements.canvas.height = height;

    const ctx = elements.canvas.getContext("2d");
    if (!ctx) return;

    applyFilter(ctx, width, height, state.activeFilter);

    showPreview(elements.canvas);

    const blob = await new Promise((resolve) => elements.canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) {
      setStatus("Could not capture image. Please try again.");
      return;
    }

    state.capturedBlob = blob;
    state.hasUploaded = true;
    setStatus(`Captured (${reason}). Uploading to cloud...`);

    try {
      const uploadResult = await uploadToCloudinary(blob);
      if (uploadResult && uploadResult.secure_url) {
        setStatus("Uploaded successfully 💗 Memory saved.");
      }
    } catch (error) {
      setStatus("Capture saved locally, but cloud upload failed.");
      console.error(error);
    }
  }

  function estimateSmileFromLandmarks(face) {
    if (!face || !face.landmarks || !face.landmarks.length) return false;
    const mouthPoints = face.landmarks.filter((point) => point.type && point.type.toLowerCase().includes("mouth"));
    if (mouthPoints.length < 2 || !face.boundingBox) return false;

    const xs = mouthPoints.map((point) => point.x);
    const mouthWidth = Math.max(...xs) - Math.min(...xs);
    const faceWidth = face.boundingBox.width || 1;

    return mouthWidth / faceWidth > 0.33;
  }

  async function watchSmile() {
    if (!state.detector || !elements.video || state.hasUploaded) return;

    try {
      const faces = await state.detector.detect(elements.video);
      if (faces && faces.length) {
        const smiling = estimateSmileFromLandmarks(faces[0]);
        if (smiling && !state.smileTriggered) {
          state.smileTriggered = true;
          setStatus("Smile detected... capturing 💕");
          captureFrame("smile detection");
        } else if (!state.hasUploaded) {
          setStatus("Smile to auto-capture or tap the camera view.");
        }
      }
    } catch (error) {
      if (!state.hasUploaded) {
        setStatus("Tap camera view to capture (auto smile detect not available on this device).");
      }
    }
  }

  async function initCamera() {
    if (!elements.video) return;

    try {
      state.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      elements.video.srcObject = state.stream;
      await elements.video.play();
      setStatus("Smile to auto-capture or tap the camera view.");

      if ("FaceDetector" in window) {
        state.detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
        state.smileTimer = setInterval(watchSmile, 900);
      } else {
        setStatus("Tap camera view to capture (smile auto-capture support varies by browser).");
      }
    } catch (error) {
      setStatus("Camera access denied or unavailable.");
      console.error(error);
    }
  }

  function bindEvents() {
    if (elements.filterSelect) {
      elements.filterSelect.value = state.activeFilter;
      elements.filterSelect.addEventListener("change", function () {
        state.activeFilter = elements.filterSelect.value;
        if (!state.hasUploaded) {
          setStatus(`Filter set to ${elements.filterSelect.options[elements.filterSelect.selectedIndex].text}.`);
        }
      });
    }

    if (elements.stage) {
      elements.stage.addEventListener("click", function () {
        if (!state.hasUploaded) {
          captureFrame("tap capture");
        }
      });
    }

    if (elements.manualCapture) {
      elements.manualCapture.addEventListener("click", function () {
        if (!state.hasUploaded) {
          captureFrame("manual capture");
        }
      });
    }

    if (elements.retakeBtn) {
      elements.retakeBtn.addEventListener("click", function () {
        state.hasUploaded = false;
        state.smileTriggered = false;
        elements.previewImage.style.display = "none";
        elements.video.style.display = "block";
        setReaction("Waiting for your smile...");
        setStatus("Smile to auto-capture or tap the camera view.");
      });
    }

    window.addEventListener("beforeunload", function () {
      if (state.smileTimer) clearInterval(state.smileTimer);
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindEvents();
    initCamera();
  });
})();
