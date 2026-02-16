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
