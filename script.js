// Application State
let currentStep = 1;
const totalSteps = 9;
let heartCount = 1;

// Floating background particles generator
function initConfettiBackground() {
  const container = document.getElementById('confetti-bg');
  if (!container) return;
  const particles = [
    { top: '8%', left: '6%', color: '#ef4444', rotate: '12deg', shape: 'rect' },
    { top: '12%', left: '14%', color: '#f59e0b', rotate: '-25deg', shape: 'square' },
    { top: '22%', left: '8%', color: '#3b82f6', rotate: '45deg', shape: 'circle' },
    { top: '16%', left: '2%', color: '#10b981', rotate: '80deg', shape: 'rect' },
    { top: '5%', right: '8%', color: '#ec4899', rotate: '-15deg', shape: 'rect' },
    { top: '14%', right: '18%', color: '#8b5cf6', rotate: '30deg', shape: 'square' },
    { top: '24%', right: '4%', color: '#f97316', rotate: '-45deg', shape: 'circle' },
    { top: '35%', left: '4%', color: '#06b6d4', rotate: '18deg', shape: 'rect' },
    { top: '45%', left: '7%', color: '#eab308', rotate: '-35deg', shape: 'square' },
    { top: '38%', right: '6%', color: '#22c55e', rotate: '60deg', shape: 'rect' },
    { top: '52%', right: '3%', color: '#f43f5e', rotate: '-20deg', shape: 'square' },
    { top: '65%', left: '3%', color: '#6366f1', rotate: '40deg', shape: 'circle' },
    { top: '78%', left: '8%', color: '#14b8a6', rotate: '-10deg', shape: 'rect' },
    { top: '70%', right: '7%', color: '#f59e0b', rotate: '35deg', shape: 'rect' },
    { top: '84%', right: '4%', color: '#a855f7', rotate: '-50deg', shape: 'circle' },
    { top: '90%', left: '12%', color: '#ef4444', rotate: '25deg', shape: 'square' },
    { top: '92%', right: '12%', color: '#06b6d4', rotate: '-30deg', shape: 'rect' },
  ];

  container.innerHTML = '';
  particles.forEach((p, idx) => {
    const el = document.createElement('div');
    el.className = 'bg-confetti-particle';
    el.style.top = p.top;
    if (p.left) el.style.left = p.left;
    if (p.right) el.style.right = p.right;
    el.style.transform = `rotate(${p.rotate})`;
    el.style.animationDelay = `${(idx % 5) * 0.4}s`;
    el.style.animationDuration = `${3 + (idx % 3)}s`;

    const inner = document.createElement('div');
    inner.style.backgroundColor = p.color;
    if (p.shape === 'rect') {
      inner.style.width = '14px';
      inner.style.height = '28px';
      inner.style.borderRadius = '2px';
    } else if (p.shape === 'square') {
      inner.style.width = '16px';
      inner.style.height = '16px';
      inner.style.borderRadius = '2px';
    } else {
      inner.style.width = '14px';
      inner.style.height = '14px';
      inner.style.borderRadius = '50%';
    }
    el.appendChild(inner);
    container.appendChild(el);
  });
}

// Confetti burst functions
function triggerCelebrationConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.65 }
  });
}

