// ================== MUSIC ==================
const music = new Audio("music.mp3");
music.loop = true;
music.volume = 0.6;
music.play().catch(() => {
  document.body.addEventListener("click", () => music.play(), { once: true });
});

// ================== FIREWORKS SETUP ==================
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 4 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.alpha -= 0.01;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }
  draw() {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
}

function loopFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles.length === 0) fireworks.splice(i, 1);
  });
  requestAnimationFrame(loopFireworks);
}
loopFireworks();

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const colors = ["#ff0043", "#14fc56", "#1e90ff", "#ffd700", "#ff8c00"];
  fireworks.push(new Firework(x, y, colors));
}

// ================== BLACK HOLE TEXT ==================
const textContainer = document.getElementById("textContainer");
const cakeContainer = document.getElementById("cakeContainer");
const hbText = document.getElementById("hbText");
const giftButton = document.getElementById("giftButton");

const message = "Happy Birthday to you Mai Linh!";
const chars = [];

for (let i = 0; i < message.length; i++) {
  const span = document.createElement("span");
  span.innerText = message[i];
  span.style.position = "absolute";
  span.style.color = "#fff";
  span.style.fontSize = "24px";
  textContainer.appendChild(span);
  chars.push({ el: span, angle: (i / message.length) * Math.PI * 2, radius: 120 });
}

let rotation = 0;
let animationFrame;

function animateBlackHole() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  rotation += 0.01;

  chars.forEach((char, i) => {
    const x = centerX + Math.cos(char.angle + rotation) * char.radius;
    const y = centerY + Math.sin(char.angle + rotation) * char.radius;
    char.el.style.left = x + "px";
    char.el.style.top = y + "px";
  });

  animationFrame = requestAnimationFrame(animateBlackHole);
}

animateBlackHole();

// ================== TRANSFORM TO CAKE ==================
setTimeout(() => {
  cancelAnimationFrame(animationFrame);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  chars.forEach((char, i) => {
    const layer = i % 2; // 0: tầng 1, 1: tầng 2
    const radius = layer === 0 ? 150 : 100;
    const angle = (i / chars.length) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * (radius / 2) + (layer === 0 ? 40 : -40);

    char.el.style.transition = "all 1.5s ease";
    char.el.style.left = x + "px";
    char.el.style.top = y + "px";
  });
}, 3000);

// ================== SHOW CAKE ==================
setTimeout(() => {
  textContainer.innerHTML = "";
  cakeContainer.style.display = "block";
  cakeContainer.style.opacity = 0;
  cakeContainer.style.transition = "opacity 2s";
  cakeContainer.style.opacity = 1;

  // Hiện chữ Happy Birthday bay ra
  setTimeout(() => {
    hbText.style.display = "block";
    hbText.classList.add("fly-in");

    // Bắn pháo hoa liên tục trong 5s
    let count = 0;
    const fireworkInterval = setInterval(() => {
      launchFirework();
      count++;
      if (count > 20) clearInterval(fireworkInterval);
    }, 300);
  }, 1500);
}, 5000);

// ================== SHOW GIFT BUTTON ==================
setTimeout(() => {
  giftButton.style.display = "block";
  giftButton.classList.add("show-btn");
}, 10000);

// ================== MODAL ==================
const giftModal = document.getElementById("giftModal");
const closeModal = document.getElementById("closeModal");

giftButton.addEventListener("click", () => {
  giftModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  giftModal.style.display = "none";
});
