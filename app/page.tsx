"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loveAnswer, setLoveAnswer] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unlocked = sessionStorage.getItem("unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "mahakjain15") {
      setError("");
      setLoveAnswer(null);
    } else {
      setError("Wrong password! Try again 💔");
    }
  };

  const handleLoveAnswer = (answer: string) => {
    if (answer === "yes") {
      sessionStorage.setItem("unlocked", "true");
      setIsUnlocked(true);
    } else if (answer === "maybe") {
      setError("Maybe isn't good enough! Try again 💕");
    } else {
      setError("Wrong answer! I know you do 💖");
    }
  };

  if (isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full text-center"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-6 gold-text">
            For Mahak
          </h1>
          <p className="text-2xl md:text-3xl font-script text-gold-300 mb-12">
            Every moment with you is a memory worth keeping
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PageCard 
              title="Our Story"
              emoji="📖"
              href="/story"
              description="Where it all began"
            />
            <PageCard 
              title="Memories"
              emoji="📸"
              href="/memories"
              description="Captured moments"
            />
            <PageCard 
              title="Photobooth"
              emoji="✨"
              href="/photobooth"
              description="Create new memories"
            />
            <PageCard 
              title="Love Letters"
              emoji="💌"
              href="/letters"
              description="Words from the heart"
            />
            <PageCard 
              title="Our Playlist"
              emoji="🎵"
              href="/playlist"
              description="Songs that remind me of you"
            />
            <PageCard 
              title="Promises"
              emoji="🤝"
              href="/promises"
              description="My commitments to you"
            />
            <PageCard 
              title="Travels"
              emoji="✈️"
              href="/travels"
              description="Adventures together"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 max-w-md w-full"
      >
        <h1 className="text-4xl font-serif text-center mb-8 gold-text">
          Enter the Password
        </h1>

        {!loveAnswer && password !== "mahakjain15" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-dark-100 border border-gold-500/30 rounded-lg text-white placeholder-gold-200/50 focus:outline-none focus:border-gold-400"
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gold-400 text-center"
              >
                {error}
              </motion.p>
            )}
            <button type="submit" className="w-full btn-gold">
              Unlock 💝
            </button>
          </form>
        )}

        {password === "mahakjain15" && !loveAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <p className="text-xl text-center text-gold-300 mb-6">
              Do you love Lakshya Khetan?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleLoveAnswer("yes")}
                className="w-full btn-gold"
              >
                Yes, I do! 💖
              </button>
              <button
                onClick={() => handleLoveAnswer("maybe")}
                className="w-full btn-dark"
              >
                Maybe... 💕
              </button>
              <button
                onClick={() => handleLoveAnswer("no")}
                className="w-full btn-dark"
              >
                No 💔
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gold-400 text-center mt-4"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function PageCard({ title, emoji, href, description }: { title: string; emoji: string; href: string; description: string }) {
  const router = useRouter();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(href)}
      className="glass-card p-6 cursor-pointer group"
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-serif text-gold-400 mb-2 group-hover:text-gold-300">
        {title}
      </h3>
      <p className="text-sm text-dark-500">{description}</p>
    </motion.div>
  );
}
