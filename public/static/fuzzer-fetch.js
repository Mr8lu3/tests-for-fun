// Fuzz Fetch API for parsing consistency
export async function startFuzz(log) {
  log('Fetch fuzzer start');
  try {
    const data = new Uint8Array(10);
    crypto.getRandomValues(data);
    const url = URL.createObjectURL(new Blob([data]));
    const resp = await fetch(url);
    const methods = ['arrayBuffer','json','text'];
    for (let i = 0; i < 3; i++) {
      const m = methods[Math.floor(Math.random()*methods.length)];
      try {
        await resp.clone()[m]();
      } catch (e) {
        log('Fetch ' + m + ' error: ' + e);
      }
    }
    URL.revokeObjectURL(url);
  } catch (e) {
    log('Fetch fuzzer error: ' + e);
  }
  log('Fetch fuzzer done');
}
