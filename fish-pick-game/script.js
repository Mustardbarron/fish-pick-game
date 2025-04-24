const tank = document.getElementById('tank');
const selectedFishDiv = document.getElementById('selectedFish');
const timerDisplay = document.getElementById('timer');

const personalities = ['Brave', 'Lazy', 'Curious', 'Aggressive', 'Playful', 'Shy'];
const abilities = ['Speed Boost', 'Hides', 'Attracts', 'Sees Hidden', 'Double Swim', 'Spins'];

let fishList = [];
let selectedFish = [];
let swimming = true;

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createFish(id) {
  const fish = document.createElement('div');
  fish.classList.add('fish');
  fish.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
  fish.style.left = `${Math.random() * 550}px`;
  fish.style.top = `${Math.random() * 350}px`;

  const personality = getRandomItem(personalities);
  const ability = getRandomItem(abilities);
  const name = `Fish ${id + 1}`;

  fish.innerText = id + 1;
  fish.dataset.name = name;
  fish.dataset.personality = personality;
  fish.dataset.ability = ability;

  fish.addEventListener('click', () => selectFish(fish));

  tank.appendChild(fish);
  fishList.push(fish);

  swimAround(fish);
}

function swimAround(fish) {
  if (!swimming) return;
  const moveInterval = setInterval(() => {
    if (!swimming) return clearInterval(moveInterval);
    fish.style.left = `${Math.random() * 550}px`;
    fish.style.top = `${Math.random() * 350}px`;
  }, 1000 + Math.random() * 1000);
}

function selectFish(fish) {
  if (!swimming && selectedFish.length < 2 && !selectedFish.includes(fish)) {
    selectedFish.push(fish);
    fish.style.border = '3px solid gold';
    showSelectedFish();
  }
}

function showSelectedFish() {
  if (selectedFish.length === 2) {
    const info = selectedFish.map(f => `
      <strong>${f.dataset.name}</strong><br/>
      Personality: ${f.dataset.personality}<br/>
      Ability: ${f.dataset.ability}<br/>
    `).join('<br/>');
    selectedFishDiv.innerHTML = `<h2>Your Team</h2>${info}`;
  }
}

function startGame() {
  for (let i = 0; i < 6; i++) {
    createFish(i);
  }

  let timeLeft = 60;
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Swimming... ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      swimming = false;
      timerDisplay.textContent = 'Time’s up! Choose two fish.';
    }
  }, 1000);
}

startGame();
