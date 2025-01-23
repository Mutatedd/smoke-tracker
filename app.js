// get elements
const weedCountEl = document.getElementById("weed-count");
const nicCountEl = document.getElementById("nic-count");
const weedTimerEl = document.getElementById("weed-timer");
const nicTimerEl = document.getElementById("nic-timer");

let weedCount = localStorage.getItem("weedCount") || 0;
let nicCount = localStorage.getItem("nicCount") || 0;
let weedLastSmoke = localStorage.getItem("weedLastSmoke") || null;
let nicLastSmoke = localStorage.getItem("nicLastSmoke") || null;

// update stats display
function updateStats() {
  weedCountEl.textContent = weedCount;
  nicCountEl.textContent = nicCount;

  weedTimerEl.textContent = weedLastSmoke
    ? new Date(weedLastSmoke).toLocaleString()
    : "N/A";
  nicTimerEl.textContent = nicLastSmoke
    ? new Date(nicLastSmoke).toLocaleString()
    : "N/A";
}

// helper function: format time (days, hours, minutes)
function formatTimeSince(timestamp) {
  if (!timestamp) return "N/A";
  const now = Date.now();
  const diff = now - timestamp;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
}

// update the timer logic
function updateTimers() {
  weedTimerEl.textContent = formatTimeSince(weedLastSmoke);
  nicTimerEl.textContent = formatTimeSince(nicLastSmoke);

  // tolerance logic (drops after 1-2 days)
  const toleranceThreshold = 2 * 24 * 60 * 60 * 1000; // 2 days in ms
  const now = Date.now();

  if (weedLastSmoke && now - weedLastSmoke >= toleranceThreshold) {
    document.getElementById("weed-tolerance").textContent = "Tolerance dropping!";
  } else {
    document.getElementById("weed-tolerance").textContent = "Tolerance stable.";
  }

  if (nicLastSmoke && now - nicLastSmoke >= toleranceThreshold) {
    document.getElementById("nic-tolerance").textContent = "Tolerance dropping!";
  } else {
    document.getElementById("nic-tolerance").textContent = "Tolerance stable.";
  }
}

// log weed smoke
document.getElementById("log-weed").addEventListener("click", () => {
  weedCount++;
  weedLastSmoke = Date.now();

  localStorage.setItem("weedCount", weedCount);
  localStorage.setItem("weedLastSmoke", weedLastSmoke);

  updateStats();
});

// log nic smoke
document.getElementById("log-nic").addEventListener("click", () => {
  nicCount++;
  nicLastSmoke = Date.now();

  localStorage.setItem("nicCount", nicCount);
  localStorage.setItem("nicLastSmoke", nicLastSmoke);

  updateStats();
});

// initial stats load
updateStats();
updateTimers(); // start timer updates
setInterval(updateTimers, 60000); // update timers every minute
