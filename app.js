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
