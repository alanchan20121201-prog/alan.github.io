/* =====================================================================
   数据文件 —— 只修改这个文件，就能更新整个网站
   支持四种语言：zh-CN 简体 / zh-TW 繁体 / ja 日文 / en 英文
   ===================================================================== */
const USER = "alanchan20121201-prog"; // 你的 GitHub 用户名
const G = "https://github.com/" + USER;

// 统一的下载链接格式：https://github.com/用户名/仓库名/releases/download/版本号/文件.exe
const DL = (repo, tag, file) => G + "/" + repo + "/releases/download/" + tag + "/" + file;
const ZIP = (repo, branch) => G + "/" + repo + "/archive/refs/heads/" + (branch || "main") + ".zip";

// 语言列表
const LANGS = [
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "ja",    label: "日本語" },
  { code: "en",    label: "English" }
];

// 界面文字
const UI = {
  "zh-CN": {
    home:"首页", projects:"项目", articles:"我的文章", about:"关于", hello:"你好，我是",
    sectionProjects:"项目", projectsNote:"我的开源项目。点击「查看详情」可以看到完整介绍与下载方式。",
    sectionArticles:"我的文章", articlesNote:"我发布的文章与笔记，点击标题查看完整内容。",
    sectionAbout:"关于我", viewDetail:"查看详情", download:"下载", githubView:"在 GitHub 查看",
    backHome:"返回首页", backProjects:"← 返回项目列表", backArticles:"← 返回文章列表",
    notFoundProject:"找不到这个项目", notFoundProjectDesc:"请从首页项目列表重新进入。",
    notFoundArticle:"找不到这篇文章", copyright:"版权所有",
    repoLabel:"GitHub 仓库：", versionLabel:"版本：", fileLabel:"文件：", downloadLabel:"下载地址：",
    noRelease:"该项目没有发布安装包，下载为源码压缩包。"
  },
  "zh-TW": {
    home:"首頁", projects:"專案", articles:"我的文章", about:"關於", hello:"你好，我是",
    sectionProjects:"專案", projectsNote:"我的開源專案。點擊「查看詳情」可以看到完整介紹與下載方式。",
    sectionArticles:"我的文章", articlesNote:"我發表的文章與筆記，點擊標題查看完整內容。",
    sectionAbout:"關於我", viewDetail:"查看詳情", download:"下載", githubView:"在 GitHub 查看",
    backHome:"返回首頁", backProjects:"← 返回專案列表", backArticles:"← 返回文章列表",
    notFoundProject:"找不到這個專案", notFoundProjectDesc:"請從首頁專案列表重新進入。",
    notFoundArticle:"找不到這篇文章", copyright:"版權所有",
    repoLabel:"GitHub 儲存庫：", versionLabel:"版本：", fileLabel:"檔案：", downloadLabel:"下載位址：",
    noRelease:"該專案沒有發布安裝包，下載為原始碼壓縮檔。"
  },
  "ja": {
    home:"ホーム", projects:"プロジェクト", articles:"記事", about:"概要", hello:"こんにちは、私は",
    sectionProjects:"プロジェクト", projectsNote:"私のオープンソースプロジェクトです。「詳細を見る」をクリックすると、完全な紹介とダウンロード方法が表示されます。",
    sectionArticles:"記事", articlesNote:"私が書いた記事とメモです。タイトルをクリックすると全文が読めます。",
    sectionAbout:"私について", viewDetail:"詳細を見る", download:"ダウンロード", githubView:"GitHub で見る",
    backHome:"ホームに戻る", backProjects:"← プロジェクト一覧に戻る", backArticles:"← 記事一覧に戻る",
    notFoundProject:"プロジェクトが見つかりません", notFoundProjectDesc:"ホームのプロジェクト一覧から再度お進みください。",
    notFoundArticle:"記事が見つかりません", copyright:"無断転載を禁じます",
    repoLabel:"GitHub リポジトリ：", versionLabel:"バージョン：", fileLabel:"ファイル：", downloadLabel:"ダウンロード URL：",
    noRelease:"インストーラーは公開されていないため、ダウンロードはソースの ZIP です。"
  },
  "en": {
    home:"Home", projects:"Projects", articles:"My Articles", about:"About", hello:"Hi, I'm",
    sectionProjects:"Projects", projectsNote:"My open-source projects. Click \"View details\" for the full description and download options.",
    sectionArticles:"My Articles", articlesNote:"Articles and notes I've published. Click a title to read the full text.",
    sectionAbout:"About Me", viewDetail:"View details", download:"Download", githubView:"View on GitHub",
    backHome:"Back to home", backProjects:"← Back to projects", backArticles:"← Back to articles",
    notFoundProject:"Project not found", notFoundProjectDesc:"Please go back to the project list on the home page.",
    notFoundArticle:"Article not found", copyright:"All rights reserved",
    repoLabel:"GitHub repository:", versionLabel:"Version:", fileLabel:"File:", downloadLabel:"Download URL:",
    noRelease:"No installer is published; the download is a source ZIP."
  }
};

