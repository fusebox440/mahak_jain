"use client";

import { motion } from "framer-motion";

interface Song {
  id: number;
  title: string;
  artist: string;
  emoji: string;
  spotifyLink: string;
  language: "Hindi" | "English";
}

const PLAYLIST: Song[] = [
  // English Songs
  { 
    id: 1, 
    title: "Perfect", 
    artist: "Ed Sheeran", 
    emoji: "💕",
    spotifyLink: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v",
    language: "English"
  },
  { 
    id: 2, 
    title: "Photograph", 
    artist: "Ed Sheeran", 
    emoji: "📸",
    spotifyLink: "https://open.spotify.com/track/1HNkqx9Ahdgi1Ixy2xkKkL",
    language: "English"
  },
  
  // Hindi Romantic Songs - New
  { 
    id: 3, 
    title: "Tujhe Kitna Chahne Lage", 
    artist: "Arijit Singh - Kabir Singh", 
    emoji: "💝",
    spotifyLink: "https://open.spotify.com/track/6rPO02ozF3bM7NnOV4h6s2",
    language: "Hindi"
  },
  { 
    id: 4, 
    title: "Dil Diyan Gallan", 
    artist: "Atif Aslam - Tiger Zinda Hai", 
    emoji: "❤️",
    spotifyLink: "https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6",
    language: "Hindi"
  },
  { 
    id: 5, 
    title: "Hawayein", 
    artist: "Arijit Singh - Jab Harry Met Sejal", 
    emoji: "🌊",
    spotifyLink: "https://open.spotify.com/track/6nWB0P6lQqhpMbR1jNxKP0",
    language: "Hindi"
  },
  { 
    id: 6, 
    title: "Tere Sang Yaara", 
    artist: "Atif Aslam - Rustom", 
    emoji: "💑",
    spotifyLink: "https://open.spotify.com/track/2LBqCSwhJGcFQeTHMVGwy3",
    language: "Hindi"
  },
  { 
    id: 7, 
    title: "Channa Mereya", 
    artist: "Arijit Singh - Ae Dil Hai Mushkil", 
    emoji: "💔",
    spotifyLink: "https://open.spotify.com/track/4OKN2NP0AqSwZDZNLJWmzc",
    language: "Hindi"
  },
  { 
    id: 8, 
    title: "Agar Tum Saath Ho", 
    artist: "Alka Yagnik, Arijit Singh - Tamasha", 
    emoji: "🎭",
    spotifyLink: "https://open.spotify.com/track/7syqJhmlXKH4or0lPPicBy",
    language: "Hindi"
  },
  
  // Hindi Romantic Songs - Classic/Old
  { 
    id: 9, 
    title: "Tum Hi Ho", 
    artist: "Arijit Singh - Aashiqui 2", 
    emoji: "🎵",
    spotifyLink: "https://open.spotify.com/track/6xgFYSUJL7q4dV9RxRxVvM",
    language: "Hindi"
  },
  { 
    id: 10, 
    title: "Raabta", 
    artist: "Arijit Singh - Agent Vinod", 
    emoji: "🔗",
    spotifyLink: "https://open.spotify.com/track/7vW1a9D3fJbzXqGJQd7qS7",
    language: "Hindi"
  },
  { 
    id: 11, 
    title: "Tere Bina", 
    artist: "A.R. Rahman - Guru", 
    emoji: "🌟",
    spotifyLink: "https://open.spotify.com/track/0EOTmN0A6JQKBQ9F8qKGgV",
    language: "Hindi"
  },
  { 
    id: 12, 
    title: "Kal Ho Naa Ho", 
    artist: "Sonu Nigam - Kal Ho Naa Ho", 
    emoji: "⏰",
    spotifyLink: "https://open.spotify.com/track/7klT2JTITGJbD1jZuSPaZQ",
    language: "Hindi"
  },
  { 
    id: 13, 
    title: "Pehla Nasha", 
    artist: "Udit Narayan, Sadhana Sargam - JJWS", 
    emoji: "🥂",
    spotifyLink: "https://open.spotify.com/track/5FLCKJv0rqyTuqAqXCbTRt",
    language: "Hindi"
  },
  { 
    id: 14, 
    title: "Kabhi Kabhi Aditi", 
    artist: "Rashid Ali - Jaane Tu Ya Jaane Na", 
    emoji: "🎸",
    spotifyLink: "https://open.spotify.com/track/2kfJlFOX8TfasPaP0eArw5",
    language: "Hindi"
  },
  { 
    id: 15, 
    title: "Ae Dil Hai Mushkil", 
    artist: "Arijit Singh - Ae Dil Hai Mushkil", 
    emoji: "💖",
    spotifyLink: "https://open.spotify.com/track/7f5I2JPbCKaX5zb6qLdfBH",
    language: "Hindi"
  },
  { 
    id: 16, 
    title: "Shayad", 
    artist: "Arijit Singh - Love Aaj Kal", 
    emoji: "🌙",
    spotifyLink: "https://open.spotify.com/track/6wpGqhRvJGNzXKZY6vRp4A",
    language: "Hindi"
  },
];

export default function PlaylistPage() {
  const handlePlay = (spotifyLink: string) => {
    window.open(spotifyLink, '_blank');
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-3">
            Our Playlist
          </h1>
          <p className="text-dark-500">
            Songs that remind me of you ✨
          </p>
          <p className="text-xs text-dark-600 mt-2">
            Click on any song to play on Spotify 🎵
          </p>
        </div>

        <div className="space-y-4">
          {PLAYLIST.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 10 }}
              onClick={() => handlePlay(song.spotifyLink)}
              className="glass-card p-5 flex items-center gap-4 cursor-pointer group"
            >
              <div className="text-4xl flex-shrink-0">{song.emoji}</div>
              <div className="flex-1">
                <h3 className="text-lg font-serif text-gold-400 group-hover:text-gold-300 transition-colors">
                  {song.title}
                </h3>
                <p className="text-sm text-dark-500">{song.artist}</p>
                <span className="text-xs text-dark-600 italic">{song.language}</span>
              </div>
              <div className="text-gold-400 text-2xl group-hover:text-gold-300 transition-colors">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="group-hover:scale-110 transition-transform"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xl font-script text-gold-300">
            Every song tells a story of us
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
