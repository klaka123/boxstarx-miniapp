let balance = 0;

// Пополнение
document.getElementById('topupBtn').onclick = () => {
  let amount = parseInt(document.getElementById('amount').value);
  if (amount >= 10) {
    alert(`Вы пополнили ${amount} ⭐ через @BoxstarxBot`);
    balance += amount;
    document.getElementById('balance').innerText = balance;
  } else {
    alert('Минимум 10⭐');
  }
};

// Кейсы
document.querySelectorAll('.case').forEach(c => {
  c.onclick = () => {
    let caseValue = parseInt(c.dataset.case);
    if (balance >= caseValue) {
      balance -= caseValue;
      document.getElementById('balance').innerText = balance;
      openCase(caseValue);
    } else {
      alert('Недостаточно звезд');
    }
  };
});

function openCase(caseValue) {
  // Анимация открытия кейса
  alert(`Открыт кейс за ${caseValue}⭐`);
  // Дроп логика
  let rand = Math.random() * 100;
  let prize = 0;
  if (caseValue === 50) {
    if (rand <= 70) prize = 25;
    else if (rand <= 85) prize = 50;
    else prize = 100;
  } else if (caseValue === 100) {
    if (rand <= 50) prize = 50;
    else if (rand <= 80) prize = 100;
    else prize = 200;
  } else if (caseValue === 500) {
    if (rand <= 50) prize = 100;
    else if (rand <= 85) prize = 250;
    else prize = 500;
  }
  balance += prize;
  alert(`Вы выиграли ${prize}⭐!`);
  document.getElementById('balance').innerText = balance;
}

// Самолет
let planeInterval, planeMultiplier = 1, flying = false;
let planeTimerEl = document.getElementById('planeTimer');
let planeEl = document.getElementById('plane');

document.getElementById('startPlane').onclick = () => {
  let bet = parseInt(document.getElementById('planeBet').value);
  if (bet >= 10 && bet <= balance) {
    balance -= bet;
    document.getElementById('balance').innerText = balance;
    startPlaneGame(bet);
  } else alert('Ставка минимальна 10⭐ и не больше баланса');
};

function startPlaneGame(bet) {
  let countdown = 10;
  planeTimerEl.innerText = `До взлета: ${countdown}`;
  let timer = setInterval(() => {
    countdown--;
    planeTimerEl.innerText = `До взлета: ${countdown}`;
    if (countdown <= 0) {
      clearInterval(timer);
      takeOff(bet);
    }
  }, 1000);
}

function takeOff(bet) {
  flying = true;
  document.getElementById('cashout').disabled = false;
  planeMultiplier = 1;
  planeInterval = setInterval(() => {
    // Рост мультипликатора
    planeMultiplier += Math.random() * 0.1;
    // Случайное падение
    let fallChance = Math.random() * 100;
    if (fallChance < 5) planeMultiplier = 0;
    planeEl.style.bottom = `${planeMultiplier * 10}px`;
    if (planeMultiplier === 0) {
      clearInterval(planeInterval);
      flying = false;
      alert('Самолет упал! Ставка проиграна.');
    }
  }, 200);
}

// Забрать ставку
document.getElementById('cashout').onclick = () => {
  if (flying) {
    clearInterval(planeInterval);
    flying = false;
    let bet = parseInt(document.getElementById('planeBet').value);
    let won = Math.floor(bet * planeMultiplier);
    balance += won;
    document.getElementById('balance').innerText = balance;
    alert(`Вы забрали ${won}⭐!`);
    document.getElementById('cashout').disabled = true;
  }
};