function triggerFullPageConfetti() {
  if (typeof confetti !== 'function') return;
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 }
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// Navigation & Screen Management
function updateStepUI() {
  document.querySelectorAll('.step-screen').forEach((screen) => {
    screen.classList.remove('active');
  });

  const activeScreen = document.getElementById(`step-${currentStep}`);
  if (activeScreen) {
    activeScreen.classList.add('active');
  }

  // Update counter
  document.getElementById('step-counter').textContent = `${currentStep}/${totalSteps}`;

  // Update back button
  const backBtn = document.getElementById('back-btn');
  backBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';

  // Toggle ambient decor on page 9
  const decor = document.getElementById('ambient-decor');
  if (decor) {
    if (currentStep === 9) {
      decor.classList.add('active');
    } else {
      decor.classList.remove('active');
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger step-specific actions
  if (currentStep === 3) {
    startCountersAnimation();
  } else if (currentStep === 8) {
    startDramaticSequence();
  }
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepUI();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
}

function startJourney() {
  triggerCelebrationConfetti();
  nextStep();
}

function exitToStart() {
  closeFinaleOverlay();
  currentStep = 1;
  updateStepUI();
  triggerCelebrationConfetti();
}

// Photo Upload for Step 2
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = document.getElementById('polaroid-img');
      const placeholder = document.getElementById('polaroid-placeholder');
      img.src = evt.target.result;
      img.style.display = 'block';
      placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

// Animated Counters for Step 3
function startCountersAnimation() {
  let bro = 810;
  let arg = 48;
  let leave = 88;

  const timer = setInterval(() => {
    if (bro < 847) bro += 3;
    if (arg < 62) arg += 1;
    if (leave < 103) leave += 1;

    document.getElementById('counter-bro').textContent = bro;
    document.getElementById('counter-arg').textContent = arg;
    document.getElementById('counter-leave').textContent = leave;

    if (bro >= 847 && arg >= 62 && leave >= 103) {
      clearInterval(timer);
    }
  }, 40);
}

// Starter Pack Data & Rendering (Step 4 - with effects!)
const starterItems = [
  { icon: '🎧', title: 'Random conversations', desc: 'Maybe starting with a reel and it goes onn .....  Topic: unknown.' },
  { icon: '📱', title: '"Bro look at this"', desc: 'Sent many unfunny reels . But still.' },
  { icon: '🍟', title: 'Dine out plans', desc: "planned n number of times but happened twice or thrice maybe" },
  { icon: '😂', title: 'Laughing at nothing', desc: 'Nobody said anything. We listen wee judge.' },
  { icon: '🧠', title: 'Overthinking', desc: 'A 3-word text analyzed like a crime scene.' },
  { icon: '💬', title: '"BRO I NEED TO TELL YOU SOMETHING"', desc: 'It was never urgent. It was always gossip or some overthinking stuffs..' },
  { icon: '🗣️', title: 'Talking for no reason', desc: 'No point. No topic. Two hours gone.' },
  { icon: '😴', title: '"I\'ll sleep early today"', desc: 'Biggest lie ever told. Repeatedly.' },
];

function initStarterPack() {
  const container = document.getElementById('starter-grid');
  if (!container) return;
  container.innerHTML = '';
  starterItems.forEach((it) => {
    const btn = document.createElement('button');
    btn.className = 'starter-item-btn';
    btn.innerHTML = `
      <div class="starter-emoji">${it.icon}</div>
      <div class="starter-name">${it.title}</div>
    `;
    btn.onclick = (e) => {
      btn.classList.add('viewed');
      if (!btn.querySelector('.card-check-dot')) {
        const check = document.createElement('span');
        check.className = 'card-check-dot';
        check.textContent = '✓';
        btn.appendChild(check);
      }

      // Micro confetti pop from clicked card
      if (typeof confetti === 'function') {
        const rect = btn.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { x, y },
          colors: ['#fde047', '#38bdf8', '#fb923c', '#4ade80', '#f43f5e']
        });
      }

      setTimeout(() => {
        openModal(it.icon, it.title, '', it.desc);
      }, 120);
    };
    container.appendChild(btn);
  });
}

// Normal Habits Data & Rendering (Step 5)
let habitNotes = [
  { text: 'We can turn a 2-minute conversation into a 3-hour discussion', bg: 'bg-yellow', rot: 'rot-neg2' },
  { text: 'Sending something completely random and expecting an immediate reaction.', bg: 'bg-blue', rot: 'rot-pos1' },
  { text: 'Understanding what the other person means from one word.', bg: 'bg-green', rot: 'rot-neg1' },
  { text: 'Talking about something neither of us actually cares about.', bg: 'bg-orange', rot: 'rot-pos2' },
  { text: "Saying 'okay bye' approximately 17 times before actually leaving.", bg: 'bg-red', rot: 'rot-neg2' },
  { text: 'Having conversations that make no sense when explained to other people.', bg: 'bg-purple', rot: 'rot-pos1' },
  { text: 'Knowing something is a terrible idea and doing it anyway.', bg: 'bg-yellow', rot: 'rot-neg1' },
];

function renderHabits() {
  const grid = document.getElementById('habits-grid');
  if (!grid) return;
  grid.innerHTML = '';
  habitNotes.forEach((h) => {
    const card = document.createElement('div');
    card.className = `habit-note ${h.bg} ${h.rot}`;
    card.textContent = h.text;
    grid.appendChild(card);
  });
}

function showAddHabitInput() {
  document.getElementById('add-habit-btn').style.display = 'none';
  document.getElementById('add-habit-form').style.display = 'flex';
  document.getElementById('habit-input').focus();
}

function hideAddHabitInput() {
  document.getElementById('add-habit-btn').style.display = 'inline-block';
  document.getElementById('add-habit-form').style.display = 'none';
  document.getElementById('habit-input').value = '';
}

function handleNewHabit(e) {
  e.preventDefault();
  const val = document.getElementById('habit-input').value.trim();
  if (!val) return;
  const colors = ['bg-yellow', 'bg-blue', 'bg-green', 'bg-orange', 'bg-red', 'bg-purple'];
  const rotations = ['rot-neg2', 'rot-pos2', 'rot-neg1', 'rot-pos1'];
  habitNotes.push({
    text: val,
    bg: colors[Math.floor(Math.random() * colors.length)],
    rot: rotations[Math.floor(Math.random() * rotations.length)]
  });
  renderHabits();
  hideAddHabitInput();
}

