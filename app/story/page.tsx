"use client";

import { motion } from "framer-motion";

export default function StoryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <div className="glass-card p-8 md:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4">
              Our Story
            </h1>
            <p className="text-gold-300 font-script text-2xl">
              Where it all began...
            </p>
          </div>

          <div className="space-y-6 text-dark-600">
            <p className="text-lg leading-relaxed">
              Sometimes the best things in life happen when you least expect them. 
              That's how our story began a chance meeting in that doubt room at reliable 
              kota that quietly turned into something beautiful and extraordinary.
            </p>

            <p className="text-lg leading-relaxed">
              From our very first conversation about the bonds between atoms to now, 
              when we share a bond stronger than any atomic or ionic one, every moment 
              has become a chapter in our story. Through laughter and tears, adventures 
              and ordinary days, we've created memories that feel anything but ordinary.
            </p>

            <p className="text-lg leading-relaxed">
              Somehow, in the middle of random conversations, late-night talks, and 
              comfortable and uncomfortable silences, I became yours and you became my home.
            </p>

            <p className="text-lg leading-relaxed">
              This website is a celebration of us of the journey we've taken, the memories 
              we've made, and the dreams we're slowly building for tomorrow.
            </p>

            <div className="mt-12 pt-8 border-t border-gold-500/20 text-center">
              <p className="text-gold-400 font-script text-3xl mb-2">
                And the story continues...
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
