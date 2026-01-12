let logs = JSON.parse(localStorage.getItem("studyLogs")) || [];

function addLog() {
  const date = document.getElementById("date").value;
  const subject = document.getElementById("subject").value;
  const hours = Number(document.getElementById("hours").value);
  const focus = Number(document.getElementById("focus").value);

  if (!date || !subject || !hours) {
    alert("Please fill all fields");
    return;
  }

  logs.push({ date, subject, hours, focus });
  localStorage.setItem("studyLogs", JSON.stringify(logs));

  analyze();
  weeklyReport();
}

function analyze() {
  if (logs.length === 0) return;

  let totalHours = 0;
  let focusSum = 0;
  let subjectMap = {};
  let burnoutCheck = 0;

  logs.forEach(log => {
    totalHours += log.hours;
    focusSum += log.focus;

    subjectMap[log.subject] = (subjectMap[log.subject] || 0) + log.hours;
    if (log.hours > 6) burnoutCheck++;
  });

  let productivity = Math.min(100, Math.round((totalHours * (focusSum / logs.length)) * 2));
  document.getElementById("score").innerText = productivity;

  let weakSubject = Object.keys(subjectMap)
    .reduce((a, b) => subjectMap[a] < subjectMap[b] ? a : b);

  document.getElementById("weak").innerText = weakSubject;

  document.getElementById("burnout").innerText =
    burnoutCheck >= 3 ? "⚠ Burnout Warning: Take Rest!" : "";
}

function weeklyReport() {
  const report = document.getElementById("report");
  report.innerHTML = "";

  logs.slice(-7).forEach(log => {
    const li = document.createElement("li");
    li.textContent = `${log.date} - ${log.subject} (${log.hours} hrs)`;
    report.appendChild(li);
  });
}

analyze();
weeklyReport();
