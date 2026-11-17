/* 公共布局：电影感背景 + 左侧导航 + 语言切换 —— 不需要修改 */

(function () {
  const $ = id => document.getElementById(id);

  /* 电影感背景层（所有页面通用） */
  if (!document.getElementById("cinema")) {
    const cinema = document.createElement("div");
    cinema.id = "cinema";
    cinema.className = "cinema";
    cinema.innerHTML =
      '<div class="cinema-glow"></div>' +
      '<div class="cinema-aurora"></div>' +
      '<div class="cinema-stars"></div>' +
      '<div class="cinema-beam"></div>' +
      '<div class="cinema-grain"></div>' +
      '<div class="cinema-vignette"></div>';
    document.body.insertBefore(cinema, document.body.firstChild);
  }

  const box = $("sidebar");
  if (box) {
    box.innerHTML = `
      <div class="logo" id="siteName"></div>
      <nav>
        <a href="index.html#home" data-sec="home" id="navHome"></a>
        <a href="index.html#projects" data-sec="projects" id="navProjects"></a>
        <a href="index.html#articles" data-sec="articles" id="navArticles"></a>
        <a href="index.html#about" data-sec="about" id="navAbout"></a>
      </nav>
      <div class="langs" id="langs"></div>`;

    $("siteName").textContent = S("siteName");
    $("navHome").textContent = T("home");
    $("navProjects").textContent = T("projects");
    $("navArticles").textContent = T("articles");
    $("navAbout").textContent = T("about");
    $("langs").innerHTML = langSwitcher();

    window.__markNav = key => {
      document.querySelectorAll("#sidebar nav a").forEach(a =>
        a.classList.toggle("active", a.dataset.sec === key));
    };
    // 不在这里设置初始高亮，交给各页面的 IntersectionObserver 处理
  }
})();
