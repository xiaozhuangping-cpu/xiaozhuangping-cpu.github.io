import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './supabase-config.js';

let WORKS = [];
const CAT_NAME = { video: '视频', admin: '管理系统', app: 'App', ext: '网页插件', web: '网页' };

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Cloud data is treated as untrusted: encode text and restrict media/link URLs.
const grid = $('#workGrid');
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) return '';
  try { const url = new URL(String(value), location.href); return ['https:', 'http:'].includes(url.protocol) ? escapeHtml(url.href) : ''; }
  catch { return ''; }
};
const thumbHtml = (w) => w.img && safeUrl(w.img)
  ? `<div class="thumb has-img"><img src="${safeUrl(w.img)}" alt="${escapeHtml(w.title)} 截图" loading="lazy" /><span class="badge${w.live ? ' live' : ''}">${w.live ? '● ' : ''}${escapeHtml(w.time)}</span></div>`
  : `<div class="thumb" style="--h:${Number.isFinite(Number(w.hue)) ? Math.max(0, Math.min(360, Number(w.hue))) : 170}">${escapeHtml(w.icon)}<span class="badge">${escapeHtml(w.time)}</span></div>`;
const linksHtml = (w) => (Array.isArray(w.links) ? w.links : []).filter(l => l && safeUrl(l.href)).map(l =>
  `<a class="btn ${l.primary ? 'btn-primary' : 'btn-ghost'} btn-sm" href="${safeUrl(l.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`).join('');
function renderWorks() {
  if (!WORKS.length) { grid.textContent = '暂无已发布作品。'; applyFilter('all'); return; }
  grid.innerHTML = WORKS.map((w, i) => `
  <article class="work-card reveal in" data-cat="${escapeHtml(w.cat)}" data-i="${i}" tabindex="0" role="button" aria-label="${escapeHtml(w.title)}">
    ${thumbHtml(w)}
    <div class="work-body">
      <p class="eyebrow">${escapeHtml(CAT_NAME[w.cat] || '其他')} · <span class="ai-tag">AI 辅助生成</span></p>
      <h3>${escapeHtml(w.title)}</h3>
      <p class="credit">for <em>${escapeHtml(w.for)}</em></p>
      <details class="work-details"><summary><span class="when-closed">展开作品描述</span><span class="when-open">收起作品描述</span></summary><p>${escapeHtml(w.desc)}</p></details>
      <ul class="tags">${(Array.isArray(w.tags) ? w.tags : []).map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
      ${w.links ? `<div class="card-links">${linksHtml(w)}</div>` : ''}
    </div>
  </article>`).join('');
  applyFilter($('.chip.active')?.dataset.filter || 'all');
}
async function loadWorks() {
  grid.textContent = '正在加载作品…'; $('#workCount').textContent = '—';
  try {
    const rows = [];
    const pageSize = 500;
    for (let offset = 0; ; offset += pageSize) {
      const params = new URLSearchParams({select:'id,sort_order,data', published:'eq.true', order:'sort_order.asc,id.asc', limit:String(pageSize), offset:String(offset)});
      const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_works?${params}`, {headers:{apikey: SUPABASE_PUBLISHABLE_KEY, Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`}});
      if (!response.ok) throw new Error('fetch failed');
      const page = await response.json();
      if (!Array.isArray(page)) throw new Error('invalid response');
      rows.push(...page);
      if (page.length < pageSize) break;
    }
    WORKS = rows.map(row => row.data).filter(w => w && typeof w === 'object');
    WORKS.sort((a, b) => (b.live ? 1 : 0) - (a.live ? 1 : 0));
    renderWorks();
  } catch {
    WORKS = []; $('#workCount').textContent = '—';
    grid.innerHTML = '<p role="alert">作品加载失败，请刷新页面重试。</p>';
  }
}

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
// Skill links open the corresponding portfolio category.
$$('[data-skill-filter]').forEach(link => link.addEventListener('click', () => {
  const filter = link.dataset.skillFilter;
  $$('.chip').find(chip => chip.dataset.filter === filter)?.click();
}));

// Modal
const modal = $('#modal');
function openModal(i) {
  const w = WORKS[i];
  const gallery = Array.isArray(w.gallery) ? w.gallery.filter(src => safeUrl(src)) : [];
  $('#modalMedia').innerHTML = gallery.length
    ? `<div class="gallery">${gallery.map(src => /\.mp4(?:[?#]|$)/i.test(src)
        ? `<video src="${safeUrl(src)}" muted loop autoplay playsinline controls preload="metadata"></video>`
        : `<img src="${safeUrl(src)}" alt="${escapeHtml(w.title)} 截图" loading="lazy" />`).join('')}</div>`
    : thumbHtml(w);
  $('#modalCat').textContent = `${CAT_NAME[w.cat]} · for ${w.for} · AI 辅助生成`;
  $('#modalTitle').textContent = w.title;
  $('#modalDesc').textContent = w.desc;
  $('#modalTags').innerHTML = (Array.isArray(w.tags) ? w.tags : []).map(t => `<li>${escapeHtml(t)}</li>`).join('');
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
$$('#navLinks a').forEach(a => a.addEventListener('click', () => { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));

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
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = target + suffix; return; }
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

loadWorks();

// Keep the scroll indicator passive and skip it when motion is reduced.
const progress = $('#scrollProgress');
if (progress && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let scheduled = false;
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0})`;
    scheduled = false;
  };
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}
