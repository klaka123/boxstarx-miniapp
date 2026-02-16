/* Пополнение */
function topUp() {
  const amount = Number(document.getElementById("amount").value);
  if(amount<10){ Telegram.WebApp.showAlert("Минимум 10 ⭐"); return; }
  Telegram.WebApp.sendData(JSON.stringify({action:"topup",amount:amount}));
}

/* Кейсы */
const cases = {
  50:[{prize:25,chance:70},{prize:50,chance:15},{prize:100,chance:5},{prize:200,chance:0.8},{prize:500,chance:0.2}],
  100:[{prize:50,chance:65},{prize:100,chance:18},{prize:200,chance:7},{prize:500,chance:0.9},{prize:1000,chance:0.1}],
  500:[{prize:200,chance:55},{prize:500,chance:15},{prize:1000,chance:5},{prize:5000,chance:0.5},{prize:10000,chance:0.05}]
};

function openCase(price){
  const pool=cases[price];
  let roll=Math.random()*100;
  let sum=0;
  for(let item of pool){ sum+=item.chance; if(roll<=sum){ document.getElementById("result").innerText=`🎉 Выпало: ${item.prize} ⭐`; return; } }
  document.getElementById("result").innerText="😶 Ничего… попробуй ещё";
}

/* Самолет */
let planeInterval=null;
let currentMultiplier=1;
let crashed=false;
let betAmount=0;

function startPlane(){
  if(planeInterval) return;
  betAmount=Number(document.getElementById("bet").value);
  if(betAmount<10){ Telegram.WebApp.showAlert("Минимум 10 ⭐"); return; }
  currentMultiplier=1;
  crashed=false;
  document.getElementById("multiplier").innerText="Множитель: 1×";

  setTimeout(()=>{
    planeInterval=setInterval(()=>{
      if(crashed) return;
      let chance=Math.random();
      if(chance<0.6) currentMultiplier+=0.05; // частый рост
      else if(chance<0.95) currentMultiplier+=0.2; // средний рост
      else currentMultiplier+=1; // редкий
      // редкий супер бонус
      if(chance>0.998) currentMultiplier=Math.min(currentMultiplier,150);
      if(currentMultiplier>=150) crashed=true;
      if(Math.random()<getCrashChance(currentMultiplier)) crashed=true;
      document.getElementById("multiplier").innerText=`Множитель: ${currentMultiplier.toFixed(2)}×`;
      if(crashed){ endPlane(false); }
    },100);
  },10000);
}

function getCrashChance(mult){
  if(mult<1.2) return 0;
  if(mult<2) return 0.01;
  if(mult<5) return 0.03;
  if(mult<10) return 0.07;
  return 0.15;
}

function cashOut(){
  if(!planeInterval || crashed) return;
  clearInterval(planeInterval); planeInterval=null;
  document.getElementById("multiplier").innerText=`Вы забрали: ${(betAmount*currentMultiplier).toFixed(0)} ⭐`;
}

function endPlane(win){
  clearInterval(planeInterval); planeInterval=null;
  if(!win) document.getElementById("multiplier").innerText=`💥 Самолет упал! Вы потеряли ставку`;
}
