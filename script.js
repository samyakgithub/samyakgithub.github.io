/* Simple particle background + small interactive bits */

// Canvas particle background
const container = document.getElementById('bg-canvas');
const canvas = document.createElement('canvas');
container.appendChild(canvas);
const ctx = canvas.getContext('2d');

let DPR = window.devicePixelRatio || 1;
let w = 0, h = 0;
const particles = [];
const COUNT = 80;

function resize(){
  DPR = window.devicePixelRatio || 1;
  w = container.clientWidth;
  h = container.clientHeight;
  canvas.width = Math.max(300, w * DPR);
  canvas.height = Math.max(200, h * DPR);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(DPR, DPR);
}
window.addEventListener('resize', resize);
resize();

function rand(min,max){ return Math.random()*(max-min)+min }

function initParticles(){
  particles.length = 0;
  for(let i=0;i<COUNT;i++){
    particles.push({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.8, 2.6),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.2, 0.2),
      alpha: rand(0.08, 0.35),
    });
  }
}
initParticles();

let mouse = {x:-1000,y:-1000};
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw(){
  ctx.clearRect(0,0,w,h);
  // subtle gradient overlay
  const g = ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0, 'rgba(0,20,30,0.02)');
  g.addColorStop(1, 'rgba(0,10,12,0.02)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for(const p of particles){
    p.x += p.vx;
    p.y += p.vy;

    // bounce
    if(p.x < -10) p.x = w + 10;
    if(p.x > w + 10) p.x = -10;
    if(p.y < -10) p.y = h + 10;
    if(p.y > h + 10) p.y = -10;

    // mouse repulse
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx*dx+dy*dy);
    if(dist < 120){
      const ang = Math.atan2(dy, dx);
      p.x += Math.cos(ang) * 1.2;
      p.y += Math.sin(ang) * 1.2;
    }

    ctx.beginPath();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = 'rgba(0,229,255,0.9)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  requestAnimationFrame(draw);
}
draw();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      window.scrollTo({top:target.offsetTop - 60, behavior:'smooth'});
    }
  });
});

// Contact form fake submit
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || 'there';
    alert(`Thanks ${name}! Message received — I'll respond via email soon.`);
    form.reset();
  });
}
