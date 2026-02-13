// Floating hearts animation
document.addEventListener('DOMContentLoaded', function() {
  const hearts = document.getElementById('floatingHearts');
  if(!hearts) return;
  const heartEmojis = ['💖','💗','💘','💝','💞','💕','💓','❤️','🩷'];
  for(let i=0;i<18;i++){
    const span = document.createElement('span');
    span.className = 'heart';
    span.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
    span.style.left = Math.random()*100 + 'vw';
    span.style.top = Math.random()*100 + 'vh';
    span.style.animationDelay = (Math.random()*8) + 's';
    hearts.appendChild(span);
  }
});
// Password gate logic with love check
document.addEventListener('DOMContentLoaded', function() {
  const gate = document.getElementById('password-gate');
  const site = document.getElementById('site-content');
  const input = document.getElementById('password-input');
  const btn = document.getElementById('password-btn');
  const error = document.getElementById('password-error');
  const loveCheck = document.getElementById('love-check');
  const loveBtns = loveCheck ? loveCheck.querySelectorAll('.love-btn') : [];
  const loveMsg = document.getElementById('love-check-msg');
  const PASSWORD = 'mahakjain15';
  if(gate && site && input && btn) {
    btn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', function(e){
      if(e.key === 'Enter') tryUnlock();
    });
    function tryUnlock() {
      if(input.value === PASSWORD) {
        // Show love check
        error.style.display = 'none';
        input.style.display = 'none';
        btn.style.display = 'none';
        loveCheck.style.display = 'block';
      } else {
        error.style.display = 'block';
        input.value = '';
        input.focus();
      }
    }
    if(loveBtns && loveBtns.length) {
      loveBtns.forEach(function(loveBtn){
        loveBtn.addEventListener('click', function(){
          const val = loveBtn.getAttribute('data-love');
          if(val === '1') {
            loveMsg.textContent = 'Poor luck, try next time when you love Lakshya bahut jayada!';
            loveMsg.style.color = '#d6336c';
          } else if(val === '2') {
            loveMsg.textContent = 'Welcome to our mini world!';
            loveMsg.style.color = '#2a9d4a';
            setTimeout(()=>{
              gate.style.display = 'none';
              site.style.display = '';
              document.body.classList.add('unlocked');
              animatePages();
            }, 1200);
          } else {
            loveMsg.textContent = 'Not eligible to enter this amazing world of us!!';
            loveMsg.style.color = '#d6336c';
          }
        });
      });
    }
  }
});

// Animated page transitions (Duolingo-inspired)
function animatePages() {
  const pages = document.querySelectorAll('.animated-page');
  let delay = 0;
  pages.forEach((page, i) => {
    page.style.opacity = 0;
    setTimeout(() => {
      page.style.transition = 'opacity 0.7s cubic-bezier(.6,-0.28,.74,.05), transform 0.7s cubic-bezier(.6,-0.28,.74,.05)';
      page.style.opacity = 1;
      page.style.transform = 'translateY(0) scale(1)';
    }, delay);
    page.style.transform = 'translateY(40px) scale(0.98)';
    delay += 250;
  });
}

// Generate Playlist Grid
document.addEventListener('DOMContentLoaded', function() {
  const playlistGrid = document.getElementById('playlistGrid');
  const playlistConfig = window.PLAYLIST_CONFIG || {};
  
  if(playlistGrid && playlistConfig.playlists) {
    playlistGrid.innerHTML = '';
    
    playlistConfig.playlists.forEach(playlist => {
      // Create playlist section
      const section = document.createElement('div');
      section.className = 'playlist-section';
      
      const title = document.createElement('h3');
      title.textContent = playlist.title;
      section.appendChild(title);
      
      const description = document.createElement('p');
      description.className = 'playlist-description';
      description.textContent = playlist.description;
      section.appendChild(description);
      
      const grid = document.createElement('div');
      grid.className = 'playlist-grid';
      
      // Add songs for this playlist
      playlist.songs.forEach(songIndex => {
        const song = playlistConfig.songs[songIndex];
        if(song) {
          const card = document.createElement('div');
          card.className = 'song-card';
          
          card.innerHTML = `
            <h3>${song.name}</h3>
            <div class="artist">${song.artist}</div>
            <a href="${song.spotifyUrl}" target="_blank" class="spotify-btn">
              Play Song
            </a>
          `;
          
          grid.appendChild(card);
        }
      });
      
      section.appendChild(grid);
      playlistGrid.appendChild(section);
    });
  }
});

// Daily Love Message Display
document.addEventListener('DOMContentLoaded', function() {
  const messageText = document.querySelector('.message-text');
  const messageAuthor = document.querySelector('.message-author');
  const newMessageBtn = document.getElementById('newMessageBtn');
  
  function displayMessage(message) {
    if(messageText && messageAuthor) {
      messageText.textContent = `"${message.message}"`;
      messageAuthor.textContent = `— ${message.author}`;
    }
  }
  
  // Display today's message
  // Display a random message on each page open (fallback to daily message if random helper isn't available)
  if(window.getRandomLoveMessage) {
    const randomMsg = window.getRandomLoveMessage();
    if(randomMsg) displayMessage(randomMsg);
  } else if(window.getTodaysLoveMessage) {
    const todaysMessage = window.getTodaysLoveMessage();
    displayMessage(todaysMessage);
  }
  
  // Button to get random message
  if(newMessageBtn) {
    newMessageBtn.addEventListener('click', function() {
      const randomIndex = Math.floor(Math.random() * window.LOVE_MESSAGES.length);
      const randomMessage = window.LOVE_MESSAGES[randomIndex];
      displayMessage(randomMessage);
      
      // Add a little animation
      const messageContent = document.getElementById('messageContent');
      messageContent.style.animation = 'fadeIn 0.6s ease';
    });
  }
});

