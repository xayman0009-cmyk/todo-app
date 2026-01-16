/* MAIN CLOCK LOGIC */

let is24Hour = false;

// Grab clock element for animation
const clock = document.getElementById("main-clock");

function animateClock() {
    clock.style.animation = "none";
    clock.offsetHeight; // force reflow to restart animation
    clock.style.animation = "fadeIn 0.5s ease";
}

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "AM";

    if (!is24Hour) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
    document.getElementById("ampm").innerText = is24Hour ? "" : ampm;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Toggle 12 / 24 hour format
document.getElementById("toggleFormat").onclick = () => {
    is24Hour = !is24Hour;
    animateClock();
};


/* TIMER LOGIC */

let timerInterval = null;
let totalSeconds = 0;

function updateTimer() {
    totalSeconds++;

    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;

    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    document.getElementById("timer").innerText =
        `${hrs} : ${mins} : ${secs}`;
}

document.getElementById("startTimer").onclick = () => {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
};

document.getElementById("pauseTimer").onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
};

document.getElementById("resetTimer").onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    document.getElementById("timer").innerText = "00 : 00 : 00";
};


/* THEME TOGGLE  */

document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    animateClock();
};
