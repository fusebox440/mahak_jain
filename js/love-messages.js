// Daily Love Messages Configuration
window.LOVE_MESSAGES = [
  {
    message: "Every morning I wake up grateful for another day to love you, my beautiful Mahak.",
    author: "Lakshya"
  },
  {
    message: "Your smile is the sunshine that brightens my entire world, cheesecake.",
    author: "Your Lakshya"
  },
  {
    message: "In a world full of temporary things, you are my forever and always.",
    author: "Lakshya"
  },
  {
    message: "I fall in love with you more and more each day, and I didn't think that was possible.",
    author: "Your love, Lakshya"
  },
  {
    message: "You're not just my girlfriend, you're my best friend, my soulmate, my everything.",
    author: "Lakshya Khetan"
  },
  {
    message: "Home isn't a place, it's being in your arms, my sweet Mahak.",
    author: "Lakshya"
  },
  {
    message: "Every love story is beautiful, but ours is my favorite one of all.",
    author: "Your Lakshya"
  },
  {
    message: "You make ordinary moments feel like magic, my darling cheesecake.",
    author: "Lakshya"
  },
  {
    message: "I love you not only for what you are, but for what I am when I'm with you.",
    author: "Lakshya Khetan"
  },
  {
    message: "You're the reason I believe in happily ever after, my beautiful Mahak.",
    author: "Your Lakshya"
  },
  {
    message: "Every day with you is a new adventure that I never want to end.",
    author: "Lakshya"
  },
  {
    message: "You're my today and all of my tomorrows, my sweet love.",
    author: "Lakshya Khetan"
  },
  {
    message: "I choose you, and I'll choose you over and over again, without pause or doubt.",
    author: "Your devoted Lakshya"
  },
  {
    message: "You're the missing piece I never knew my heart was searching for.",
    author: "Lakshya"
  },
  {
    message: "Loving you is the easiest thing I've ever done, my precious Mahak.",
    author: "Your Lakshya"
  },
  {
    message: "You turn my house into a home and my dreams into plans.",
    author: "Lakshya Khetan"
  },
  {
    message: "In your eyes, I see our future, and it's more beautiful than I ever imagined.",
    author: "Lakshya"
  },
  {
    message: "You're not just the love of my life, you ARE my life, cheesecake.",
    author: "Your Lakshya"
  },
  {
    message: "Every heartbeat whispers your name, every breath is for you.",
    author: "Lakshya"
  },
  {
    message: "Thank you for being you, for loving me, and for making life so wonderful.",
    author: "Your grateful Lakshya"
  },
  {
    message: "You're my sunshine on cloudy days and my anchor in every storm.",
    author: "Lakshya Khetan"
  },
  {
    message: "I love you beyond words, beyond time, beyond this lifetime.",
    author: "Your eternal love, Lakshya"
  },
  {
    message: "You make me want to be the best version of myself, my beautiful Mahak.",
    author: "Lakshya"
  },
  {
    message: "Our love story is my favorite fairy tale, and you're my happy ending.",
    author: "Your Prince Lakshya"
  },
  {
    message: "Distance means nothing when someone means everything. You mean everything to me.",
    author: "Lakshya"
  },
  {
    message: "I promise to love you in every lifetime, in every universe, in every version of reality.",
    author: "Your devoted Lakshya"
  },
  {
    message: "You're the reason I wake up with a smile and fall asleep with peace in my heart.",
    author: "Lakshya Khetan"
  },
  {
    message: "My heart found its home the day I found you, my sweet cheesecake.",
    author: "Your Lakshya"
  },
  {
    message: "You're not just a chapter in my story, you ARE the story, my love.",
    author: "Lakshya"
  },
  {
    message: "Forever isn't long enough when it comes to loving you, my precious Mahak.",
    author: "Your Lakshya forever"
  }
];

// Function to get today's love message
function getTodaysLoveMessage() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const messageIndex = dayOfYear % window.LOVE_MESSAGES.length;
  return window.LOVE_MESSAGES[messageIndex];
}

// Function to get a random love message (used to show a new random message on each page open)
function getRandomLoveMessage() {
  if(!window.LOVE_MESSAGES || !window.LOVE_MESSAGES.length) return null;
  const idx = Math.floor(Math.random() * window.LOVE_MESSAGES.length);
  return window.LOVE_MESSAGES[idx];
}

// Add Hindi messages (append) for bilingual support
;(function appendHindiMessages(){
  const hindi = [
    { message: "तुम्हारी मुस्कान मेरी दुनिया रोशन कर देती है, मेरी प्यारी महक।", author: "लक्ष्य" },
    { message: "हर पल तुम्हारे साथ जैसे एक नया सुखद गीत है।", author: "लक्ष्य" },
    { message: "मैं तुम्हें हर जन्म में फिर से चुनूँगा।", author: "लक्ष्य" },
    { message: "मेरा हर दिन तुम्हारे प्यार से सुंदर बनता है।", author: "लक्ष्य" },
    { message: "तुम्हारे बिना मेरी दुनिया अधूरी है।", author: "लक्ष्य" },
    { message: "तुम मेरी हँसी की वजह, मेरे दिल की धड़कन और मेरे हर सपने की वजह हो।", author: "लक्ष्य" },
    { message: "तुम्हारे साथ हर सफर खास है — चलो जिंदगी भर का सफर साथ करें।", author: "लक्ष्य" },
    { message: "हाथ थाम लो, मैं हमेशा तुम्हारा साथ दूँगा।", author: "लक्ष्य" }
  ];

  // Avoid duplicating if script runs multiple times
  try {
    const existing = window.LOVE_MESSAGES || [];
    // Simple dedupe: only append if a Hindi message text isn't already present
    hindi.forEach(h => {
      const found = existing.some(e => e.message === h.message);
      if(!found) existing.push(h);
    });
    window.LOVE_MESSAGES = existing;
  } catch (e) {
    // in case of any unexpected error, silently continue
    console.warn('Could not append Hindi messages', e);
  }
})();