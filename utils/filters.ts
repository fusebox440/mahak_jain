export type FilterType =
  | "natural"
  | "soft-glow"
  | "warm-vintage"
  | "film-grain"
  | "black-white"
  | "pink-romantic"
  | "golden-hour"
  | "dream-blur"
  | "cool-blue"
  | "sepia-classic"
  | "high-contrast"
  | "neon-glow"
  | "faded-memory"
  | "sunset-vibes";

export interface FilterConfig {
  name: string;
  value: FilterType;
  icon: string;
}

export const FILTERS: FilterConfig[] = [
  { name: "Natural", value: "natural", icon: "✨" },
  { name: "Soft Glow", value: "soft-glow", icon: "🌟" },
  { name: "Warm Vintage", value: "warm-vintage", icon: "📷" },
  { name: "Film Grain", value: "film-grain", icon: "🎞️" },
  { name: "B&W", value: "black-white", icon: "⚫" },
  { name: "Pink Dreams", value: "pink-romantic", icon: "💕" },
  { name: "Golden Hour", value: "golden-hour", icon: "🌅" },
  { name: "Dream Blur", value: "dream-blur", icon: "🌫️" },
  { name: "Cool Blue", value: "cool-blue", icon: "😎" },
  { name: "Sepia Classic", value: "sepia-classic", icon: "😍" },
  { name: "High Contrast", value: "high-contrast", icon: "😏" },
  { name: "Neon Glow", value: "neon-glow", icon: "🤩" },
  { name: "Faded Memory", value: "faded-memory", icon: "😇" },
  { name: "Sunset Vibes", value: "sunset-vibes", icon: "🥰" },
];

export function applyFilter(imageData: ImageData, filterType: FilterType): ImageData {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  switch (filterType) {
    case "natural":
      return imageData;

    case "soft-glow":
      return applySoftGlow(imageData);

    case "warm-vintage":
      return applyWarmVintage(imageData);

    case "film-grain":
      return applyFilmGrain(imageData);

    case "black-white":
      return applyBlackWhite(imageData);

    case "pink-romantic":
      return applyPinkRomantic(imageData);

    case "golden-hour":
      return applyGoldenHour(imageData);

    case "dream-blur":
      return applyDreamBlur(imageData);

    case "cool-blue":
      return applyCoolBlue(imageData);

    case "sepia-classic":
      return applySepiaClassic(imageData);

    case "high-contrast":
      return applyHighContrast(imageData);

    case "neon-glow":
      return applyNeonGlow(imageData);

    case "faded-memory":
      return applyFadedMemory(imageData);

    case "sunset-vibes":
      return applySunsetVibes(imageData);

    default:
      return imageData;
  }
}

function applySoftGlow(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Increase brightness slightly
    data[i] = Math.min(255, data[i] * 1.1);
    data[i + 1] = Math.min(255, data[i + 1] * 1.1);
    data[i + 2] = Math.min(255, data[i + 2] * 1.1);
    
    // Soft contrast reduction
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i] * 0.7 + avg * 0.3;
    data[i + 1] = data[i + 1] * 0.7 + avg * 0.3;
    data[i + 2] = data[i + 2] * 0.7 + avg * 0.3;
  }
  
  return imageData;
}

function applyWarmVintage(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Add warm tones
    data[i] = Math.min(255, data[i] * 1.15); // Red boost
    data[i + 1] = Math.min(255, data[i + 1] * 1.05); // Green slight boost
    data[i + 2] = Math.max(0, data[i + 2] * 0.85); // Blue reduction
    
    // Faded effect
    data[i] = data[i] * 0.9 + 30;
    data[i + 1] = data[i + 1] * 0.9 + 20;
    data[i + 2] = data[i + 2] * 0.9 + 10;
  }
  
  return imageData;
}

function applyFilmGrain(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 25;
    data[i] = Math.max(0, Math.min(255, data[i] + grain));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain));
  }
  
  return imageData;
}

function applyBlackWhite(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  
  return imageData;
}

