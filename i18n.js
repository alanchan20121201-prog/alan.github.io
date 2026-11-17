/* =====================================================================
   多语言辅助函数 —— 不需要修改
   ===================================================================== */

// 读取语言：网址 ?lang= > 本地记忆 > 浏览器语言 > 预设英文
function pickLang() {
  const valid = c => LANGS.some(l => l.code === c);
  const norm = x => {
    const map = { jp: "ja", "zh-tw": "zh-TW", "zh-hk": "zh-TW", "zh-cn": "zh-CN", "zh": "zh-CN" };
    return map[String(x).toLowerCase()] || x;
  };

  // 1. 网址参数优先
  const q = new URLSearchParams(location.search).get("lang");
  if (q && valid(norm(q))) {
    localStorage.setItem("site-lang", norm(q));
    return norm(q);
  }

  // 2. 用户手动选择过的语言
  const saved = localStorage.getItem("site-lang");
  if (saved && valid(norm(saved))) return norm(saved);

  // 3. 浏览器语言：取 navigator.languages 第一个能匹配的
  const browserLangs = navigator.languages || [navigator.language];
  for (const raw of browserLangs) {
    const n = norm(raw);
    if (valid(n)) return n;
    // 处理 "en-US" -> "en", "ko-KR" -> "ko", "es-ES" -> "es"
    const short = String(raw).split("-")[0].toLowerCase();
    if (valid(short)) return short;
  }

  // 4. 预设英文
  return "en";
}

const LANG = pickLang();
document.documentElement.lang = LANG;

// 取界面文字
function T(key) {
  return (UI[LANG] && UI[LANG][key]) || UI["zh-CN"][key] || key;
}

// 取网站基本信息（多语言）
function S(key) {
  return (SITE[key] && SITE[key][LANG]) || (SITE[key] && SITE[key]["zh-CN"]) || "";
}

// 取项目/文章的多语言字段
function C(item, field) {
  const i = item.i18n || {};
  return (i[LANG] && i[LANG][field]) || (i["zh-CN"] && i["zh-CN"][field]) || "";
}

// 给链接加上当前语言参数
function L(url) {
  const u = new URL(url, location.href);
  u.searchParams.set("lang", LANG);
  return u.pathname + u.search + u.hash;
}

// 生成语言切换器：保留当前页面和参数
function langSwitcher() {
  return LANGS.map(l => {
    const u = new URL(location.href);
    u.searchParams.set("lang", l.code);
    const active = l.code === LANG ? ' class="active"' : '';
    return `<a href="${u.pathname + u.search + u.hash}"${active}>${l.label}</a>`;
  }).join("");
}