// Guestbook form (local display + Formspree)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('guestbook-form');
  const messages = document.getElementById('guestbook-messages');
  if(form && messages) {
    form.addEventListener('submit', function(e) {
      const msg = form.message.value.trim();
      const name = form.name.value.trim();
      if(msg) {
        const div = document.createElement('div');
        div.className = 'guestbook-entry';
        div.innerHTML = `<strong>${name||'Anonymous'}:</strong> ${msg}`;
        messages.prepend(div);
      }
    });
  }
});

// Music play/pause
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('audio-player');
  if(btn && audio) {
    btn.addEventListener('click', function(){
      if(audio.paused) {
        audio.play();
        btn.textContent = 'Pause';
      } else {
        audio.pause();
        btn.textContent = 'Play';
      }
    });
  }
});

// Enhanced floating animations with hearts, stars, and petals
function createFloatingElement(type = 'heart') {
  const element = document.createElement('div');
  element.className = type;
  
  const symbols = {
    heart: ['💖', '💕', '💗', '❤️', '💝', '💘'],
    star: ['⭐', '✨', '🌟', '💫', '⋆', '★'],
    petal: ['🌸', '🌺', '🌷', '🌹', '💐', '🏵️']
  };
  
  element.textContent = symbols[type][Math.floor(Math.random() * symbols[type].length)];
  element.style.left = Math.random() * 100 + 'vw';
  element.style.animationDelay = Math.random() * 2 + 's';
  element.style.animationDuration = (Math.random() * 3 + (type === 'heart' ? 8 : type === 'star' ? 12 : 10)) + 's';
  
  return element;
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('floatingHearts');
  if(container) {
    // Create initial elements
    for(let i = 0; i < 8; i++) {
      container.appendChild(createFloatingElement('heart'));
    }
    for(let i = 0; i < 5; i++) {
      container.appendChild(createFloatingElement('star'));
    }
    for(let i = 0; i < 6; i++) {
      container.appendChild(createFloatingElement('petal'));
    }
    
    // Continuously add new elements
    setInterval(() => {
      const types = ['heart', 'star', 'petal'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const element = createFloatingElement(randomType);
      container.appendChild(element);
      
      // Remove element after animation
      setTimeout(() => {
        if(element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 15000);
    }, 2000);
  }
});

// Random Mahak Photo Display
document.addEventListener('DOMContentLoaded', function() {
  const photoElement = document.getElementById('randomMahakPhoto');
  
  if(photoElement && window.SITE_CONFIG && window.SITE_CONFIG.gallery) {
    // Collect all beautiful photos of Mahak (excluding videos)
    const allPhotos = [];
    const galleryMap = window.SITE_CONFIG.gallery;
    
    Object.keys(galleryMap).forEach(folder => {
      galleryMap[folder].forEach(filename => {
        // Only include image files (not videos)
        if(filename.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          allPhotos.push({
            src: `assets/images/${folder}/${filename}`,
            folder: folder
          });
        }
      });
    });
    
    // Select a random photo
    if(allPhotos.length > 0) {
      const randomPhoto = allPhotos[Math.floor(Math.random() * allPhotos.length)];
      photoElement.src = randomPhoto.src;
      
      // Add a subtle fade-in animation
      photoElement.style.opacity = '0';
      photoElement.onload = function() {
        photoElement.style.transition = 'opacity 0.6s ease';
        photoElement.style.opacity = '1';
      };
    }
  }
});

// Story Book Chapter Navigation - Removed (Coming Soon only)
// function showNextChapter() {
//   // Chapter navigation functionality removed - showing Coming Soon only
// }

// Letter Modal Functions
function openLetter() {
  const modal = document.getElementById('letterModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add history state to handle back button
    if (window.history && window.history.pushState) {
      window.history.pushState({ letterOpen: true }, '', window.location.href);
    }
  }
}

function closeLetter() {
  const modal = document.getElementById('letterModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Reply Modal Functions
function showReplyPrompt() {
  const replyModal = document.getElementById('replyModal');
  if (replyModal) {
    replyModal.style.display = 'block';
  }
}

function closeReplyModal() {
  const replyModal = document.getElementById('replyModal');
  if (replyModal) {
    replyModal.style.display = 'none';
  }
}

// Handle browser back button
window.addEventListener('popstate', function(event) {
  const letterModal = document.getElementById('letterModal');
  const replyModal = document.getElementById('replyModal');
  
  if (letterModal && letterModal.style.display === 'block') {
    closeLetter();
  }
  if (replyModal && replyModal.style.display === 'block') {
    closeReplyModal();
  }
});

// Close modals when clicking outside of them
window.addEventListener('click', function(event) {
  const letterModal = document.getElementById('letterModal');
  const replyModal = document.getElementById('replyModal');
  
  if (event.target === letterModal) {
    closeLetter();
  }
  if (event.target === replyModal) {
    closeReplyModal();
  }
});
