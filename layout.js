/* 公共布局：左侧导航 + 语言切换 —— 不需要修改 */

(function () {
  const $ = id => document.getElementById(id);
  const box = $("sidebar");
  if (!box) return;

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

  const initial = document.body.dataset.active || "home";
  const mark = key => {
    document.querySelectorAll("#sidebar nav a").forEach(a =>
      a.classList.toggle("active", a.dataset.sec === key));
  };
  mark(initial);

  const sections = document.querySelectorAll("main section[id]");
  if (sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) mark(e.target.id);
      });
    }, { threshold: 0.35 });
    sections.forEach(s => io.observe(s));
  }
})();
