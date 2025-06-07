// Fuzz Audio API for unexpected behavior
export async function startFuzz(log) {
  log('Audio fuzzer start');
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 5; i++) {
      const buffer = ctx.createBuffer(1, 44100, 44100);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      try {
        src.connect(ctx.destination);
        if (Math.random() > 0.5) src.start();
        if (Math.random() > 0.5) src.stop();
        if (Math.random() > 0.5) src.disconnect();
      } catch (e) {
        log('Audio op error: ' + e);
      }
    }
    ctx.close();
  } catch (e) {
    log('Audio fuzzer error: ' + e);
  }
  log('Audio fuzzer done');
}
