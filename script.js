// Таймер взлета самолета
let timer = 10;
const timerEl = document.getElementById("timer");

const countdown = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if(timer <= 0){
        clearInterval(countdown);
        launchPlane();
    }
}, 1000);

function launchPlane(){
    alert("Самолет взлетел!"); // сюда вставить анимацию и расчет множителя
}

// Анимация открытия кейса
const cases = document.querySelectorAll('.case');
cases.forEach(c => {
    c.addEventListener('click', () => {
        c.classList.add('open');
        setTimeout(() => {
            alert(`Кейс ${c.dataset.case} звезд открыт!`);
            c.classList.remove('open');
        }, 1500);
    });
});
