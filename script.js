const tg = window.Telegram.WebApp;
tg.expand();

let balance = 0;
const resultEl = document.getElementById("result");
const openBtn = document.getElementById("openBtn");
const payBtn = document.getElementById("payBtn");
const starsInput = document.getElementById("starsInput");
const gifts = document.querySelectorAll(".gift");
const animationEl = document.getElementById("animation");

function updateBalance() {
  resultEl.innerText = `Баланс: ${balance}⭐`;
}

// Открытие кейса
openBtn.addEventListener("click", () => {
  if (balance < 100) return alert("❌ Недостаточно ⭐ для открытия кейса");

  balance -= 100;
  updateBalance();

  let i = 0;
  const animInterval = setInterval(() => {
    gifts.forEach(g => g.classList.remove("active"));
    gifts[i].classList.add("active");
    animationEl.innerText = gifts[i].innerText;
    i = (i + 1) % gifts.length;
  }, 200);

  setTimeout(() => {
    clearInterval(animInterval);
    gifts.forEach(g => g.classList.remove("active"));

    let prizeRoll = Math.random();
    let prize;
    if (prizeRoll < 0.5) prize = 50;
    else if (prizeRoll < 0.9) prize = 100;
    else prize = 20;

    balance += prize;
    animationEl.innerText = "";
    updateBalance();
    tg.sendData(`${prize}⭐`);
  }, 2000);
});

// Оплата через сервер
payBtn.addEventListener("click", async () => {
  const amount = parseInt(starsInput.value);
  if (!amount || amount <= 0) return alert("Введите корректное количество ⭐");

  try {
    const res = await ffetch("https://abcd1234.ngrok.io/create-payment"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars: amount })
    });

    const data = await res.json();
    if (data.url) {
      window.open(data.url, "_blank"); // Переходим на страницу оплаты
    }
  } catch (e) {
    alert("Ошибка сервера оплаты");
    console.error(e);
  }
});

updateBalance();
