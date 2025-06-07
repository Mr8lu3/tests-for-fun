// Fuzz RegExp engine for parsing and backtracking issues
export async function startFuzz(log) {
  log('Regex fuzzer start');
  const tokens = ['(',')','[',']','{','}','?','*','+','|','.','\\d','\\w'];
  function randPat() {
    let p='';
    const len = 5 + Math.floor(Math.random()*5);
    for (let i=0;i<len;i++) p += tokens[Math.floor(Math.random()*tokens.length)];
    return p;
  }
  try {
    for (let i=0;i<10;i++) {
      const pattern = randPat();
      try {
        const re = new RegExp(pattern);
        re.test(Math.random().toString(36));
      } catch (e) {
        log('regex error for '+pattern+': '+e);
      }
    }
  } catch (e) {
    log('Regex fuzzer error: ' + e);
  }
  log('Regex fuzzer done');
}
