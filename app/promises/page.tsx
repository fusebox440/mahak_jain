"use client";

import { motion } from "framer-motion";

const PROMISES = [
  {
    id: 1,
    emoji: "💝",
    title: "Always Be There",
    promise: "I promise to always be there for you, in good times and bad, through every challenge and celebration.",
  },
  {
    id: 2,
    emoji: "🌟",
    title: "Support Your Dreams",
    promise: "I promise to support your dreams and ambitions, and to celebrate every milestone with you.",
  },
  {
    id: 3,
    emoji: "😊",
    title: "Make You Smile",
    promise: "I promise to find new ways to make you smile every single day, even on the hardest ones.",
  },
  {
    id: 4,
    emoji: "🤗",
    title: "Listen & Understand",
    promise: "I promise to listen without judgment, to understand your feelings, and to communicate openly and honestly.",
  },
  {
    id: 5,
    emoji: "🎁",
    title: "Cherish Little Things",
    promise: "I promise to never take you for granted and to cherish the little things that make our relationship special.",
  },
  {
    id: 6,
    emoji: "💪",
    title: "Grow Together",
    promise: "I promise to grow with you, to learn from our experiences, and to become a better person because of you.",
  },
];

export default function PromisesPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-3">
            My Promises to You
          </h1>
          <p className="text-dark-500">
            Commitments I make from the bottom of my heart
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMISES.map((promise, index) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-6xl mb-4">{promise.emoji}</div>
              <h3 className="text-xl font-serif text-gold-400 mb-3">
                {promise.title}
              </h3>
              <p className="text-dark-600 leading-relaxed">
                {promise.promise}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl font-script text-gold-300">
            These are not just words, but commitments I will keep forever.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