// 网站基本信息（多语言）
const SITE = {
  siteName: { "zh-CN":"我的网站", "zh-TW":"我的網站", "ja":"マイサイト", "en":"My Site" },
  heroBio: {
    "zh-CN":"欢迎来到我的个人网站。我会做项目，也会写下我学到的东西。",
    "zh-TW":"歡迎來到我的個人網站。我會做專案，也會寫下我學到的東西。",
    "ja":"私の個人サイトへようこそ。プロジェクトを作り、学んだことを書いています。",
    "en":"Welcome to my personal site. I build things and write about what I learn."
  },
  about: {
    "zh-CN":"我是一个喜欢做实用项目、并通过写作分享知识的开发者。所有项目都开源在我的 GitHub 上。",
    "zh-TW":"我是一個喜歡做實用專案、並透過寫作分享知識的開發者。所有專案都開源在我的 GitHub 上。",
    "ja":"実用的なプロジェクトを作り、執筆を通じて知識を共有するのが好きな開発者です。すべてのプロジェクトは GitHub で公開しています。",
    "en":"I'm a developer who enjoys building useful projects and sharing knowledge through writing. All my projects are open source on GitHub."
  }
};

// 项目：repo = 仓库名，tag = 版本号，file = exe 文件名；i18n 里是四种语言的标题/介绍/标签
const DATA = {
  heroName: "Alan Chan",
  socials: [ { label: "GitHub", url: G } ],
  projects: [
    {
      repo:"corpus-canvas", tag:"v1.5.8", file:"CorpusCanvas-Portable-1.5.8.exe",
      i18n:{
        "zh-CN":{ title:"Corpus Canvas", desc:"一份资料，多种画法。以资料为唯一来源的本地优先思维导图工具。支持把同一份资料用不同视角画出来，数据保存在本地。", tags:["JavaScript","思维导图","本地优先"] },
        "zh-TW":{ title:"Corpus Canvas", desc:"一份資料，多種畫法。以資料為唯一來源的本機優先心智圖工具。支援把同一份資料用不同視角畫出來，資料保存在本機。", tags:["JavaScript","心智圖","本機優先"] },
        "ja":{ title:"Corpus Canvas", desc:"一つのデータを、複数の描き方で。データを唯一の情報源とするローカルファーストのマインドマップツール。同じデータを異なる視点で描けます。データはローカルに保存されます。", tags:["JavaScript","マインドマップ","ローカルファースト"] },
        "en":{ title:"Corpus Canvas", desc:"One corpus, many views. A local-first mind mapping tool that treats your corpus as the single source of truth. Draw the same material from different angles; data stays on your device.", tags:["JavaScript","Mind map","Local-first"] }
      }
    },
    {
      repo:"Toolbox", tag:"exe", file:"Toolbox-Setup-1.0.6.exe",
      i18n:{
        "zh-CN":{ title:"Toolbox", desc:"一个多功能的实用工具箱集合，把常用小工具集中在一个地方，方便随时取用。", tags:["JavaScript","工具箱"] },
        "zh-TW":{ title:"Toolbox", desc:"一個多功能的實用工具箱集合，把常用小工具集中在一個地方，方便隨時取用。", tags:["JavaScript","工具箱"] },
        "ja":{ title:"Toolbox", desc:"便利なツールをまとめたマルチユーティリティボックス。よく使う小物を一か所に集めて、いつでもすぐに使えます。", tags:["JavaScript","ツールボックス"] },
        "en":{ title:"Toolbox", desc:"A versatile toolbox that gathers everyday utilities in one place so they're always at hand.", tags:["JavaScript","Toolbox"] }
      }
    },
    {
      repo:"PixelPet", tag:"v1.0.0", file:"PixelPet-zh-CN.exe",
      i18n:{
        "zh-CN":{ title:"PixelPet", desc:"像素风宠物养成模拟器，支持 HTML/CSS/JS 与 C# WebView2 两种版本，提供中文、英文、日文界面。", tags:["JavaScript","C#","游戏"] },
        "zh-TW":{ title:"PixelPet", desc:"像素風寵物養成模擬器，支援 HTML/CSS/JS 與 C# WebView2 兩種版本，提供中文、英文、日文介面。", tags:["JavaScript","C#","遊戲"] },
        "ja":{ title:"PixelPet", desc:"ピクセルアートのペット育成シミュレーター。HTML/CSS/JS 版と C# WebView2 版を提供し、日本語・英語・中国語のインターフェースに対応。", tags:["JavaScript","C#","ゲーム"] },
        "en":{ title:"PixelPet", desc:"A pixel-art pet raising simulator with HTML/CSS/JS and C# WebView2 versions, available in Chinese, English and Japanese.", tags:["JavaScript","C#","Game"] }
      }
    },
    {
      repo:"File-Transfer", tag:"windows", file:"LANQuickShare-ZH-Portable.exe",
      i18n:{
        "zh-CN":{ title:"区网快传 File Transfer", desc:"同一 Wi-Fi 下电脑间传文字与任意文件，免登录、免云端。手机浏览器打开网址即可上传和接收，内置 UDP 搜索、手动 IP、拖放传档与记录。", tags:["Python","局域网","文件传输"] },
        "zh-TW":{ title:"區網快傳 File Transfer", desc:"同一 Wi-Fi 下電腦間傳文字與任意檔案，免登入、免雲端。手機瀏覽器開啟網址即可上傳和接收，內建 UDP 搜尋、手動 IP、拖放傳檔與記錄。", tags:["Python","區域網路","檔案傳輸"] },
        "ja":{ title:"LAN Quick Share", desc:"同じ Wi-Fi 内で PC 間がテキストや任意のファイルを送受信できるツール。ログインもクラウドも不要。スマホのブラウザで URL を開くだけでアップロード・受信が可能。UDP 検索、手動 IP、ドラッグ＆ドロップ転送、履歴を内蔵。", tags:["Python","ローカルネットワーク","ファイル転送"] },
        "en":{ title:"LAN Quick Share", desc:"Send text and any files between PCs on the same Wi-Fi — no login, no cloud. Open the URL in a phone browser to upload or receive. Includes UDP discovery, manual IP, drag-and-drop transfers and history.", tags:["Python","LAN","File transfer"] }
      }
    },
    {
      repo:"Password-Generator", tag:"windows", file:"Secure-Password-Generator-Portable-ZH.exe",
      i18n:{
        "zh-CN":{ title:"密码生成器 Password Generator", desc:"纯本地运行的密码生成器、强度分析器与本地密码库，中英文界面一键切换，数据完全不上传，提供便携版与安装版。", tags:["TypeScript","密码","离线"] },
        "zh-TW":{ title:"密碼產生器 Password Generator", desc:"純本機執行的密碼產生器、強度分析器與本機密碼庫，中英文介面一鍵切換，資料完全不上傳，提供可攜版與安裝版。", tags:["TypeScript","密碼","離線"] },
        "ja":{ title:"パスワードジェネレーター", desc:"完全ローカルで動作するパスワードジェネレーター、強度分析ツール、ローカル保管庫。日英中のインターフェースを切り替え可能で、データは一切アップロードされません。ポータブル版とインストール版を用意。", tags:["TypeScript","パスワード","オフライン"] },
        "en":{ title:"Password Generator", desc:"A fully offline password generator, strength analyzer and local vault. Switch between Chinese, English and Japanese interfaces. Nothing is uploaded. Portable and installer builds available.", tags:["TypeScript","Password","Offline"] }
      }
    },
    {
      repo:"Note-app", tag:"Windows", file:"NoteApp-V1.0.0.exe",
      i18n:{
        "zh-CN":{ title:"Note App", desc:"极简的本地优先桌面笔记应用，支持标准化文件命名、内置回收站，并提供可携带的 Windows 版本。", tags:["JavaScript","Electron","笔记"] },
        "zh-TW":{ title:"Note App", desc:"極簡的本地優先桌面筆記應用程式，支援標準化檔案命名、內建回收桶，並提供可攜式 Windows 版本。", tags:["JavaScript","Electron","筆記"] },
        "ja":{ title:"Note App", desc:"ミニマルなローカルファーストのデスクトップメモアプリ。ファイル名の標準化、ゴミ箱機能を内蔵し、ポータブル版の Windows ビルドも提供。", tags:["JavaScript","Electron","メモ"] },
        "en":{ title:"Note App", desc:"A minimalist local-first desktop note app with standardized file naming and a built-in trash bin. A portable Windows build is available.", tags:["JavaScript","Electron","Notes"] }
      }
    },
    {
      repo:"GhostNote", tag:"v1.1.0", file:"GhostNote-zh-cn-v1.1.0-win-x64.exe",
      i18n:{
        "zh-CN":{ title:"GhostNote", desc:"把一句话刻在桌面上，永远置顶、鼠标穿透的 Windows 小工具。", tags:["C#","WPF","桌面小工具"] },
        "zh-TW":{ title:"GhostNote", desc:"把一句話刻在桌面上，永遠置頂、滑鼠穿透的 Windows 小工具。", tags:["C#","WPF","桌面小工具"] },
        "ja":{ title:"GhostNote", desc:"一文をデスクトップに刻み込む、常に最前面でマウスを透過する Windows ユーティリティ。", tags:["C#","WPF","デスクトップガジェット"] },
        "en":{ title:"GhostNote", desc:"A Windows utility that pins a note onto your desktop — always on top, with mouse clicks passing through.", tags:["C#","WPF","Desktop widget"] }
      }
    },
    {
      repo:"Chinese-English-bilingual-translation", tag:"", file:"",
      i18n:{
        "zh-CN":{ title:"中英双向翻译网页", desc:"极简的单档案中英双向翻译网页，支持中英界面自由切换、一键复制与快捷清空。该项目没有发布安装包，下载按钮提供源码压缩包。", tags:["HTML","翻译","单文件"] },
        "zh-TW":{ title:"中英雙向翻譯網頁", desc:"極簡的單檔案中英雙向翻譯網頁，支援中英介面自由切換、一鍵複製與快捷清空。該專案沒有發布安裝包，下載按鈕提供原始碼壓縮檔。", tags:["HTML","翻譯","單檔案"] },
        "ja":{ title:"中英双方向翻訳ページ", desc:"ミニマルな単一ファイルの日中英双方向翻訳ページ。インターフェースの切り替え、ワンクリックコピー、ワンタッチクリアに対応。インストーラーはないため、ダウンロードはソースの ZIP です。", tags:["HTML","翻訳","単一ファイル"] },
        "en":{ title:"Chinese-English Translation", desc:"A minimalist single-file Chinese-English translation page with switchable interfaces, one-click copy and quick clear. No installer is published; the download is a source ZIP.", tags:["HTML","Translation","Single file"] }
      }
    },
    {
      repo:"CoreFactory", tag:"v0.4.0", file:"CoreFactory2D.exe",
      i18n:{
        "zh-CN":{ title:"CoreFactory", desc:"使用 AI 辅助创作的游戏项目。", tags:["C#","游戏","AI"] },
        "zh-TW":{ title:"CoreFactory", desc:"使用 AI 輔助創作的遊戲專案。", tags:["C#","遊戲","AI"] },
        "ja":{ title:"CoreFactory", desc:"AI を活用して制作したゲームプロジェクト。", tags:["C#","ゲーム","AI"] },
        "en":{ title:"CoreFactory", desc:"A game project created with the help of AI.", tags:["C#","Game","AI"] }
      }
    },
    {
      repo:"ClipHist", tag:"v1.0.0", file:"ClipHist-zh-CN.exe",
      i18n:{
        "zh-CN":{ title:"ClipHist", desc:"轻量 Windows 剪贴板历史工具，纯 Win32，单文件便携版，总体积约 600KB，支持四种界面语言。", tags:["C","剪贴板","Windows"] },
        "zh-TW":{ title:"ClipHist", desc:"輕量 Windows 剪貼簿歷史工具，純 Win32，單檔可攜版，總體積約 600KB，支援四種介面語言。", tags:["C","剪貼簿","Windows"] },
        "ja":{ title:"ClipHist", desc:"軽量な Windows クリップボード履歴ツール。純粋な Win32 で、単一ファイルのポータブル版、合計約 600KB、4 言語のインターフェースに対応。", tags:["C","クリップボード","Windows"] },
        "en":{ title:"ClipHist", desc:"A lightweight Windows clipboard history tool built with pure Win32. Single-file portable build, about 600KB total, with four UI languages.", tags:["C","Clipboard","Windows"] }
      }
    },
    {
      repo:"nanotimer", tag:"v1.1.8", file:"nanotimer-1.1.8-portable.exe",
      i18n:{
        "zh-CN":{ title:"nanotimer", desc:"无边框透明悬浮倒计时、秒表与番茄钟，四种显示模式与语言，支持应用内更新。", tags:["JavaScript","Electron","计时器"] },
        "zh-TW":{ title:"nanotimer", desc:"無邊框透明懸浮倒數計時、碼表與番茄鐘，四種顯示模式與語言，支援應用程式內更新。", tags:["JavaScript","Electron","計時器"] },
        "ja":{ title:"nanotimer", desc:"枠なし透明のフローティングタイマー、ストップウォッチ、ポモドーロタイマー。4 つの表示モードと言語に対応し、アプリ内アップデートも可能。", tags:["JavaScript","Electron","タイマー"] },
        "en":{ title:"nanotimer", desc:"A frameless, transparent floating countdown, stopwatch and Pomodoro timer with four display modes and languages, plus in-app updates.", tags:["JavaScript","Electron","Timer"] }
      }
    },
    {
      repo:"TopMostPin", tag:"window", file:"TopMostPin.exe",
      i18n:{
        "zh-CN":{ title:"TopMostPin", desc:"Windows 托盘小工具：Ctrl+Alt+L 一键把指定窗口锁定置顶，并带高亮边框。", tags:["C#","Windows","效率"] },
        "zh-TW":{ title:"TopMostPin", desc:"Windows 托盤小工具：Ctrl+Alt+L 一鍵把指定視窗鎖定置頂，並帶高亮框線。", tags:["C#","Windows","效率"] },
        "ja":{ title:"TopMostPin", desc:"Windows トレイユーティリティ。Ctrl+Alt+L で指定ウィンドウを最前面に固定し、ハイライト枠を表示します。", tags:["C#","Windows","生産性"] },
        "en":{ title:"TopMostPin", desc:"A Windows tray utility: press Ctrl+Alt+L to pin a chosen window on top, with a highlighted border.", tags:["C#","Windows","Productivity"] }
      }
    }
  ],

  // 我的文章：content 是点开后的正文
  articles: [
    {
      date:"2026-11-17",
      i18n:{
        "zh-CN":{ title:"我的第一篇博客", excerpt:"这是文章的简短摘要，点开标题可以查看完整内容。", content:"这里是文章正文。你可以在 data.js 里修改 content 字段，写下完整的文章内容。" },
        "zh-TW":{ title:"我的第一篇部落格", excerpt:"這是文章的簡短摘要，點開標題可以查看完整內容。", content:"這裡是文章正文。你可以在 data.js 裡修改 content 欄位，寫下完整的文章內容。" },
        "ja":{ title:"私の最初のブログ投稿", excerpt:"記事の短い概要です。タイトルをクリックすると全文が読めます。", content:"ここが本文です。data.js の content フィールドを編集して、記事の本文を書いてください。" },
        "en":{ title:"My First Blog Post", excerpt:"A short preview of the article. Click the title to read the full text.", content:"This is the article body. Edit the content field in data.js to write your full article." }
      }
    },
    {
      date:"2026-11-01",
      i18n:{
        "zh-CN":{ title:"我是怎么搭建这个网站的", excerpt:"简单记录一下这个个人网站是怎么做出来的。", content:"这是一个纯静态网站，由一个 index.html、一个数据文件 data.js，以及项目详情页 detail.html 和文章详情页 article.html 组成。更新网站只需要改 data.js。" },
        "zh-TW":{ title:"我是怎麼搭建這個網站的", excerpt:"簡單記錄一下這個個人網站是怎麼做出來的。", content:"這是一個純靜態網站，由一個 index.html、一個資料檔 data.js，以及專案詳情頁 detail.html 和文章詳情頁 article.html 組成。更新網站只需要改 data.js。" },
        "ja":{ title:"このサイトの作り方", excerpt:"この個人サイトをどう作ったかを簡単に記録します。", content:"これは静的サイトです。index.html、データファイルの data.js、プロジェクト詳細ページ detail.html、記事詳細ページ article.html で構成されています。更新するときは data.js だけを編集します。" },
        "en":{ title:"How I Built This Site", excerpt:"A short note about how this personal website was made.", content:"This is a static site made of index.html, the data file data.js, the project detail page detail.html and the article detail page article.html. To update it, just edit data.js." }
      }
    }
  ]
};

/* 自动生成链接，不需要手动改 */
DATA.projects.forEach(p => {
  p.github = G + "/" + p.repo;
  p.detail = "detail.html?id=" + encodeURIComponent(p.repo);
  p.download = p.tag ? DL(p.repo, p.tag, p.file) : ZIP(p.repo);
});
DATA.articles.forEach((a, i) => { a.detail = "article.html?i=" + i; });
