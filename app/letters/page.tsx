"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = [
  {
    id: 1,
    title: "Our Future Together",
    date: "Forever",
    content: `My Love,

When I think about the future, I see you. I see us traveling the world, laughing together, supporting each other's dreams, and building a life filled with love and happiness.

I see lazy Sunday mornings, exciting adventures, quiet evenings, and everything in between. I see a lifetime of memories waiting to be made.

I can't wait to spend every day discovering new reasons to love you.

With all my heart,
Lakshya`,
  },
];

export default function LettersPage() {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-3">
            Love Letters
          </h1>
          <p className="text-dark-500 font-script text-xl">
            Words from my heart to yours... and many more on the way ✨
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {LETTERS.map((letter) => (
            <motion.div
              key={letter.id}
              whileHover={{ scale: 1.03, rotate: Math.random() * 3 - 1.5 }}
              onClick={() => setSelectedLetter(letter.id)}
              className="glass-card p-6 cursor-pointer"
            >
              <div className="text-5xl mb-4">💌</div>
              <h3 className="text-xl font-serif text-gold-400 mb-2">
                {letter.title}
              </h3>
              <p className="text-sm text-dark-500">{letter.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 md:p-12 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedLetter(null)}
                className="float-right text-gold-400 text-3xl hover:text-gold-300"
              >
                &times;
              </button>

              {LETTERS.find((l) => l.id === selectedLetter) && (
                <>
                  <h2 className="text-3xl font-serif gold-text mb-4">
                    {LETTERS.find((l) => l.id === selectedLetter)?.title}
                  </h2>
                  <p className="text-sm text-dark-500 mb-8">
                    {LETTERS.find((l) => l.id === selectedLetter)?.date}
                  </p>
                  <div className="whitespace-pre-line text-dark-600 leading-relaxed font-script text-lg">
                    {LETTERS.find((l) => l.id === selectedLetter)?.content}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
