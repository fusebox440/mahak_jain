"use client";

import { motion } from "framer-motion";

const TRAVELS = [
  {
    id: 1,
    place: "Gwalior",
    emoji: "🏰",
    date: "2025",
    highlight: "Exploring the historic fort together",
    memories: "The beautiful architecture, our long walks, and those perfect photos we took.",
  },
  {
    id: 2,
    place: "Mumbai",
    emoji: "🌊",
    date: "Dec 2024",
    highlight: "City adventures by the sea",
    memories: "Marine Drive at night, trying new food, getting lost in the streets, and laughing through it all.",
  },
  {
    id: 3,
    place: "Vrindavan",
    emoji: "🛕",
    date: "2025",
    highlight: "Spiritual journey together",
    memories: "The peaceful temples, prem mandir and feeling so connected to each other and something greater.",
  },
];

const FUTURE_TRAVELS = [
  { place: "Paris", emoji: "🗼", dream: "Walk under the Eiffel Tower at night" },
  { place: "Santorini", emoji: "🏝️", dream: "Watch the sunset from a white villa" },
  { place: "Tokyo", emoji: "🗾", dream: "Experience cherry blossoms together" },
  { place: "Maldives", emoji: "🏖️", dream: "Relax in an overwater bungalow" },
  { place: "Switzerland", emoji: "⛰️", dream: "See the snow-capped Alps" },
  { place: "Dubai", emoji: "🌆", dream: "Experience luxury and adventure" },
];

export default function TravelsPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-3">
            Our Travels
          </h1>
          <p className="text-dark-500">
            Places we've been and dreams of where we'll go
          </p>
        </div>

        {/* Past Travels */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif text-gold-400 mb-8 text-center">
            Adventures We've Shared ✨
          </h2>
          <div className="space-y-6">
            {TRAVELS.map((travel, index) => (
              <motion.div
                key={travel.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 md:p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">{travel.emoji}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif text-gold-400">
                        {travel.place}
                      </h3>
                      <span className="text-sm text-dark-500">{travel.date}</span>
                    </div>
                    <p className="text-lg text-gold-300 mb-3 font-script">
                      {travel.highlight}
                    </p>
                    <p className="text-dark-600 leading-relaxed">
                      {travel.memories}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Dreams */}
        <div>
          <h2 className="text-3xl font-serif text-gold-400 mb-8 text-center">
            Where We'll Go Next 🌍
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUTURE_TRAVELS.map((dream, index) => (
              <motion.div
                key={dream.place}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: Math.random() * 2 - 1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-5xl mb-3">{dream.emoji}</div>
                <h3 className="text-xl font-serif text-gold-400 mb-2">
                  {dream.place}
                </h3>
                <p className="text-sm text-dark-600">{dream.dream}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-script text-gold-300">
            Every journey is better because you're by my side
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