function applyPinkRomantic(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 1.2); // Red boost
    data[i + 1] = Math.max(0, data[i + 1] * 0.9); // Green reduction
    data[i + 2] = Math.min(255, data[i + 2] * 1.1); // Blue slight boost
    
    // Add pink glow
    data[i] += 20;
    data[i + 2] += 10;
  }
  
  return imageData;
}

function applyGoldenHour(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 1.25 + 30); // Strong red/orange
    data[i + 1] = Math.min(255, data[i + 1] * 1.1 + 15); // Warm yellow
    data[i + 2] = Math.max(0, data[i + 2] * 0.8); // Blue reduction
  }
  
  return imageData;
}

function applyDreamBlur(imageData: ImageData): ImageData {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const tempData = new Uint8ClampedArray(data);
  
  // Simple box blur effect
  const radius = 2;
  
  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      let r = 0, g = 0, b = 0, count = 0;
      
      for (let ky = -radius; ky <= radius; ky++) {
        for (let kx = -radius; kx <= radius; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          r += tempData[idx];
          g += tempData[idx + 1];
          b += tempData[idx + 2];
          count++;
        }
      }
      
      const idx = (y * width + x) * 4;
      data[idx] = r / count;
      data[idx + 1] = g / count;
      data[idx + 2] = b / count;
    }
  }
  
  // Add brightness
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 1.15);
    data[i + 1] = Math.min(255, data[i + 1] * 1.15);
    data[i + 2] = Math.min(255, data[i + 2] * 1.15);
  }
  
  return imageData;
}

function applyCoolBlue(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.max(0, data[i] * 0.75); // Red reduction
    data[i + 1] = Math.min(255, data[i + 1] * 1.05); // Green slight boost
    data[i + 2] = Math.min(255, data[i + 2] * 1.35 + 20); // Blue boost
  }
  
  return imageData;
}

function applySepiaClassic(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  }
  
  return imageData;
}

function applyHighContrast(imageData: ImageData): ImageData {
  const data = imageData.data;
  const factor = 1.5;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, (data[i] - 128) * factor + 128));
    data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * factor + 128));
    data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * factor + 128));
  }
  
  return imageData;
}

function applyNeonGlow(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Increase saturation and brightness
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const delta = max - min;
    
    if (delta > 0) {
      data[i] = Math.min(255, data[i] + (data[i] - min) * 0.8);
      data[i + 1] = Math.min(255, data[i + 1] + (data[i + 1] - min) * 0.8);
      data[i + 2] = Math.min(255, data[i + 2] + (data[i + 2] - min) * 0.8);
    }
    
    // Boost brightness
    data[i] = Math.min(255, data[i] * 1.3);
    data[i + 1] = Math.min(255, data[i + 1] * 1.3);
    data[i + 2] = Math.min(255, data[i + 2] * 1.3);
  }
  
  return imageData;
}

function applyFadedMemory(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Desaturate slightly
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i] * 0.6 + avg * 0.4;
    data[i + 1] = data[i + 1] * 0.6 + avg * 0.4;
    data[i + 2] = data[i + 2] * 0.6 + avg * 0.4;
    
    // Add light overexposed effect
    data[i] = Math.min(255, data[i] + 40);
    data[i + 1] = Math.min(255, data[i + 1] + 40);
    data[i + 2] = Math.min(255, data[i + 2] + 40);
    
    // Reduce alpha slightly for faded look
    data[i + 3] = Math.max(200, data[i + 3]);
  }
  
  return imageData;
}

function applySunsetVibes(imageData: ImageData): ImageData {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Strong warm tones - orange/red sunset
    data[i] = Math.min(255, data[i] * 1.35 + 40); // Red boost
    data[i + 1] = Math.min(255, data[i + 1] * 1.15 + 20); // Orange tone
    data[i + 2] = Math.max(0, data[i + 2] * 0.7); // Blue reduction
    
    // Add slight purple to shadows
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (brightness < 100) {
      data[i] = Math.min(255, data[i] + 15);
      data[i + 2] = Math.min(255, data[i + 2] + 10);
    }
  }
  
  return imageData;
}

export function applyFilterToCanvas(
  canvas: HTMLCanvasElement,
  filterType: FilterType
): void {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const filteredData = applyFilter(imageData, filterType);
  ctx.putImageData(filteredData, 0, 0);
}
