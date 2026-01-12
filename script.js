let logs = JSON.parse(localStorage.getItem("logs")) || [];
let theme = localStorage.getItem("theme");
if(theme==="dark") document.body.classList.add("dark");

function toggleTheme(){
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark")?"dark":"light");
}

function addLog(){
  let d=date.value,s=subject.value,h=+hours.value,
      f=+focus.value,m=mood.value;
  if(!d||!s||!h) return alert("Fill all fields");
  logs.push({d,s,h,f,m});
  localStorage.setItem("logs",JSON.stringify(logs));
  analyze(); render();
}

function analyze(){
  let total=0,focusSum=0,map={},burn=0;
  logs.forEach(l=>{
    total+=l.h; focusSum+=l.f;
    map[l.s]=(map[l.s]||0)+l.h;
    if(l.h>6||l.m.includes("Stressed")) burn++;
  });

  score.innerText=Math.min(100,Math.round(total*(focusSum/logs.length)));
  weak.innerText=Object.keys(map).sort((a,b)=>map[a]-map[b])[0]||"-";

  let today=logs.filter(l=>l.d===new Date().toISOString().slice(0,10))
                .reduce((a,b)=>a+b.h,0);
  progressBar.style.width=Math.min(100,(today/5)*100)+"%";
  goalBadge.innerText=today>=5?"✅":"❌";

  burnout.innerText=burn>=3?"⚠ Burnout Risk Detected":"";
  suggestion.innerText=
    focusSum/logs.length<3?
    "💡 Use Pomodoro & active recall.":
    "✅ Great consistency!";

  streak.innerText=calculateStreak();
  renderCharts();
}

function calculateStreak(){
  let dates=[...new Set(logs.map(l=>l.d))].sort().reverse();
  let s=0,prev=new Date();
  for(let d of dates){
    let cur=new Date(d);
    if((prev-cur)/(1000*60*60*24)<=1){s++;prev=cur;}
    else break;
  }
  return s;
}

function render(){
  logsList.innerHTML="";
  logs.slice(-6).forEach(l=>{
    logsList.innerHTML+=`<li>${l.d} • ${l.s} • ${l.h}h</li>`;
  });
}

function renderCharts(){
  let labels=logs.map(l=>l.d);
  let hoursData=logs.map(l=>l.h);

  if(window.hChart) window.hChart.destroy();
  hChart=new Chart(hoursChart,{
    type:"line",
    data:{labels,datasets:[{label:"Study Hours",data:hoursData}]}
  });

  let subjects={};
  logs.forEach(l=>subjects[l.s]=(subjects[l.s]||0)+l.h);

  if(window.sChart) window.sChart.destroy();
  sChart=new Chart(subjectChart,{
    type:"pie",
    data:{labels:Object.keys(subjects),
          datasets:[{data:Object.values(subjects)}]}
  });
}

function exportPDF(){
  window.print();
}

function clearData(){
  if(confirm("Delete all data?")){
    localStorage.clear();
    location.reload();
  }
}

const date=document.getElementById("date"),
subject=document.getElementById("subject"),
hours=document.getElementById("hours"),
focus=document.getElementById("focus"),
mood=document.getElementById("mood"),
score=document.getElementById("score"),
weak=document.getElementById("weak"),
burnout=document.getElementById("burnout"),
suggestion=document.getElementById("suggestion"),
progressBar=document.getElementById("progressBar"),
goalBadge=document.getElementById("goalBadge"),
streak=document.getElementById("streak"),
logsList=document.getElementById("logs");

analyze(); render();
