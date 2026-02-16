const tg = window.Telegram.WebApp;
tg.expand();

function openCase() {
    const roll = Math.floor(Math.random() * 1000) + 1;
    let prize = "❌ Ничего";

    if (roll === 1) prize = "1000⭐";       // 0.1%
    else if (roll <= 10) prize = "500⭐";   // 0.9%
    else if (roll <= 50) prize = "100⭐";   // 4%
    else if (roll <= 150) prize = "50⭐";   // 10%
    else if (roll <= 300) prize = "20⭐";   // 15%

    document.getElementById("result").innerText = "Результат: " + prize;

    tg.sendData(prize);
}
// Проверяем, что Web App доступен
let tg;
if (window.Telegram && window.Telegram.WebApp) {
    tg = window.Telegram.WebApp;
    tg.expand();
} else {
    alert("⚠️ Пожалуйста, откройте этот мини‑апп через Telegram на любом устройстве.");
}

// Функция открытия кейса
function openCase() {
    if (!tg) return; // Защита от запуска вне Telegram Web App

    // Генерируем случайный результат (шансы как хотели)
    const roll = Math.floor(Math.random() * 1000) + 1;
    let prize = "❌ Ничего";

    if (roll === 1) prize = "1000⭐";       // 0.1%
    else if (roll <= 10) prize = "500⭐";   // 0.9%
    else if (roll <= 50) prize = "100⭐";   // 4%
    else if (roll <= 150) prize = "50⭐";   // 10%
    else if (roll <= 300) prize = "20⭐";   // 15%

    // Показываем результат на странице
    const resultEl = document.getElementById("result");
    if (resultEl) {
        resultEl.innerText = "Результат: " + prize;
    }

    // Отправка результата боту через Telegram Web App API
    try {
        tg.sendData(prize);
    } catch (err) {
        console.error("Ошибка отправки данных боту:", err);
        alert("Ошибка: данные не отправлены боту.");
    }
}

// Для адаптивности на iPhone делаем кнопку на весь экран
window.addEventListener("load", () => {
    const button = document.querySelector("button");
    if (button) {
        button.style.width = "90%";
        button.style.fontSize = "20px";
    }
});
