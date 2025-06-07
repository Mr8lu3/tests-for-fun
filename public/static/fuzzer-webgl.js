// Fuzz WebGL API for driver or memory issues
export async function startFuzz(log) {
  log('WebGL fuzzer start');
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) { log('webgl2 not supported'); return; }
    for (let i = 0; i < 5; i++) {
      const vsSource = `void main(){gl_Position=vec4(${Math.random()},${Math.random()},${Math.random()},1.0);} ${junk()}`;
      const fsSource = `precision mediump float;out vec4 c;void main(){c=vec4(${Math.random()},${Math.random()},${Math.random()},1.0);} ${junk()}`;
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);
      log('VS log: ' + gl.getShaderInfoLog(vs));
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);
      log('FS log: ' + gl.getShaderInfoLog(fs));
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      log('Program log: ' + gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0,0,1,1,0]), gl.STATIC_DRAW);
      const loc = 0;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
  } catch (e) {
    log('WebGL fuzzer error: ' + e);
  }
  log('WebGL fuzzer done');
}
function junk() { return Math.random() < 0.5 ? '' : '/*' + Math.random().toString(36) + '*/'; }
