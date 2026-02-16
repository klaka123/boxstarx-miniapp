let balance = 1000;
const balanceEl = document.getElementById('balance');

function updateBalance(amount) {
  balance += amount;
  balanceEl.textContent = balance;
}

// ======= КЕЙСЫ =======
document.querySelectorAll('.case').forEach(caseEl => {
  caseEl.addEventListener('click', () => {
    const price = Number(caseEl.dataset.price);
    if(balance < price) return alert('Недостаточно ⭐');
    updateBalance(-price);
    caseEl.classList.add('opening');
    setTimeout(() => {
      caseEl.classList.remove('opening');
      const reward = getCaseReward(price);
      alert(`Вы получили: ${reward} ⭐`);
      updateBalance(reward);
    }, 1000);
  });
});

function getCaseReward(price) {
  const rand = Math.random();
  if(price === 50) {
    if(rand < 0.7) return 25;
    if(rand < 0.85) return 50;
    return 100;
  }
  if(price === 100) {
    if(rand < 0.7) return 50;
    if(rand < 0.85) return 100;
    return 200;
  }
  if(price === 500) {
    if(rand < 0.7) return 250;
    if(rand < 0.85) return 500;
    return 1000;
  }
}

// ======= ПОПОЛНЕНИЕ =======
const depositBtn = document.getElementById('depositBtn');
const modal = document.getElementById('depositModal');
const closeModal = document.querySelector('.close');
const confirmDeposit = document.getElementById('confirmDeposit');

depositBtn.onclick = () => modal.style.display = 'flex';
closeModal.onclick = () => modal.style.display = 'none';
confirmDeposit.onclick = () => {
  const val = Number(document.getElementById('depositAmount').value);
  if(val < 10) return alert('Минимум 10 ⭐');
  updateBalance(val);
  modal.style.display = 'none';
};

// ======= САМОЛЕТ =======
let planeTimer = 10;
let planeFlying = false;
let planeValue = 1;
const planeEl = document.getElementById('plane');
const planeTimerEl = document.getElementById('planeTimer');
const cashoutBtn = document.getElementById('cashoutBtn');

function startPlaneGame() {
  planeTimer = 10;
  planeValue = 1;
  planeFlying = false;
  planeEl.style.transform = 'translateY(0)';
  const countdown = setInterval(() => {
    planeTimer--;
    planeTimerEl.textContent = planeTimer;
    if(planeTimer <= 0) {
      clearInterval(countdown);
      planeFlying = true;
      flyPlane();
    }
  }, 1000);
}

function flyPlane() {
  const duration = 20000; // 20 секунд макс
  const start = Date.now();
  const multiplier = getPlaneMultiplier();
  const flight = setInterval(() => {
    const t = (Date.now() - start)/duration;
    if(t >= 1 || planeValue >= multiplier) {
      clearInterval(flight);
      planeFlying = false;
      alert(`Самолет упал! Вы заработали: ${Math.floor(planeValue*10)} ⭐`);
      updateBalance(Math.floor(planeValue*10));
      return;
    }
    planeValue += 0.01;
    planeEl.style.transform = `translateY(-${planeValue*10}px)`;
  }, 50);
}

function getPlaneMultiplier() {
  const rand = Math.random();
  if(rand < 0.5) return 1.2 + Math.random()*0.5; // 1.2 - 1.7
  if(rand < 0.85) return 2 + Math.random()*8; // 2 - 10
  return 150; // редкий шанс
}

cashoutBtn.onclick = () => {
  if(planeFlying) {
    const earned = Math.floor(planeValue*10);
    updateBalance(earned);
    alert(`Вы забрали: ${earned} ⭐`);
    planeFlying = false;
    planeEl.style.transform = 'translateY(0)';
  }
}

startPlaneGame();
