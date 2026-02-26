console.log("Script Loaded")

const labelData = {
  "7:00": "Breakfast",
  "9:00": "Second Breakfast",
  "11:00": "Elevenses",
  "13:00": "Luncheon",
  "15:00": "Afternoon Tea",
  "17:00": "Dinner",
  "19:00": "Supper"
};

const labelsContainer = document.getElementById("labels");
const now = new Date();
const currentHour = now.getHours();
let currentMealtime = "";

for (const [time, meal] of Object.entries(labelData)) {
  const hour = parseInt(time.split(":")[0]);

  if (currentHour === hour) {
    currentMealtime = "Its time for: " + meal + "!";
    break
  } else if (currentHour-1 === hour) {
    currentMealtime = "Its time for: " + meal + "!";
    break
  } else {
    currentMealtime = "Currently we are Closed"
  };
};
console.log(currentMealtime)
document.getElementById("current-meal").textContent = currentMealtime;
/*

const now = new Date();
const hourKey = `${now.getHours()}:00`;

const currentMealtime = labelData[hourKey] || "The Kitchen is Resting";

// Inject into HTML

document.getElementById("current-meal").textContent = currentMealtime;
*/
function placeLabels(data) {
  const radius = 220; // distance from center

  Object.entries(data).forEach(([time, text]) => {
    const [h, m] = time.split(":").map(Number);

    // 24-hour clock: 0â€“23 hours
    const totalMinutes = h * 60 + m;
    const angle = (totalMinutes / (24 * 60)) * 360 - 90;

    const rad = angle * (Math.PI / 180);
    const x = 180 + radius * Math.cos(rad);
    const y = 180 + radius * Math.sin(rad);

    const el = document.createElement("div");
    el.className = "label";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.textContent = text;

    labelsContainer.appendChild(el);
  });
}

placeLabels(labelData);

// Live clock hands
function updateClock() {
  const now = new Date();

  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // 24-hour hour hand
  const hourDeg = (hours / 24) * 360 + (minutes / 1440) * 360 - 90;
  const minuteDeg = (minutes / 60) * 360 - 90;
  const secondDeg = (seconds / 60) * 360 - 90;

  document.querySelector(".hour-hand").style.transform = `rotate(${hourDeg}deg)`;
  document.querySelector(".minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
  document.querySelector(".second-hand").style.transform = `rotate(${secondDeg}deg)`;
  
  requestAnimationFrame(updateClock);
}
requestAnimationFrame(updateClock);

function placeHourNumbers() {
  const radius = 150; // slightly outside your labels
  const container = document.querySelector(".face");

  for (let h = 0; h < 24; h++) {
    const angle = (h / 24) * 360 - 90;
    const rad = angle * (Math.PI / 180);

    const x = 180 + radius * Math.cos(rad);
    const y = 180 + radius * Math.sin(rad);

    const el = document.createElement("div");
    el.className = "hour-number";
    el.style.left = `${x}px`;
    el.style.top = `${y-2}px`;
    el.textContent = h;

    container.appendChild(el);
  }
}

placeHourNumbers();

function placeTicks() {
  const container = document.querySelector(".face");
  const totalTicks = 24 * 5; // 5 ticks per hour
  const radiusT = 190;
  for (let i = 0; i < totalTicks; i++) {
    const tick = document.createElement("div");
    const angleT = ((i / totalTicks)*360);
    const radT = (angleT) * (Math.PI / 180);
    const xT = 180 + radiusT * Math.cos(radT);
    const yT = 180 + radiusT * Math.sin(radT);
    let qradT = 0;
    if (i % 5 === 0) {
      tick.className = "tick major";
      qradT = Math.abs((angleT+90)) * (Math.PI / 180);
    } else {
      tick.className = "tick minor";
      qradT = Math.abs((angleT+90)) * (Math.PI / 180);
    }
    tick.style.left = `${xT-2}px`;
    tick.style.top = `${yT+10}px`;
    tick.style.rotate = `${qradT}rad`;
    container.appendChild(tick);
  }
}

placeTicks();

setInterval(updateClock, 1000);
updateClock();