// Corporation Floors (Step 6)
const floorsData = [
  { floor: '5', name: 'CHAOS DEPARTMENT', bg: 'bg-red', icon: '🤪', subtitle: 'Responsible for approximately 97% of our questionable decisions.', modalDesc: 'Current status: on fire. As usual.' },
  { floor: '4', name: 'THERAPY DEPARTMENT', bg: 'bg-green', icon: '📋', subtitle: 'For complaints, overthinking and unnecessary life analysis.', modalDesc: 'Session fee: one snack. Open 24/7...' },
  { floor: '3', name: 'FBI DEPARTMENT', bg: 'bg-blue', icon: '🕵️', subtitle: 'Because apparently we know everything.', modalDesc: 'Case files: everyone. Sources: confidential.' },
  { floor: '2', name: 'COMEDY DEPARTMENT', bg: 'bg-yellow', icon: '🎤', subtitle: 'Jokes that stopped being funny months ago.', modalDesc: 'Still telling them. Still laughing. No regrets.' },
  { floor: '1', name: 'EMERGENCY DEPARTMENT', bg: 'bg-orange', icon: '🚨', subtitle: 'For messages beginning with BROOOOO I NEED TO TELL YOU SOMETHING', modalDesc: 'response time: 0.00000001sec' },
];

function initCorporation() {
  const list = document.getElementById('floors-list');
  if (!list) return;
  list.innerHTML = '';
  floorsData.forEach((f) => {
    const btn = document.createElement('button');
    btn.className = `floor-bar-btn ${f.bg}`;
    btn.innerHTML = `
      <div class="floor-emoji">${f.icon}</div>
      <div>
        <div class="floor-title">FLOOR ${f.floor} - ${f.name}</div>
        <div class="floor-subtitle">${f.subtitle}</div>
      </div>
    `;
    btn.onclick = () => openModal(f.icon, f.name.replace('DEPARTMENT', 'Department'), '', f.modalDesc);
    list.appendChild(btn);
  });
}

// Awards Data (Step 7 - with Golden Victory Explosion!)
const awardsData = [
  { title: 'Best "BRO LISTEN" Performance', bg: 'bg-yellow' },
  { title: 'Most Unnecessary Conversation', bg: 'bg-blue' },
  { title: 'Fastest Mood Change', bg: 'bg-green' },
  { title: 'Best Terrible Decision', bg: 'bg-orange' },
  { title: 'Most Random Topic Transition', bg: 'bg-red' },
  { title: 'Lifetime Achievement in Nonsense', bg: 'bg-purple' },
  { title: 'Professional Overthinker Award', bg: 'bg-yellow' },
  { title: 'Best Person To Send Completely Random Things To', bg: 'bg-cyan' },
];

function initAwards() {
  const grid = document.getElementById('awards-grid');
  if (!grid) return;
  grid.innerHTML = '';
  awardsData.forEach((a) => {
    const btn = document.createElement('button');
    btn.className = `award-card-btn ${a.bg}`;
    btn.innerHTML = `
      <div class="award-trophy">🏆</div>
      <div class="award-name">${a.title}</div>
    `;
    btn.onclick = (e) => {
      // Golden victory confetti blast
      if (typeof confetti === 'function') {
        const rect = btn.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 50,
          spread: 80,
          startVelocity: 35,
          origin: { x, y },
          colors: ['#ffd700', '#facc15', '#f59e0b', '#fbbf24', '#ffffff']
        });
      }

      setTimeout(() => {
        openModal('🏆', a.title, 'Winner: Louisss', 'Congratulations. Unfortunately, you cannot escape this friendship.');
      }, 150);
    };
    grid.appendChild(btn);
  });
}

// Step 8: Strict Line-by-Line Staggered Reveal
function startDramaticSequence() {
  const lines = [
    'dram-line-1',
    'dram-line-2',
    'dram-line-3',
    'dram-line-4',
    'dram-line-5',
    'dram-line-6',
    'dram-line-7',
    'dram-next-btn'
  ];

  // Reset lines
  lines.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('revealed');
  });

  const delays = [400, 1300, 2400, 3700, 4800, 5600, 6400, 7000];

  delays.forEach((delay, idx) => {
    setTimeout(() => {
      if (currentStep === 8) {
        const el = document.getElementById(lines[idx]);
        if (el) el.classList.add('revealed');
      }
    }, delay);
  });
}

// Step 9: Heart love reaction
function sendHeartLove(e) {
  heartCount++;
  const display = document.getElementById('heart-count-display');
  if (display) display.textContent = `x${heartCount}`;

  if (typeof confetti === 'function') {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x, y },
      colors: ['#f43f5e', '#ec4899', '#fda4af', '#f472b6']
    });
  }
}

// Modal System
function openModal(icon, title, subtitle, desc) {
  document.getElementById('modal-icon').textContent = icon || '';
  document.getElementById('modal-title').textContent = title || '';
  document.getElementById('modal-subtitle').textContent = subtitle || '';
  document.getElementById('modal-desc').textContent = desc || '';
  document.getElementById('app-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('app-modal').classList.remove('open');
}

// Finale Overlay
function openFinaleOverlay() {
  document.getElementById('finale-overlay').classList.add('open');
  triggerCelebrationConfetti();
  triggerFullPageConfetti();
}

function closeFinaleOverlay() {
  document.getElementById('finale-overlay').classList.remove('open');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeFinaleOverlay();
  } else if (e.key === 'ArrowLeft' && currentStep > 1) {
    prevStep();
  }
});

// Initial boot
window.addEventListener('DOMContentLoaded', () => {
  initConfettiBackground();
  initStarterPack();
  renderHabits();
  initCorporation();
  initAwards();
  updateStepUI();
});