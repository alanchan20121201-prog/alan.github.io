/* =====================================================================
   原创 WebGL 流体极光背景 —— 纯 GLSL shader 生成，无任何图片
   低分辨率渲染 + 30fps 上限，手机自动回退到 CSS 背景
   ===================================================================== */
(function () {
  var canvas = document.getElementById("shaderCanvas");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return; // 手机用 CSS 背景

  var gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
        || canvas.getContext("experimental-webgl");
  if (!gl) return;

  var VERT = [
    "attribute vec2 aPos;",
    "varying vec2 vUv;",
    "void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }"
  ].join("\n");

  var FRAG = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform float uTime;",
    "uniform vec2 uRes;",
    "uniform vec2 uMouse;",
    "float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }",
    "float noise(vec2 p){",
    "  vec2 i=floor(p), f=fract(p);",
    "  f=f*f*(3.0-2.0*f);",
    "  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x), f.y);",
    "}",
    "float fbm(vec2 p){",
    "  float v=0.0, a=0.5;",
    "  for(int i=0;i<3;i++){ v+=a*noise(p); p*=2.03; a*=0.5; }",
    "  return v;",
    "}",
    "void main(){",
    "  vec2 uv=vUv;",
    "  vec2 p=uv*vec2(uRes.x/uRes.y,1.0);",
    "  float t=uTime*0.05;",
    "  float n=fbm(p*2.2+vec2(t,-t*0.6));",
    "  float flow=fbm(p*1.6+n*0.8);",
    "  vec3 col=mix(vec3(0.031,0.039,0.09), vec3(0.070,0.105,0.26), flow);",
    "  col=mix(col, vec3(0.34,0.15,0.52), smoothstep(0.58,0.88,flow)*0.5);",
    "  col=mix(col, vec3(0.07,0.40,0.40), smoothstep(0.52,0.84,n)*0.35);",
    "  float d=distance(uv,uMouse);",
    "  col+=vec3(0.08,0.10,0.20)*exp(-d*3.5)*0.4;",
    "  col*=1.0-0.34*length(uv-0.5);",
    "  gl_FragColor=vec4(col,1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uTime = gl.getUniformLocation(prog, "uTime");
  var uRes = gl.getUniformLocation(prog, "uRes");
  var uMouse = gl.getUniformLocation(prog, "uMouse");

  var mouse = { x: 0.5, y: 0.5 }, tx = 0.5, ty = 0.5;
  window.addEventListener("pointermove", function (e) {
    tx = e.clientX / window.innerWidth;
    ty = 1 - e.clientY / window.innerHeight;
  }, { passive: true });

  var W = 0, H = 0;
  function resize() {
    // 低分辨率渲染，CSS 放大 —— 大幅省 GPU
    var scale = 0.25;
    W = Math.max(1, Math.round(window.innerWidth * scale));
    H = Math.max(1, Math.round(window.innerHeight * scale));
    canvas.width = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
    gl.uniform2f(uRes, W, H);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  var start = performance.now(), last = 0, paused = false;
  function frame(now) {
    requestAnimationFrame(frame);
    if (paused || document.hidden) return; // 不可见/滚动时暂停，省 GPU
    if (now - last < 85) return; // 12fps 上限，大幅省 GPU
    last = now;
    mouse.x += (tx - mouse.x) * 0.05;
    mouse.y += (ty - mouse.y) * 0.05;
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  requestAnimationFrame(frame);

  // 滚动时暂停背景渲染，停稳后恢复（解决滑动卡顿 + 省 GPU）
  var scrollTimer;
  window.addEventListener("scroll", function () {
    paused = true;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () { paused = false; }, 180);
  }, { passive: true });
})();
