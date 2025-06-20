// Fuzz WebAssembly API for compile/runtime issues
const baseModule = [
  0x00,0x61,0x73,0x6d,0x01,0x00,0x00,0x00,0x01,0x08,0x02,0x60,0x01,0x7f,0x00,0x60,
  0x00,0x00,0x02,0x1e,0x01,0x0c,0x6d,0x79,0x5f,0x6e,0x61,0x6d,0x65,0x73,0x70,0x61,
  0x63,0x65,0x0d,0x69,0x6d,0x70,0x6f,0x72,0x74,0x65,0x64,0x5f,0x66,0x75,0x6e,0x63,
  0x00,0x00,0x03,0x02,0x01,0x01,0x07,0x11,0x01,0x0d,0x65,0x78,0x70,0x6f,0x72,0x74,
  0x65,0x64,0x5f,0x66,0x75,0x6e,0x63,0x00,0x01,0x0a,0x08,0x01,0x06,0x00,0x41,0x2a,
  0x10,0x00,0x0b
];

function makeModule(val) {
  const bytes = new Uint8Array(baseModule);
  bytes[baseModule.length - 3] = val;
  return bytes;
}

export async function startFuzz(log) {
  log('WebAssembly fuzzer start');
 5xp2bc-codex/create-fuzzing-playground-web-app

 qsf0uw-codex/create-fuzzing-playground-web-app
main
  if (typeof WebAssembly === 'undefined') {
    log('WebAssembly not supported');
    log('WebAssembly fuzzer done');
    return;
  }

main

  for (let i = 0; i < 5; i++) {
    const v = Math.floor(Math.random() * 256);
    const bytes = makeModule(v);
    try {
      const { instance } = await WebAssembly.instantiate(bytes, { my_namespace: { imported_func: () => {} } });
      const res = instance.exports.exported_func();
      log('Run ' + i + ' => ' + res);
    } catch (e) {
      log('WASM error: ' + e);
    }
  }
  log('WebAssembly fuzzer done');
}
