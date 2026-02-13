// Theme Customizer
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Available themes
  const themes = [
    'pink-romantic', // default
    'dark-romantic',
    'light-dreamy'
  ];
  
  let currentTheme = 0;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('mahak-theme');
  if(savedTheme) {
    currentTheme = themes.indexOf(savedTheme);
    if(currentTheme === -1) currentTheme = 0;
  }
  
  // Apply theme
  function applyTheme(themeName) {
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${themeName}`);
    localStorage.setItem('mahak-theme', themeName);
  }
  
  // Initialize theme
  applyTheme(themes[currentTheme]);
  
  // Theme toggle button
  if(themeToggle) {
    themeToggle.addEventListener('click', function() {
      currentTheme = (currentTheme + 1) % themes.length;
      applyTheme(themes[currentTheme]);
      
      // Show theme name briefly
      const themeName = themes[currentTheme].replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      themeToggle.title = `Theme: ${themeName}`;
      
      // Animation feedback
      themeToggle.style.transform = 'scale(1.2)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
      }, 200);
    });
  }
});