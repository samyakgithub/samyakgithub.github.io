// Simple glowing particle background animation
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
    });
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Fake contact form submit
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent successfully!");
  e.target.reset();
});

