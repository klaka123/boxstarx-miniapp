// Таймер самолета
let timerValue = 10;
let timerInterval;
let flightInterval;
let multiplier = 1;
let flying = false;

const plane = document.getElementById('plane');
const timerEl = document.getElementById('timer');
const multiplierEl = document.getElementById('multiplier');
const startBtn = document.getElementById('start-flight');
const cashoutBtn = document.getElementById('cashout');

startBtn.onclick = () => {
    const bet = parseInt(document.getElementById('bet').value);
    if (bet < 10) { alert('Минимальная ставка 10 ⭐'); return; }

    timerValue = 10;
    multiplier = 1;
    flying = false;
    plane.style.bottom = '0px';
    multiplierEl.textContent = 'x1';
    
    timerEl.textContent = `До взлета: ${timerValue}`;
    
    timerInterval = setInterval(() => {
        timerValue--;
        timerEl.textContent = `До взлета: ${timerValue}`;
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            startFlight(bet);
        }
    }, 1000);
};

cashoutBtn.onclick = () => {
    if (flying) {
        alert(`Вы забрали ${multiplier.toFixed(2)}x от вашей ставки!`);
        flying = false;
        clearInterval(flightInterval);
        plane.style.bottom = '0px';
        multiplierEl.textContent = 'x1';
    }
};

function startFlight(bet) {
    flying = true;
    let height = 0;
    flightInterval = setInterval(() => {
        if (!flying) { clearInterval(flightInterval); return; }

        let chance = Math.random();
        if (chance < 0.02) multiplier = 150; // очень редко
        else if (chance < 0.1) multiplier = 10;
        else multiplier += 0.05 + Math.random()*0.1;

        // Часто падает на маленьких множителях
        if (Math.random() < 0.05 && multiplier < 2) {
            alert(`Самолет упал на x${multiplier.toFixed(2)}! Вы проиграли!`);
            flying = false;
            clearInterval(flightInterval);
            plane.style.bottom = '0px';
            multiplierEl.textContent = 'x1';
        }

        multiplierEl.textContent = `x${multiplier.toFixed(2)}`;
        height = Math.min(multiplier*20, 300);
        plane.style.bottom = `${height}px`;
    }, 100);
}

// Открытие кейса (анимация)
document.querySelectorAll('.open-case').forEach(btn => {
    btn.onclick = (e) => {
        const caseDiv = e.target.parentElement;
        caseDiv.classList.add('opening');
        setTimeout(() => {
            alert('Вы получили подарок!'); // Тут можно сделать выпадение с шансами
            caseDiv.classList.remove('opening');
        }, 2000);
    }
});
