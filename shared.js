// Shared Utilities Across e-clock.top (shared.js)
// 1. Disable Right Click
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. Restore Light/Dark Mode Preference Immediately
try {
  if (localStorage.getItem('eclock-theme') === 'light') {
    document.documentElement.classList.add('light-mode');
  }
} catch (e) {}

// 3. Shared Quote of the Day Loader
async function loadQuotes() {
  const quoteEl = document.getElementById('quote-display');
  if (!quoteEl) return;

  const fallbackQuotes = [
    { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "Time flies over us, but leaves its shadow behind.", author: "Nathaniel Hawthorne" }
  ];
  try {
    const res = await fetch('motivational_quotes.csv');
    if (!res.ok) throw new Error('CSV fetch failed');
    const csvText = await res.text();
    const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length > 1) {
      const randomLine = lines[Math.floor(Math.random() * (lines.length - 1)) + 1];
      const match = randomLine.match(/^"?(.*?)"?,\s*"?(.*?)"?$/);
      if (match && match[1]) {
        quoteEl.innerHTML = `
          <div class="quote-text">"${match[1]}"</div>
          <div class="quote-author">— ${match[2] || 'Unknown'}</div>
        `;
        return;
      }
    }
  } catch (e) {}
  const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  quoteEl.innerHTML = `
    <div class="quote-text">"${quote.text}"</div>
    <div class="quote-author">— ${quote.author}</div>
  `;
}

// 4. Bind Fullscreen, Light/Dark Mode Toggles, Quote Loader & Service Worker on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const fsBtn = document.getElementById('fullscreen-toggle');
  if (fsBtn && !fsBtn.dataset.sharedBound) {
    fsBtn.dataset.sharedBound = 'true';
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          alert(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  const lightBtn = document.getElementById('lightModeToggle');
  if (lightBtn && !lightBtn.dataset.sharedBound) {
    lightBtn.dataset.sharedBound = 'true';
    lightBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-mode');
      try {
        localStorage.setItem('eclock-theme', isLight ? 'light' : 'dark');
      } catch (e) {}
    });
  }

  if (document.getElementById('quote-display')) {
    loadQuotes();
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }
});
