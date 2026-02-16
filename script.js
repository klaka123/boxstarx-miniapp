let tg;
if (window.Telegram && window.Telegram.WebApp) {
    tg = window.Telegram.WebApp;
    tg.expand();
} else {
    alert("⚠️ Откройте этот мини‑апп через Telegram.");
}

// Начальный баланс звезд
let balance = 100;
const costPerCase = 20;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const openBtn = document.getElementById("openCaseBtn");
const addStarsBtn = document.getElementById("addStarsBtn");

// Обновление баланса на экране
function updateBalance() {
    balanceEl.innerText = balance;
}

// Функция открытия кейса
function openCase() {
    if (balance < costPerCase) {
        alert("❌ Недостаточно ⭐! Пополните баланс.");
        return;
    }

    balance -= costPerCase;
    updateBalance();

    const roll = Math.floor(Math.random() * 1000) + 1;
    let prize = "❌ Ничего";

    if (roll === 1) prize = "🎉 1000⭐";
    else if (roll <= 10) prize = "🎊 500⭐";
    else if (roll <= 50) prize = "✨ 100⭐";
    else if (roll <= 150) prize = "💎 50⭐";
    else if (roll <= 300) prize = "🎁 20⭐";

    resultEl.innerText = "Вы получили: " + prize;

    if (tg) {
        try { tg.sendData(prize); } 
        catch (err) { console.error(err); }
    }
}

// Пополнение баланса
function addStars() {
    balance += 50;
    updateBalance();
}

openBtn.addEventListener("click", openCase);
addStarsBtn.addEventListener("click", addStars);

// Инициализация
updateBalance();
