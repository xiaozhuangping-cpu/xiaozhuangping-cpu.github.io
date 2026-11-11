// ===== 作品数据：在这里增删改你的项目 =====
// cat: video | admin | app | ext | web
const WORKS = [
  { cat: 'web', icon: '✳️', hue: 105, time: '在线', live: true, title: '项目来信 · 开发需求收集站', for: '软件开发需求收集与跟进',
    desc: '面向网站、小程序、管理系统和 AI 应用等开发需求的收集网站。客户填写需求后保存至 Supabase；管理员登录后台后可搜索、筛选、分页查看，并记录状态、报价和跟进备注。页面支持手机与电脑访问，通知渠道待配置。',
    tags: ['React', 'shadcn/ui', 'AG Grid', 'Supabase', '响应式'],
    links: [{ label: '在线体验 →', href: 'https://xiaozhuangping-cpu.github.io/project-inquiry/', primary: true },
            { label: '查看源码', href: 'https://github.com/xiaozhuangping-cpu/project-inquiry' }] },
  { cat: 'video', icon: '🎞️', hue: 170, time: '01:03', live: true, title: 'Wavely 产品宣传片（代码渲染）', for: 'Wavely 跨境电商全链路',
    img: 'assets/works/wavely-promo.jpg',
    gallery: ['https://xiaozhuangping-cpu.github.io/wavely-crossborder/promo/wavely-promo.mp4'],
    desc: '暗色科技发布风格的一分钟产品片：一张货源卡走完 1688 采集 → AI 本地化 → 五语言上架 → 下单 → 扫码发货 → 补货审批，四端闭环收成一个大数字。画面全部用 Canvas 逐帧渲染（每一帧都是时间的纯函数），配乐为原创合成、按 100 BPM 节拍表与画面事件对齐，AI 中文配音逐句语音识别校对，混音到 −14 LUFS。源码与一键构建脚本开源。',
    tags: ['程序化动画', 'Canvas', '原创配乐', 'AI 配音', '节拍对齐'],
    links: [{ label: '观看宣传片 →', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/promo/wavely-promo.mp4', primary: true },
            { label: '查看源码', href: 'https://github.com/xiaozhuangping-cpu/wavely-crossborder/tree/main/wavely-promo' }] },
  { cat: 'video', icon: '🎬', hue: 10,  time: '02:30', title: '品牌宣传片', for: '新品发布会',   desc: '从脚本、分镜到剪辑调色的一支品牌短片，节奏紧凑、情绪饱满。', tags: ['脚本分镜', '剪辑调色', '配乐字幕'] },
  { cat: 'admin', icon: '🌊', hue: 195, time: '在线', live: true, title: 'Wavely 跨境电商 ERP', for: '跨境卖家多平台运营',
    img: 'assets/works/wavely-erp-dashboard.jpg', gallery: ['assets/works/wavely-erp-dashboard.jpg', 'assets/works/wavely-erp-inbox.jpg', 'assets/works/wavely-1688-collect.jpg'],
    desc: 'Amazon / Shopee / TikTok Shop / 独立站订单统一处理；SPU + 多规格 SKU、海外仓 / FBA 库存预警；按仓库计算补货建议，一键按供应商拆单生成采购单，分批收货入库。老板 / 采购 / 仓库三种角色的权限在数据库层强制，超过 ¥5,000 的采购单走审批流，关键操作全部记入操作日志，采购单与补货建议可导出 Excel。内置 AI 运营助手：问数据出图表、写多语言 Listing、查补货，写操作需确认。每次发布前 CI 自动跑数据库测试。访客免注册，可切换身份体验。',
    tags: ['React', 'react-admin', 'Supabase / Postgres', 'RBAC 权限', '审批流', '操作日志', 'Excel 导出', 'AI 工具调用', 'CI 测试'],
    links: [{ label: '在线体验 →', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/erp/', primary: true },
            { label: '查看源码', href: 'https://github.com/xiaozhuangping-cpu/wavely-crossborder' }] },
  { cat: 'admin', icon: '📊', hue: 190, time: 'Web',   title: '运营数据看板',     for: '电商运营',     desc: '销售、库存、订单实时可视化，支持钻取分析与报表导出。', tags: ['ECharts', '报表导出', '权限控制'] },
  { cat: 'app', icon: '📱', hue: 190, time: 'Web / Android', live: true, title: 'Wavely 仓库助手 App', for: '跨境仓库收货与发货',
    img: 'assets/works/wavely-app-warehouse.jpg', gallery: ['assets/works/wavely-app-warehouse.jpg'],
    desc: 'Flutter 一套代码出 Web / Android / iOS，与 Wavely ERP 共用同一个后端：扫码收货入库（扫码枪、相机或模拟扫码）、逐件扫码拣货发货（扫错件提示，拣齐后生成运单号）、库存查询，操作实时同步到 ERP。CI 自动测试、构建网页版并打包安卓安装包。',
    tags: ['Flutter', 'Dart', 'Supabase', '扫码 mobile_scanner', 'Android APK', 'CI 打包'],
    links: [{ label: '网页版试用 →', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/app/', primary: true },
            { label: '下载安卓 APK', href: 'https://github.com/xiaozhuangping-cpu/wavely-crossborder/releases/download/app-latest/wavely-warehouse.apk' },
            { label: '查看源码', href: 'https://github.com/xiaozhuangping-cpu/wavely-crossborder/tree/main/app' }] },
  { cat: 'app',   icon: '📱', hue: 150, time: 'iOS/Android', title: '跨平台生活 App', for: '本地服务', desc: 'Flutter 一套代码双端上线，含登录、支付、消息推送。', tags: ['Flutter', '支付', '推送'] },
  { cat: 'app',   icon: '🟢', hue: 120, time: '小程序', title: '预约小程序',       for: '门店服务',     desc: '在线预约、会员积分、核销管理，配套商家后台。', tags: ['微信小程序', '会员体系', '后台'] },
  { cat: 'ext', icon: '🧩', hue: 270, time: '可安装', live: true, title: 'Wavely 1688 采集插件', for: '跨境卖家选品上架',
    img: 'assets/works/wavely-1688-collect.jpg', gallery: ['assets/works/wavely-1688-collect.jpg'],
    desc: 'Chrome / Edge 插件（Manifest V3）：1688 列表页勾选、跨页累计批量采集，详情页一键采集；读取页面数据得到规格、每个规格的价格 / 库存 / 重量、阶梯价、供应商。后台限速逐个采集，遇到登录或滑块验证自动暂停交给用户。ERP 内置安装入口与版本检测，采集箱里按目标毛利定价，AI 翻译后批量上架。',
    tags: ['Manifest V3', 'Content Script', 'Service Worker', '数据采集', 'AI 本地化'],
    links: [{ label: '安装与体验 →', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/erp/#/import_drafts', primary: true },
            { label: '查看源码', href: 'https://github.com/xiaozhuangping-cpu/wavely-crossborder/tree/main/extension' }] },
  { cat: 'video', icon: '🎬', hue: 20, time: '4 × 8 秒', live: true, title: 'AI 商品场景短片', for: 'Wavely 独立站与社媒投放',
    img: 'assets/works/wavely-film-pet.jpg',
    gallery: ['https://xiaozhuangping-cpu.github.io/wavely-crossborder/shop/videos/WV-PET-001.mp4', 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/shop/videos/WV-OUT-001.mp4', 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/shop/videos/WV-ELE-001.mp4', 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/shop/videos/WV-HOM-003.mp4'],
    desc: '以商品白底图为素材，用 Google Flow（Veo 3.1）生成 4 支带音效的场景短片：橘猫喝水的宠物饮水机、湖边营地的折叠椅、书桌上的三合一无线充、夜间走廊的感应夜灯。逐条检查商品外形还原，ffmpeg 转码为网页格式与封面，投放在独立站首页与商品详情页，ERP 里可上传替换。',
    tags: ['AI 视频生成', 'Veo 3.1', '提示词设计', 'ffmpeg', '电商投放'],
    links: [{ label: '观看短片 →', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/', primary: true },
            { label: '在独立站查看', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/shop/' }] },
  { cat: 'ext',   icon: '🧩', hue: 270, time: 'Chrome', title: 'AI 侧边栏助手',   for: '效率工具',     desc: '浏览任意网页时一键总结、翻译、提取表格数据。', tags: ['Manifest V3', 'AI 接口', '侧边栏'] },
  { cat: 'ext',   icon: '⚡', hue: 290, time: 'Chrome', title: '自动化填表插件',   for: '后台录入',     desc: '识别表单字段，批量导入 Excel 数据自动填写提交。', tags: ['Content Script', 'Excel', '自动化'] },
  { cat: 'web', icon: '🛍️', hue: 190, time: '在线', live: true, title: 'Wavely 多语言独立站 + AI 客服', for: '跨境品牌出海',
    img: 'assets/works/wavely-shop-films.jpg', gallery: ['assets/works/wavely-shop-films.jpg', 'assets/works/wavely-shop-product-de.jpg', 'assets/works/wavely-shop-home.jpg'],
    desc: '中英德日西 5 种语言、6 种币种的品牌独立站，下单实时同步到 ERP。「颜色 × 尺码」分组选规格、商品图放大镜、首页场景短片；从 1688 采集的商品经 AI 本地化后，商品名、规格、描述都是当地语言。内置 AI 客服：多语言导购（对话里直接加购）、查物流、答政策；访客可切换自己的大模型 Key。',
    tags: ['React', 'MUI', 'Supabase', 'AI 客服', '五语言 / 六币种'],
    links: [{ label: '在线体验 →', href: 'https://xiaozhuangping-cpu.github.io/wavely-crossborder/shop/', primary: true },
            { label: '查看源码', href: 'https://github.com/xiaozhuangping-cpu/wavely-crossborder' }] },
  { cat: 'web',   icon: '🌐', hue: 40,  time: 'Web',   title: '企业官网',         for: '制造业客户',   desc: '中英双语响应式官网，SEO 优化，后台可自助更新内容。', tags: ['响应式', 'SEO', '多语言'] },
  { cat: 'web',   icon: '✨', hue: 55,  time: 'Web',   title: '个人作品集博客',   for: '就是这个站',   desc: '纯静态、零依赖，部署在 GitHub Pages，手机电脑自适应。', tags: ['HTML/CSS/JS', 'GitHub Pages', '暗色模式'] },
];
const CAT_NAME = { video: '视频', admin: '管理系统', app: 'App', ext: '网页插件', web: '网页' };

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Render works
const grid = $('#workGrid');
WORKS.sort((a, b) => (b.live ? 1 : 0) - (a.live ? 1 : 0));   // 在线项目排最前（sort 是稳定的）

const thumbHtml = (w) => w.img
  ? `<div class="thumb has-img"><img src="${w.img}" alt="${w.title} 截图" loading="lazy" /><span class="badge${w.live ? ' live' : ''}">${w.live ? '● ' : ''}${w.time}</span></div>`
  : `<div class="thumb" style="--h:${w.hue}">${w.icon}<span class="badge">${w.time}</span></div>`;
const linksHtml = (w) => (w.links ?? []).map(l =>
  `<a class="btn ${l.primary ? 'btn-primary' : 'btn-ghost'} btn-sm" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('');

grid.innerHTML = WORKS.map((w, i) => `
  <article class="work-card reveal" data-cat="${w.cat}" data-i="${i}" tabindex="0" role="button" aria-label="${w.title}">
    ${thumbHtml(w)}
    <div class="work-body">
      <p class="eyebrow">${CAT_NAME[w.cat]} · <span class="ai-tag">AI 辅助生成</span></p>
      <h3>${w.title}</h3>
      <p class="credit">for <em>${w.for}</em></p>
      <details class="work-details">
        <summary><span class="when-closed">展开作品描述</span><span class="when-open">收起作品描述</span></summary>
        <p>${w.desc}</p>
      </details>
      <ul class="tags">${w.tags.map(t => `<li>${t}</li>`).join('')}</ul>
      ${w.links ? `<div class="card-links">${linksHtml(w)}</div>` : ''}
    </div>
  </article>`).join('');

// Filter
const countEl = $('#workCount');
function applyFilter(f) {
  let n = 0;
  $$('.work-card').forEach(c => {
    const show = f === 'all' || c.dataset.cat === f;
    c.classList.toggle('hide', !show);
    if (show) n++;
  });
  countEl.textContent = n;
}
$$('.chip').forEach(chip => chip.addEventListener('click', () => {
  $$('.chip').forEach(c => c.classList.toggle('active', c === chip));
  applyFilter(chip.dataset.filter);
}));
applyFilter('all');

// Modal
const modal = $('#modal');
function openModal(i) {
  const w = WORKS[i];
  $('#modalMedia').innerHTML = w.gallery
    ? `<div class="gallery">${w.gallery.map(src => /\.mp4$/.test(src)
        ? `<video src="${src}" muted loop autoplay playsinline controls preload="metadata"></video>`
        : `<img src="${src}" alt="${w.title} 截图" loading="lazy" />`).join('')}</div>`
    : `<div class="thumb" style="--h:${w.hue}">${w.icon}</div>`;
  $('#modalCat').textContent = `${CAT_NAME[w.cat]} · for ${w.for} · AI 辅助生成`;
  $('#modalTitle').textContent = w.title;
  $('#modalDesc').textContent = w.desc;
  $('#modalTags').innerHTML = w.tags.map(t => `<li>${t}</li>`).join('');
  $('#modalLinks').innerHTML = linksHtml(w);
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; $('#modalMedia').innerHTML = ''; }   // 清空以停止视频播放
grid.addEventListener('click', e => { if (e.target.closest('a, details')) return; const c = e.target.closest('.work-card'); if (c) openModal(+c.dataset.i); });
grid.addEventListener('keydown', e => { if (e.target.closest('a, details')) return; const c = e.target.closest('.work-card'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openModal(+c.dataset.i); } });
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

// Mobile menu
const menuBtn = $('#menuBtn'), navLinks = $('#navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
$$('#navLinks a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Theme toggle
$('#themeBtn').addEventListener('click', () => {
  const root = document.documentElement;
  const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = cur === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Reveal on scroll + count-up
const countUp = el => {
  const target = +el.dataset.count, suffix = el.dataset.suffix || '', start = performance.now();
  const tick = t => {
    const p = Math.min((t - start) / 1200, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    $$('[data-count]', en.target).forEach(countUp);
    io.unobserve(en.target);
  }), { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('in'));
  $$('[data-count]').forEach(el => el.textContent = el.dataset.count + (el.dataset.suffix || ''));
}

$('#year').textContent = new Date().getFullYear();
