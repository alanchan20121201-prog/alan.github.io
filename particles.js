/* =====================================================================
   背景粒子星座动画 —— 漂浮光点 + 自动连线 + 鼠标交互
   纯 Canvas 2D，无依赖。尊重 prefers-reduced-motion。
   ===================================================================== */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let W = 0, H = 0, dpr = 1;
  let particles = [];
  const mouse = { x: -9999, y: -9999, active: false };
  const reduced = window.matchMedia("(pointer: coarse)").matches;

  const COUNT = () => {
    const area = W * H;
    return Math.max(28, Math.min(110, Math.round(area / 16000)));
  };
  const LINK_DIST = 130;
  const MOUSE_DIST = 190;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    init();
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      hue: 210 + Math.random() * 110, // 蓝→紫
      a: Math.random() * 0.5 + 0.35
    };
  }

  function init() {
    const n = COUNT();
    particles = Array.from({ length: n }, makeParticle);
  }

  function step() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;

      // 鼠标排斥
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_DIST && d > 0) {
          const f = (MOUSE_DIST - d) / MOUSE_DIST;
          p.x += (dx / d) * f * 1.6;
          p.y += (dy / d) * f * 1.6;
        }
      }
    }

    // 连线
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.16;
          ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 70%, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // 画点
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 95%, 72%, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  window.addEventListener("resize", resize, { passive: true });
  if (!reduced) {
    window.addEventListener("pointermove", e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });
    window.addEventListener("pointerleave", () => { mouse.active = false; });
  }

  resize();
  requestAnimationFrame(step);
})();
