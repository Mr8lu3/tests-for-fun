// Fuzz localStorage for quota and serialization issues
export async function startFuzz(log) {
  log('localStorage fuzzer start');
  try {
    for (let i = 0; i < 10; i++) {
      const key = 'k' + Math.random().toString(36).slice(2);
      const val = Math.random().toString(36).repeat(Math.floor(Math.random()*5));
      try {
        localStorage.setItem(key, val);
        if (Math.random() > 0.5) localStorage.getItem(key);
        if (Math.random() > 0.5) localStorage.removeItem(key);
      } catch (e) {
        log('localStorage error: ' + e);
      }
    }
  } catch (e) {
    log('localStorage fuzzer error: ' + e);
  }
  log('localStorage fuzzer done');
}
