// Hamburger menu
const toggleButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

toggleButton.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// Theme switching
const themeButtons = document.querySelectorAll(".menu button");
const themes = ["white", "dark", "darkblue", "bordeaux"];

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedTheme = button.dataset.theme;

    themes.forEach(theme =>
      document.body.classList.remove(theme)
    );

    document.body.classList.add(selectedTheme);

    // close menu after selection
    menu.classList.remove("open");
  });
});

const audio = document.getElementById("audio");
const playBtn = document.querySelector(".play-btn");
const icon = playBtn.querySelector("i");

const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

let isPlaying = false;

// Play / Pause
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    icon.className = "fa-solid fa-pause";
  } else {
    audio.pause();
    icon.className = "fa-solid fa-play";
  }
  isPlaying = !isPlaying;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

// Click to seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Reset when song ends
audio.addEventListener("ended", () => {
  isPlaying = false;
  icon.className = "fa-solid fa-play";
  progress.style.width = "0%";
});

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// format seconds → m:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// set duration once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// update current time
audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});
document.addEventListener("keydown", (e) => {
  // prevent space from scrolling
  if (e.code === "Space") e.preventDefault();

  // Play / Pause
  if (e.code === "Space") {
    playBtn.click();
  }

  // Seek forward
  if (e.code === "ArrowRight") {
    audio.currentTime = Math.min(
      audio.currentTime + 5,
      audio.duration
    );
  }

  // Seek backward
  if (e.code === "ArrowLeft") {
    audio.currentTime = Math.max(
      audio.currentTime - 5,
      0
    );
  }

  // Mute
  if (e.key.toLowerCase() === "m") {
    audio.muted = !audio.muted;
  }
});
