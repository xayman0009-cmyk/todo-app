const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const minutes = parseInt(timeInput.value);

    if (taskText === "" || isNaN(minutes) || minutes <= 0) return;

    let timeLeft = minutes * 60;
    let interval = null;

    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.className = "task";
    taskSpan.textContent = taskText;

    const timerSpan = document.createElement("span");
    timerSpan.className = "timer";
    timerSpan.textContent = formatTime(timeLeft);

    const startBtn = document.createElement("button");
    startBtn.textContent = "▶";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";

    li.append(taskSpan, timerSpan, startBtn, deleteBtn);
    taskList.appendChild(li);

    startBtn.onclick = () => {
        if (interval) return;

        interval = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(interval);
                li.classList.add("done");
                startBtn.disabled = true;
            }
        }, 1000);
    };

    deleteBtn.onclick = () => {
        clearInterval(interval);
        li.remove();
    };

    taskInput.value = "";
    timeInput.value = "";
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}
