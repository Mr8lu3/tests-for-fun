const logEl = document.getElementById('logConsole');

export function addLog(msg) {
  const ts = new Date().toISOString();
  logEl.textContent += `[${ts}] ${msg}\n`;
  logEl.scrollTop = logEl.scrollHeight;

  // Also send log to server for remote viewing
  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  }).catch(() => {});
}

let isRunning = false;

async function loadAndRun(modulePath) {
  try {
    const mod = await import(`./${modulePath}`);
    if (mod && typeof mod.startFuzz === 'function') {
      await mod.startFuzz(addLog);
    }
  } catch (e) {
    addLog(`Error loading ${modulePath}: ${e}`);
  }
}

const moduleButtons = document.querySelectorAll('#sidebar button[data-mod]');
moduleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!isRunning) loadAndRun(btn.getAttribute('data-mod'));
  });
});

const runAllBtn = document.getElementById('runAll');
runAllBtn.addEventListener('click', async () => {
  if (isRunning) return;
  isRunning = true;
  runAllBtn.disabled = true;
  moduleButtons.forEach(b => (b.disabled = true));
  for (const btn of moduleButtons) {
    await loadAndRun(btn.getAttribute('data-mod'));
  }
  moduleButtons.forEach(b => (b.disabled = false));
  runAllBtn.disabled = false;
  isRunning = false;
});

// Fetch logs from the server and display them
document.getElementById('fetchLogs').addEventListener('click', async () => {
  try {
    const res = await fetch('/api/logs');
    const data = await res.json();
    if (Array.isArray(data.logs)) {
      logEl.textContent = data.logs.join('\n') + '\n';
    }
  } catch (e) {
    addLog('Failed to fetch logs: ' + e);
  }
});
