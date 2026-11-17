/* =====================================================================
   多语言辅助函数 —— 不需要修改
   ===================================================================== */

// 从网址 ?lang= 或本地记忆中读取当前语言；jp 视为 ja
function pickLang() {
  const q = new URLSearchParams(location.search).get("lang");
  const norm = x => x === "jp" ? "ja" : x;
  const valid = c => LANGS.some(l => l.code === c);
  if (q && valid(norm(q))) {
    localStorage.setItem("site-lang", norm(q));
    return norm(q);
  }
  const saved = localStorage.getItem("site-lang");
  if (saved && valid(norm(saved))) return norm(saved);
  return "zh-CN";
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
