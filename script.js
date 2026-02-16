// HUD после ракеты
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    document.getElementById('rocketLauncher').remove();
  }, 3000);
});

// Таймер до взлета
let timer = 10;
const timerEl = document.getElementById('timer');
let timerInterval = setInterval(() => {
  timer--;
  timerEl.textContent = timer;
  if(timer <= 0){
    clearInterval(timerInterval);
    startAirplane();
  }
}, 1000);

// Самолет
function startAirplane(){
  const plane = document.getElementById('airplane');
  let multiplier = 1;
  plane.style.transition = 'transform 10s linear';
  plane.style.transform = 'translateY(-200px) translateX(0)';

  // Случайное падение самолета
  const dropRates = [1,1.1,1.2,1.5,1.7,5,10,25,50,150];
  multiplier = dropRates[Math.floor(Math.random()*dropRates.length)];

  setTimeout(()=>{
    alert(`Самолет упал на ${multiplier}x!`);
    plane.style.transform = 'translateY(0)';
    timer = 10;
    timerEl.textContent = timer;
    timerInterval = setInterval(() => {
      timer--;
      timerEl.textContent = timer;
      if(timer <= 0){
        clearInterval(timerInterval);
        startAirplane();
      }
    }, 1000);
  }, 10000);
}

// Кейсы
document.querySelectorAll('.case').forEach(c => {
  c.addEventListener('click', () => {
    const price = parseInt(c.dataset.price);
    const balanceEl = document.getElementById('balance');
    let balance = parseInt(balanceEl.textContent);
    if(balance < price){
      alert('Недостаточно ⭐');
      return;
    }
    balance -= price;
    balanceEl.textContent = balance;

    // Дроп
    let chance = Math.random()*100;
    let reward;
    if(price==50){
      reward = chance < 70 ? 25 : chance < 85 ? 50 : 100;
    } else if(price==100){
      reward = chance < 70 ? 50 : chance < 85 ? 100 : 200;
    } else {
      reward = chance < 70 ? 100 : chance < 85 ? 200 : 500;
    }

    alert(`Вы получили ${reward} ⭐!`);
    balance += reward;
    balanceEl.textContent = balance;
  });
});

// Пополнение
document.getElementById('depositBtn').a
