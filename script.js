const tg = window.Telegram.WebApp;
tg.expand();

let balance = 0;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const crashEl = document.getElementById("crashResult");

function updateBalance() {
  balanceEl.innerText = balance;
}

function buyStars(amount) {
  tg.sendData("buy_" + amount); // бот выставит инвойс
}

// 🎁 КЕЙСЫ
function openCase(price) {
  if (balance < price) {
    alert("❌ Недостаточно звёзд");
    return;
  }

  balance -= price;

  let prize = 0;

  if (price === 50) {
    prize = random([
      [5,45],[10,40],[15,10],[20,5]
    ]);
  }

  if (price === 100) {
    prize = random([
      [10,40],[20,35],[30,15],[60,8],[70,2]
    ]);
  }

  if (price === 500) {
    prize = random([
      [200,40],[400,45],[300,13],[550,2]
    ]);
  }

  balance += prize;
  updateBalance();
  resultEl.innerText = `🎁 Выпало: ${prize}⭐`;
  tg.sendData("case_win_" + prize);
}

// ✈️ САМОЛЁТ
function playCrash() {
  const multiplier = random([
    [1.0,35],[1.1,30],[1.3,20],[2,10],[5,4],[10,1]
  ]);

  crashEl.innerText = `✈️ Самолёт упал на x${multiplier}`;
}

// 🎲 РАНДОМ
function random(table) {
  let r = Math.random() * 100;
  let sum = 0;
  for (let [value, chance] of table) {
    sum += chance;
    if (r <= sum) return value;
  }
  return table[0][0];
}

updateBalance();
