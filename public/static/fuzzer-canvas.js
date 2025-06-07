// Fuzz Canvas API for memory-safety leaks
export async function startFuzz(log) {
  log('Canvas fuzzer start');
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < 20; i++) {
      try {
        ctx.fillStyle = `rgba(${rand(255)},${rand(255)},${rand(255)},${Math.random()})`;
        ctx.fillRect(rand(200), rand(200), rand(200), rand(200));
        if (canvas.captureStream) canvas.captureStream();
        await new Promise(res => canvas.toBlob(() => res()));
      } catch (e) {
        log('Canvas operation error: ' + e);
      }
    }
  } catch (e) {
    log('Canvas fuzzer error: ' + e);
  }
  log('Canvas fuzzer done');
}

function rand(max) { return Math.floor(Math.random() * max); }
