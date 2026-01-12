let logs = JSON.parse(localStorage.getItem("logs")) || [];
let theme = localStorage.getItem("theme");

if (theme === "dark") document.body.classList.add("dark");

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

function addLog() {
  const date = dateInput.value;
  const subject = subjectInput.value;
  const hours = +hoursInput.value;
  const focus = +focus.value;
  const mood = mood.value;

  if (!date || !subject || !hours) return alert("Fill all fields");

  logs.push({ date, subject, hours, focus, mood });
  localStorage.setItem("logs", JSON.stringify(logs));

  analyze();
  report();
}

function analyze() {
  let total = 0, focusSum = 0, map = {}, streak = 1;

  logs.forEach(l => {
    total += l.hours;
    focusSum += l.focus;
    map[l.subject] = (map[l.subject] || 0) + l.hours;
  });

  score.innerText = Math.min(100, total * (focusSum / logs.length));
  weak.innerText = Object.keys(map).sort((a,b)=>map[a]-map[b])[0];

  progressBar.style.width = Math.min(100, (total / 5) * 100) + "%";

  if (logs.slice(-3).every(l => l.hours > 6)) {
    burnout.innerText = "⚠ Burnout Risk! Take breaks.";
  } else burnout.innerText = "";

  suggestion.innerText =
    focusSum / logs.length < 3
      ? "💡 Try Pomodoro or short breaks."
      : "✅ Keep up the good work!";
}

function report() {
  reportList.innerHTML = "";
  logs.slice(-5).forEach(l => {
    reportList.innerHTML += `<li>${l.date} • ${l.subject} • ${l.hours}h</li>`;
  });
}

function clearData() {
  if (confirm("Delete all data?")) {
    localStorage.clear();
    location.reload();
  }
}

const dateInput = document.getElementById("date");
const subjectInput = document.getElementById("subject");
const hoursInput = document.getElementById("hours");
const focus = document.getElementById("focus");
const mood = document.getElementById("mood");

const score = document.getElementById("score");
const weak = document.getElementById("weak");
const burnout = document.getElementById("burnout");
const suggestion = document.getElementById("suggestion");
const progressBar = document.getElementById("progressBar");
const reportList = document.getElementById("report");

analyze();
report();

