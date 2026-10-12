(() => {
  'use strict';
  const intro = document.getElementById('intro');
  const skip = document.getElementById('skipIntro');
  const replay = document.getElementById('replayIntro');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let introTimer;
  function hideIntro() { clearTimeout(introTimer); intro.classList.add('hidden'); intro.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; try { sessionStorage.setItem('jcf-intro-seen', '1'); } catch (_) {} }
  function showIntro() { clearTimeout(introTimer); intro.classList.remove('hidden'); intro.removeAttribute('aria-hidden'); document.body.style.overflow = 'hidden'; introTimer = setTimeout(hideIntro, reduced ? 200 : 4900); }
  skip.addEventListener('click', hideIntro);
  replay.addEventListener('click', showIntro);
  let seen = false;
  try { seen = sessionStorage.getItem('jcf-intro-seen') === '1'; } catch (_) {}
  if (seen || reduced) hideIntro(); else showIntro();
  const menuButton = document.getElementById('menuButton');
  const menuPanel = document.getElementById('menuPanel');
  function closeMenu() { menuPanel.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  menuButton.addEventListener('click', () => { const open = menuPanel.hidden; menuPanel.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); document.body.style.overflow = open ? 'hidden' : ''; });
  menuPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!menuPanel.hidden) { closeMenu(); menuButton.focus(); } else if (!intro.classList.contains('hidden')) hideIntro(); } });
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const newsCards = [...document.querySelectorAll('.news-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => { filterButtons.forEach(b => b.classList.toggle('active', b === button)); const category = button.dataset.filter; newsCards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; }); }));
  const yearSelect = document.getElementById('yearSelect');
  const scheduleResult = document.getElementById('scheduleResult');
  yearSelect.addEventListener('change', () => { scheduleResult.textContent = yearSelect.value ? `${yearSelect.value} selected. Official section schedules are being prepared. Check back once verified by the department.` : 'Select a year level to get started.'; });
  const principal = document.getElementById('principal');
  const monthly = document.getElementById('monthly');
  const rate = document.getElementById('rate');
  const years = document.getElementById('years');
  const futureValue = document.getElementById('futureValue');
  const breakdown = document.getElementById('labBreakdown');
  const yearsLabel = document.getElementById('yearsLabel');
  const depositsBar = document.getElementById('depositsBar');
  const interestBar = document.getElementById('interestBar');
  const peso = n => new Intl.NumberFormat('en-PH', {style:'currency', currency:'PHP', maximumFractionDigits:0}).format(n);
  function clamp(n, min, max) { return Math.min(max, Math.max(min, Number.isFinite(n) ? n : min)); }
  function calculate() { const p = clamp(Number(principal.value), 0, 1e8), m = clamp(Number(monthly.value), 0, 1e7), r = clamp(Number(rate.value), 0, 30) / 1200, y = clamp(Number(years.value), 1, 30), n = y * 12; let total = p; for (let i=0;i<n;i++) total = total * (1+r) + m; const contributed = p + m*n; const interest = Math.max(0,total-contributed); futureValue.textContent = peso(total); breakdown.textContent = `${peso(contributed)} saved + ${peso(interest)} estimated interest`; yearsLabel.textContent = `${y} YEAR${y === 1 ? '' : 'S'}`; const ratio = total > 0 ? contributed/total*100 : 100; depositsBar.style.width = `${ratio}%`; interestBar.style.width = `${100-ratio}%`; }
  [principal,monthly,rate,years].forEach(el => el.addEventListener('input',calculate)); calculate();
  document.getElementById('copyrightYear').textContent = String(new Date().getFullYear());
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, {threshold:.08}); revealItems.forEach(el => observer.observe(el)); } else revealItems.forEach(el => el.classList.add('visible'));
})();

// V1.1 event countdown (local Philippines event time).
(() => {const el=document.getElementById('stockCountdown');if(!el)return;const target=new Date('2026-10-24T08:00:00+08:00').getTime();function update(){const ms=target-Date.now();if(ms<=0){el.textContent='EVENT DATE REACHED · OCTOBER 24, 2026';return;}const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);el.textContent=`${d} DAYS · ${h} HOURS · ${m} MINUTES TO GO`;}update();setInterval(update,60000);})();
