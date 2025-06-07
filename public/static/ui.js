const logEl = document.getElementById('logConsole');

export function addLog(msg) {
  const ts = new Date().toISOString();
  logEl.textContent += `[${ts}] ${msg}\n`;
  logEl.scrollTop = logEl.scrollHeight;
5xp2bc-codex/create-fuzzing-playground-web-app

 qsf0uw-codex/create-fuzzing-playground-web-app
main

  // Also send log to server for remote viewing
  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  }).catch(() => {});
5xp2bc-codex/create-fuzzing-playground-web-app
}

let isRunning = false;

 main
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

5xp2bc-codex/create-fuzzing-playground-web-app
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

document.querySelectorAll('#sidebar button[data-mod]').forEach(btn => {
  btn.addEventListener('click', () => loadAndRun(btn.getAttribute('data-mod')));
});

document.getElementById('runAll').addEventListener('click', async () => {
  for (const btn of document.querySelectorAll('#sidebar button[data-mod]')) {
    await loadAndRun(btn.getAttribute('data-mod'));
  }
});
 qsf0uw-codex/create-fuzzing-playground-web-app
main

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
5xp2bc-codex/create-fuzzing-playground-web-app

 main

