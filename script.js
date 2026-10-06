// Petal Grid Templates (10x10 Grid)
const FLOWER_PRESETS = {
  classic: {
    core: [45, 46, 55, 56],
    petals: [
      15, 16, 25, 26, 35, 36, 65, 66, 75, 76, 85, 86,
      41, 42, 43, 44, 47, 48, 49, 50, 51, 52, 53, 54, 57, 58, 59, 60,
      23, 28, 34, 37, 64, 67, 73, 78
    ]
  },
  tulip: {
    core: [55, 56, 65, 66],
    petals: [
      23, 24, 27, 28, 32, 33, 34, 35, 36, 37, 38, 39,
      42, 43, 44, 45, 46, 47, 48, 49, 52, 53, 54, 57, 58, 59, 75, 76
    ]
  },
  star: {
    core: [45, 46, 55, 56],
    petals: [
      5, 6, 15, 16, 25, 26, 35, 36, 65, 66, 75, 76, 85, 86, 95, 96,
      41, 42, 43, 44, 47, 48, 49, 50, 57, 58, 59, 60,
      23, 28, 34, 37, 64, 67, 73, 78
    ]
  }
};

// Nighttime Secret Messages
const NIGHT_NOTES = [
  "You found me. 🌷",
  "Taking a tiny rest in the garden...",
  "Thanks for visiting tonight. ✨",
  "The garden is happy you're here.",
  "A little quiet moment, just for you."
];

// Daytime Secret Messages
const DAY_NOTES = [
  "Good morning, sunbeam. ☀️",
  "Soaking up some daylight... 🌻",
  "The petals are warm and happy today. 🌷",
  "You found me in the sunlight! ✨",
  "A bright little moment, just for you."
];

// DOM Elements
const gardenBed = document.getElementById('gardenBed');
const plantBtn = document.getElementById('plantBtn');
const waterBtn = document.getElementById('waterBtn');
const modeBtn = document.getElementById('modeBtn');
const rainBtn = document.getElementById('rainBtn');
const secretModal = document.getElementById('secretModal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');
const rainContainer = document.getElementById('rainContainer');

// Plant a new flower
function createFlower(type = 'classic', color = '#FF8BC7', secretNote = null) {
  if (!gardenBed || gardenBed.children.length >= 5) return;

  const container = document.createElement('div');
  container.className = 'flower-container';

  const flower = document.createElement('div');
  flower.className = 'flower';

  const stem = document.createElement('div');
  stem.className = 'stem';
  
  const leafL = document.createElement('div');
  leafL.className = 'leaf leaf-left';
  const leafR = document.createElement('div');
  leafR.className = 'leaf leaf-right';

  stem.appendChild(leafL);
  stem.appendChild(leafR);

  const grid = document.createElement('div');
  grid.className = 'petal-grid';

  const preset = FLOWER_PRESETS[type] || FLOWER_PRESETS.classic;

  for (let i = 1; i <= 100; i++) {
    const span = document.createElement('span');
    if (preset.core.includes(i)) {
      span.className = 'core';
    } else if (preset.petals.includes(i)) {
      span.style.backgroundColor = color;
      span.style.boxShadow = `0 0 4px ${color}`;
    }
    grid.appendChild(span);
  }

  flower.appendChild(grid);
  flower.appendChild(stem);
  container.appendChild(flower);

  // Click Interaction
  let clickCount = 0;

  container.addEventListener('click', (e) => {
    flower.classList.add('happy');
    spawnSparkles(e.clientX, e.clientY);
    clickCount++;

    if (clickCount === 3) {
      const isDay = document.body.classList.contains('day-mode');
      const pool = isDay ? DAY_NOTES : NIGHT_NOTES;
      const noteToDisplay = secretNote || pool[Math.floor(Math.random() * pool.length)];
      showSecretModal(noteToDisplay);
    }

    setTimeout(() => flower.classList.remove('happy'), 500);
  });

  gardenBed.appendChild(container);
}

// Secret Note Modal
function showSecretModal(text) {
  if (!secretModal || !modalMessage) return;
  modalMessage.innerText = text;
  secretModal.classList.add('active');
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    secretModal.classList.remove('active');
  });
}

// Sparkle Spawner
function spawnSparkles(x, y) {
  const icons = ['✨', '🌸', '💗', '⭐'];
  for (let i = 0; i < 4; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerText = icons[Math.floor(Math.random() * icons.length)];
    sparkle.style.left = `${x + (Math.random() * 30 - 15)}px`;
    sparkle.style.top = `${y + (Math.random() * 30 - 15)}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  }
}

// Fireflies Spawner
function spawnFireflies() {
  for (let i = 0; i < 8; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = `${Math.random() * 90}vw`;
    firefly.style.top = `${Math.random() * 70}vh`;

    firefly.addEventListener('click', (e) => {
      e.stopPropagation();
      const isDay = document.body.classList.contains('day-mode');
      const message = isDay 
        ? "You caught a little sunbeam dancing through the air! ☀️" 
        : "You caught a wandering firefly! ✨";
        
      showSecretModal(message);
      firefly.remove();
    });

    document.body.appendChild(firefly);
  }
}

// Rain Droplets
function setupRain() {
  if (!rainContainer) return;
  for (let i = 0; i < 40; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${Math.random() * 0.8}s`;
    rainContainer.appendChild(drop);
  }
}

// Event Listeners
if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('day-mode');
    document.body.classList.toggle('night-mode');
    modeBtn.innerText = document.body.classList.contains('day-mode') ? '🌙 Night' : '☀️ Day';
  });
}

if (rainBtn) {
  rainBtn.addEventListener('click', () => {
    if (rainContainer) rainContainer.classList.toggle('active');
    rainBtn.classList.toggle('active');
    document.body.classList.toggle('rain-active');
  });
}

if (plantBtn) {
  plantBtn.addEventListener('click', () => {
    const typeSelect = document.getElementById('flowerType');
    const colorInput = document.getElementById('flowerColor');
    const type = typeSelect ? typeSelect.value : 'classic';
    const color = colorInput ? colorInput.value : '#FF8BC7';
    createFlower(type, color);
  });
}

if (waterBtn) {
  waterBtn.addEventListener('click', () => {
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach((flower, idx) => {
      setTimeout(() => {
        flower.classList.add('happy');
        const rect = flower.getBoundingClientRect();
        spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        setTimeout(() => flower.classList.remove('happy'), 500);
      }, idx * 150);
    });
  });
}

// Initialize
createFlower('classic', '#FF8BC7');
createFlower('star', '#FFD166');
spawnFireflies();
setupRain();