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

document.querySelectorAll('#sidebar button[data-mod]').forEach(btn => {
  btn.addEventListener('click', () => loadAndRun(btn.getAttribute('data-mod')));
});

document.getElementById('runAll').addEventListener('click', async () => {
  for (const btn of document.querySelectorAll('#sidebar button[data-mod]')) {
    await loadAndRun(btn.getAttribute('data-mod'));
  }
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
