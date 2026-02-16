let balance = 1000;
document.getElementById('balance').innerText = balance;

const plane = document.querySelector('.plane');
const countdownEl = document.getElementById('countdown');
let countdown = 10;
let interval, planeInterval;
let multiplier = 1;

document.getElementById('start-plane').addEventListener('click', () => {
    let bet = parseInt(document.getElementById('bet').value);
    if(bet > balance || bet < 10) return alert('Неверная ставка');
    balance -= bet;
    document.getElementById('balance').innerText = balance;

    countdown = 10;
    countdownEl.innerText = countdown;
    multiplier = 1;
    plane.style.left = '0px';

    interval = setInterval(() => {
        countdown--;
        countdownEl.innerText = countdown;
        if(countdown <= 0){
            clearInterval(interval);
            startFlight(bet);
        }
    },1000);
});

function startFlight(bet){
    planeInterval = setInterval(()=>{
        multiplier += Math.random()*0.3; // рост
        plane.style.transform = `translateX(${multiplier*30}px) translateY(${-multiplier*2}px)`;
        // падение
        if(Math.random() < 0.05 && multiplier>1){
            alert(`Самолет упал! Вы проиграли ${bet} ⭐`);
            clearInterval(planeInterval);
        }
    },200);
}

document.getElementById('cashout').addEventListener('click', () => {
    let bet = parseInt(document.getElementById('bet').value);
    let won = Math.floor(bet*multiplier);
    balance += won;
    document.getElementById('balance').innerText = balance;
    alert(`Вы забрали ${won} ⭐`);
    clearInterval(planeInterval);
});
