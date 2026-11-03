// ===== 作品数据：在这里增删改你的项目 =====
// cat: video | admin | app | ext | web
const WORKS = [
  { cat: 'video', icon: '🎬', hue: 10,  time: '02:30', title: '品牌宣传片', for: '新品发布会',   desc: '从脚本、分镜到剪辑调色的一支品牌短片，节奏紧凑、情绪饱满。', tags: ['脚本分镜', '剪辑调色', '配乐字幕'] },
  { cat: 'video', icon: '🎞️', hue: 330, time: '01:00', title: '代码生成动画短片', for: '科普解说',     desc: '用代码逐帧绘制的风格化动画，油画、水彩、浮世绘多种画风可选。', tags: ['程序化动画', 'AI 辅助', '多风格'] },
  { cat: 'admin', icon: '🗂️', hue: 210, time: 'Web',   title: '主数据管理平台',   for: '企业数据治理', desc: '多源数据采集、字段映射、同步引擎与数据质量看板。', tags: ['Vue3', 'Spring Boot', 'MySQL'] },
  { cat: 'admin', icon: '📊', hue: 190, time: 'Web',   title: '运营数据看板',     for: '电商运营',     desc: '销售、库存、订单实时可视化，支持钻取分析与报表导出。', tags: ['ECharts', '报表导出', '权限控制'] },
  { cat: 'app',   icon: '📱', hue: 150, time: 'iOS/Android', title: '跨平台生活 App', for: '本地服务', desc: 'Flutter 一套代码双端上线，含登录、支付、消息推送。', tags: ['Flutter', '支付', '推送'] },
  { cat: 'app',   icon: '🟢', hue: 120, time: '小程序', title: '预约小程序',       for: '门店服务',     desc: '在线预约、会员积分、核销管理，配套商家后台。', tags: ['微信小程序', '会员体系', '后台'] },
  { cat: 'ext',   icon: '🧩', hue: 270, time: 'Chrome', title: 'AI 侧边栏助手',   for: '效率工具',     desc: '浏览任意网页时一键总结、翻译、提取表格数据。', tags: ['Manifest V3', 'AI 接口', '侧边栏'] },
  { cat: 'ext',   icon: '⚡', hue: 290, time: 'Chrome', title: '自动化填表插件',   for: '后台录入',     desc: '识别表单字段，批量导入 Excel 数据自动填写提交。', tags: ['Content Script', 'Excel', '自动化'] },
  { cat: 'web',   icon: '🌐', hue: 40,  time: 'Web',   title: '企业官网',         for: '制造业客户',   desc: '中英双语响应式官网，SEO 优化，后台可自助更新内容。', tags: ['响应式', 'SEO', '多语言'] },
  { cat: 'web',   icon: '✨', hue: 55,  time: 'Web',   title: '个人作品集博客',   for: '就是这个站',   desc: '纯静态、零依赖，部署在 GitHub Pages，手机电脑自适应。', tags: ['HTML/CSS/JS', 'GitHub Pages', '暗色模式'] },
];
const CAT_NAME = { video: '视频', admin: '管理系统', app: 'App', ext: '网页插件', web: '网页' };

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Render works
const grid = $('#workGrid');
grid.innerHTML = WORKS.map((w, i) => `
  <article class="work-card reveal" data-cat="${w.cat}" data-i="${i}" tabindex="0" role="button" aria-label="${w.title}">
    <div class="thumb" style="--h:${w.hue}">${w.icon}<span class="badge">${w.time}</span></div>
    <div class="work-body">
      <p class="eyebrow">${CAT_NAME[w.cat]}</p>
      <h3>${w.title}</h3>
      <p class="credit">for <em>${w.for}</em></p>
      <p>${w.desc}</p>
      <ul class="tags">${w.tags.map(t => `<li>${t}</li>`).join('')}</ul>
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
  $('#modalMedia').innerHTML = `<div class="thumb" style="--h:${w.hue}">${w.icon}</div>`;
  $('#modalCat').textContent = `${CAT_NAME[w.cat]} · for ${w.for}`;
  $('#modalTitle').textContent = w.title;
  $('#modalDesc').textContent = w.desc;
  $('#modalTags').innerHTML = w.tags.map(t => `<li>${t}</li>`).join('');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }
grid.addEventListener('click', e => { const c = e.target.closest('.work-card'); if (c) openModal(+c.dataset.i); });
grid.addEventListener('keydown', e => { const c = e.target.closest('.work-card'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openModal(+c.dataset.i); } });
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
