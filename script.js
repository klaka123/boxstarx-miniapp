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
  planeEl.style.transform = 'translate(0,0)';
  
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
  const planeWidth = document.querySelector('.plane-area').offsetWidth - 50;
  let posX = 0;
  let speed = 0.5; // медленный взлёт
  let dropChance = 0.01; // шанс резкого падения

  const flight = setInterval(() => {
    if(!planeFlying) return clearInterval(flight);

    posX += speed;
    planeValue += speed * 0.02;

    // Резкое падение
    if(Math.random() < dropChance) {
      planeFlying = false;
      alert(`Самолет резко упал! Вы заработали: ${Math.floor(planeValue*10)} ⭐`);
      updateBalance(Math.floor(planeValue*10));
      planeEl.style.transform = `translate(0,0)`;
      clearInterval(flight);
      startPlaneGame(); // новый раунд
      return;
    }

    planeEl.style.transform = `translateX(${posX}px)`;

    if(posX >= planeWidth) {
      planeFlying = false;
      alert(`Самолет улетел! Вы заработали: ${Math.floor(planeValue*10)} ⭐`);
      updateBalance(Math.floor(planeValue*10));
      planeEl.style.transform = `translate(0,0)`;
      clearInterval(flight);
      startPlaneGame(); // новый раунд
    }
  }, 20);
}

cashoutBtn.onclick = () => {
  if(planeFlying) {
    const earned = Math.floor(planeValue*10);
    updateBalance(earned);
    alert(`Вы забрали: ${earned} ⭐`);
    planeFlying = false;
    planeEl.style.transform = 'translate(0,0)';
  }
}

startPlaneGame();
