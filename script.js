function topUp() {
  const amount = Number(document.getElementById("amount").value);
  if (amount < 10) {
    Telegram.WebApp.showAlert("Минимум 10 ⭐");
    return;
  }

  Telegram.WebApp.sendData(JSON.stringify({
    action: "topup",
    amount: amount
  }));
}

/* 🎁 КЕЙСЫ — НАСТРОЕННАЯ ЭКОНОМИКА */
const cases = {
  50: [
    { prize: 25, chance: 70 },
    { prize: 50, chance: 15 },
    { prize: 100, chance: 5 },
    { prize: 200, chance: 0.8 },
    { prize: 500, chance: 0.2 }
  ],
  100: [
    { prize: 50, chance: 65 },
    { prize: 100, chance: 18 },
    { prize: 200, chance: 7 },
    { prize: 500, chance: 0.9 },
    { prize: 1000, chance: 0.1 }
  ],
  500: [
    { prize: 200, chance: 60 },
    { prize: 500, chance: 20 },
    { prize: 1000, chance: 8 },
    { prize: 5000, chance: 1.8 },
    { prize: 10000, chance: 0.2 }
  ]
};

function openCase(price) {
  const pool = cases[price];
  let roll = Math.random() * 100;
  let sum = 0;

  for (let item of pool) {
    sum += item.chance;
    if (roll <= sum) {
      document.getElementById("result").innerText =
        `🎉 Выпало: ${item.prize} ⭐`;
      return;
    }
  }

  document.getElementById("result").innerText =
    `😶 Ничего… попробуй ещё`;
}
