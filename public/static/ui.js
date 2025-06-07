const logEl = document.getElementById('logConsole');

export function addLog(msg) {
  const ts = new Date().toISOString();
  logEl.textContent += `[${ts}] ${msg}\n`;
  logEl.scrollTop = logEl.scrollHeight;
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
