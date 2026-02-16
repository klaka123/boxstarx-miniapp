const tg = window.Telegram.WebApp;
tg.expand();

let balance = 0;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const animEl = document.getElementById("caseAnim");
const crashAnim = document.getElementById("crashAnim");

function update() {
  balanceEl.innerText = balance;
}

// ПОКУПКА
function buyStars() {
  const amount = parseInt(document.getElementById("buyAmount").value);
  if (!amount || amount < 10) {
    alert("Минимум 10 ⭐");
    return;
  }
  tg.sendData("buy_" + amount);
}

// 🎁 КЕЙС
function openCase(price) {
  if (balance < price) {
    alert("Недостаточно ⭐");
    return;
  }

  balance -= price;
  update();

  animEl.classList.remove("hidden");
  animEl.innerText = "🎁";

  setTimeout(() => {
    animEl.classList.add("hidden");

    let prize = 0;

    if (price === 50)
      prize = roll([[5,50],[10,35],[15,10],[20,5]]);

    if (price === 100)
      prize = roll([[10,40],[20,35],[30,15],[60,8],[70,2]]);

    if (price === 500)
      prize = roll([[200,40],[400,45],[300,13],[550,2]]);

    balance += prize;
    update();
    resultEl.innerText = `🎉 Выпало ${prize} ⭐`;
    tg.sendData("case_win_" + prize);
  }, 1500);
}

// ✈️ САМОЛЁТ
function startCrash() {
  const bet = parseInt(document.getElementById("crashBet").value);
  if (!bet || bet < 10 || bet > balance) {
    alert("Неверная ставка");
    return;
  }

  balance -= bet;
  update();
  crashAnim.innerText = "✈️ Взлёт...";

  setTimeout(() => {
    const x = roll([
      [1.0,30],
      [1.1,30],
      [1.6,25],
      [5,10],
      [20,3],
      [25,2]
    ]);

    if (x <= 1.1) {
      crashAnim.innerText = `💥 Упал на x${x}`;
    } else {
      const win = Math.floor(bet * x);
      balance += win;
      crashAnim.innerText = `🚀 x${x} → +${win} ⭐`;
    }
    update();
  }, 1500);
}

// 🎲
function roll(arr) {
  let r = Math.random() * 100;
  let sum = 0;
  for (let [v,c] of arr) {
    sum += c;
    if (r <= sum) return v;
  }
  return arr[0][0];
}

update();
