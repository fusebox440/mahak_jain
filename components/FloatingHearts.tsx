"use client";

import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.innerHTML = "💛";
      heart.className = "heart-float fixed text-2xl pointer-events-none z-10";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (Math.random() * 3 + 5) + "s";
      heart.style.opacity = String(Math.random() * 0.5 + 0.3);
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 8000);
    };

    const interval = setInterval(createHeart, 3000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
