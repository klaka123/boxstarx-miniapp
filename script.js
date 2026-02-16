function buy() {
  const amount = Number(document.getElementById("amount").value);
  if (amount < 10) {
    alert("Минимум 10 ⭐");
    return;
  }

  Telegram.WebApp.sendData(JSON.stringify({
    action: "gift",
    amount: amount
  }));
}

// 🎁 Кейс
function openCase() {
  const rewards = [
    {v:1, c:50},
    {v:2, c:30},
    {v:5, c:15},
    {v:10, c:5}
  ];
  let r = Math.random()*100, s=0;
  for (let i of rewards) {
    s+=i.c;
    if (r<=s) {
      document.getElementById("caseResult").innerText =
        `🎉 Выпало ${i.v} ⭐`;
      break;
    }
  }
}

// ✈️ Самолёт
let int;
function getCrash() {
  let r = Math.random();
  if (r < 0.45) return 1.1;
  if (r < 0.70) return 1.0;
  if (r < 0.85) return 1.6;
  if (r < 0.97) return 5;
  return (20 + Math.random()*5).toFixed(1);
}

function startPlane() {
  clearInterval(int);
  let x = 1.0;
  let crash = getCrash();

  int = setInterval(()=>{
    x+=0.02;
    document.getElementById("plane").innerText = `✈️ x${x.toFixed(2)}`;
    if (x>=crash) {
      clearInterval(int);
      document.getElementById("plane").innerText = `💥 Упал на x${crash}`;
    }
  },50);
}
