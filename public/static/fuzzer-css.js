// Fuzz CSS engine for parsing and style issues
export async function startFuzz(log) {
  log('CSS fuzzer start');
  try {
    for (let i = 0; i < 10; i++) {
      const style = document.createElement('style');
      const prop = ['transform','background','color','border'][rand(4)];
      const rule = `#fuzz${i}{${prop}:${val(prop)};}`;
      style.textContent = rule;
      document.head.appendChild(style);
      const div = document.createElement('div');
      div.id = `fuzz${i}`;
      document.body.appendChild(div);
      getComputedStyle(div);
      div.remove();
      style.remove();
    }
  } catch (e) {
    log('CSS fuzzer error: ' + e);
  }
  log('CSS fuzzer done');
}
function rand(n){return Math.floor(Math.random()*n);}
function val(p){
  switch(p){
    case 'transform': return `rotate(${rand(360)}deg)`;
    case 'background': return `rgba(${rand(255)},${rand(255)},${rand(255)},${Math.random()})`;
    case 'color': return `hsl(${rand(360)},${rand(100)}%,${rand(100)}%)`;
    case 'border': return `${rand(10)}px solid rgb(${rand(255)},${rand(255)},${rand(255)})`;
  }
}
