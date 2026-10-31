import { STORAGE_KEY, validateProgress, summarize, matchTopic, nextTopic } from './core.mjs';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const link = (url, title, cls = '') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)} ${icon('out')}</a>`;
const statusNames = { todo: 'Not started', active: 'In progress', done: 'Completed' };
const headings = {
  roadmap: ['THE PATH, ONE OUTCOME AT A TIME', 'Your engineering roadmap'],
  weeks: ['SMALL WEEKS. COMPOUNDING PROGRESS.', 'Your 24-week field plan'],
  projects: ['BUILD EVIDENCE, NOT JUST KNOWLEDGE', 'Three builds. One delivery story.'],
  resources: ['GO TO THE SOURCE', 'A focused resource library'],
  about: ['YOUR FOUNDATION IS THE STARTING LINE', 'A path built around you']
};
let data, topics, phaseFor, resources, progress = { version: 1, topics: {} };
let phaseFilter = 'all', currentView = 'roadmap', resourceFilter = 'all', openedTopic = null, toastTimer, noteTimer;

function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4000);
}

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  catch { toast('Browser storage is unavailable. Export your progress before leaving.'); }
}

function updateProgress() {
  const stats = summarize(topics, progress);
  $('#progress-pct').textContent = `${stats.percent}%`;
  $('#overall-progress').value = stats.done;
  $('#progress-caption').textContent = `${stats.done} of ${stats.total} topics complete`;
  const next = nextTopic(topics, progress);
  $('#continue').innerHTML = `${stats.done === 0 && !stats.active ? 'Start your journey' : next ? 'Continue your journey' : 'Explore your portfolio'} ${icon('arrow')}`;
  document.querySelectorAll('[data-mobile-progress]').forEach(el => el.textContent = `${stats.done}/${stats.total} topics complete · ${stats.percent}%`);
  renderPhaseNav();
}

function renderPhaseNav() {
  $('#phase-nav').innerHTML = data.phases.map(p => {
    const stats = summarize(p.topics, progress);
    return `<button class="stage-link ${phaseFilter === p.id ? 'selected' : ''}" data-phase="${p.id}" aria-pressed="${phaseFilter === p.id}" title="${stats.done} of 6 topics complete"><span class="stage-number">${p.number}</span>${esc(p.short)}<span class="stage-state" aria-hidden="true"></span></button>`;
  }).join('');
}

function renderMap() {
  const query = $('#topic-search').value;
  const status = $('#status-filter').value;
  let visible = 0;
  $('#roadmap-canvas').innerHTML = data.phases.filter(p => phaseFilter === 'all' || phaseFilter === p.id).map(p => {
    const matches = p.topics.filter(t => matchTopic(t, p, query, status, progress));
    if (!matches.length) return '';
    visible += matches.length;
    return `<section class="roadmap-phase" aria-labelledby="stage-${p.id}"><div class="phase-heading" data-accent="${p.accent}"><span class="phase-caption">STAGE ${p.number} / THE LEARNING PATH</span><h3 id="stage-${p.id}"><span>${p.number}</span> ${esc(p.title)}</h3><span class="phase-weeks">WEEKS ${p.weeks} · 36 HOURS</span></div><div class="topic-grid">${matches.map(t => {
      const state = progress.topics[t.id]?.status || 'todo';
      const number = String(p.topics.indexOf(t) + 1).padStart(2, '0');
      return `<button class="topic-card ${t.familiar ? 'familiar' : ''}" data-topic="${t.id}" data-status="${state}" aria-label="${esc(t.title)} — ${statusNames[state]}"><span class="topic-marker">${state === 'done' ? icon('check') : state === 'active' ? '◐' : number}</span><span class="topic-text"><span class="topic-title">${esc(t.title)}</span><span class="topic-label">${esc(state === 'todo' ? t.label : statusNames[state])} <span aria-hidden="true">·</span> ${t.hours}h</span></span><svg class="card-arrow" aria-hidden="true"><use href="#i-arrow"/></svg></button>`;
    }).join('')}</div><div class="phase-gate">${icon('check')}<span><strong>EXIT OUTCOME</strong> &nbsp; ${esc(p.outcome)}</span></div></section>`;
  }).join('');
  $('#visible-count').textContent = `${visible} skill${visible === 1 ? '' : 's'} to explore`;
  $('#empty-results').hidden = visible !== 0;
  $('#roadmap-canvas').hidden = visible === 0;
  $('.map-intro').hidden = visible === 0;
  $('.map-finish').hidden = visible === 0;
  $('#all-stages').innerHTML = `${phaseFilter === 'all' ? 'All stages' : 'Stage ' + data.phases.find(p => p.id === phaseFilter).number} <span>↓</span>`;
  $('#all-stages').title = 'Show all learning stages';
  renderPhaseNav();
}

function mobileProgress() { return ''; }

function renderWeeks() {
  let week = 0;
  $('#weeks-view').innerHTML = `<div class="view-intro"><span class="mono">216 GUIDED HOURS · ADJUST THE PACE TO YOUR LIFE</span><p><strong>~9 hours each week:</strong> 2 hours learning, 5 building, 1 validating, and 1 explaining the work. Projects grow through the plan; they are not extra assignments.</p><p>Already know a topic? Demonstrate its exit check and invest that time in a gap. At 5 hours a week, allow roughly 43 weeks. This is a planning estimate, not a deadline.</p></div>${data.phases.map(p => `<section class="week-phase"><h3><span>${p.number}</span> ${esc(p.title)}</h3><div class="week-grid">${p.weekly.map(w => `<article class="week-card"><div class="week-number">WEEK ${String(++week).padStart(2, '0')}<span>~9 HOURS</span></div><h4>${esc(w.focus)}</h4><ul>${w.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ul><div class="week-output"><strong>LEAVE THE WEEK WITH</strong>${esc(w.deliverable)}</div></article>`).join('')}</div></section>`).join('')}${mobileProgress()}`;
}

function architecture(name) {
  const head = `<svg viewBox="0 0 380 340" role="img" xmlns="http://www.w3.org/2000/svg"`;
  if (name === 'console') return `${head} aria-labelledby="console-diagram-title"><title id="console-diagram-title">Operations user to React console to permission-checked FastAPI; the API queries synthetic metrics and the issue database.</title><rect x="110" y="15" width="160" height="43" rx="5"/><text x="190" y="41">Operations user</text><path d="M190 58v27m-4-5 4 5 4-5"/><rect x="90" y="85" width="200" height="48" rx="5"/><text x="190" y="105">React + TypeScript</text><text class="sub" x="190" y="121">Filters · freshness · issue detail</text><path d="M190 133v28m-4-5 4 5 4-5"/><rect x="90" y="161" width="200" height="51" rx="5"/><text x="190" y="182">FastAPI service</text><text class="sub" x="190" y="199">Authorization · validation · contracts</text><path d="M190 212v24H91v26m-4-5 4 5 4-5M190 236h99v26m-4-5 4 5 4-5"/><rect x="15" y="263" width="153" height="53" rx="5"/><text x="91" y="286">Gold metrics</text><text class="sub" x="91" y="303">Synthetic · read only</text><rect x="212" y="263" width="153" height="53" rx="5"/><text x="289" y="286">Issue database</text><text class="sub" x="289" y="303">Transactions · audit events</text></svg>`;
  if (name === 'copilot') return `${head} aria-labelledby="copilot-diagram-title"><title id="copilot-diagram-title">Operator requests flow through API permissions to the copilot workflow. It uses scoped runbook retrieval, a model, and read-only status tools. Any simulated retry requires human approval.</title><rect x="95" y="10" width="190" height="45" rx="5"/><text x="190" y="37">Operator + permission check</text><path d="M190 55v26m-4-5 4 5 4-5"/><rect x="95" y="81" width="190" height="48" rx="5"/><text x="190" y="101">Copilot workflow</text><text class="sub" x="190" y="118">n8n · correlation ID · bounded calls</text><path d="M190 129v22H65v25m-4-5 4 5 4-5M190 151v25m-4-5 4 5 4-5M190 151h125v25m-4-5 4 5 4-5"/><rect x="8" y="177" width="114" height="55" rx="5"/><text x="65" y="200">Qdrant</text><text class="sub" x="65" y="217">Scoped runbooks</text><rect x="133" y="177" width="114" height="55" rx="5"/><text x="190" y="200">LLM adapter</text><text class="sub" x="190" y="217">Cited responses</text><rect x="258" y="177" width="114" height="55" rx="5"/><text x="315" y="200">Status tools</text><text class="sub" x="315" y="217">Read only · MCP</text><path d="M190 232v28m-4-5 4 5 4-5"/><rect x="72" y="261" width="236" height="57" rx="5"/><text x="190" y="284">Human review + mock action</text><text class="sub" x="190" y="302">Explicit approval · idempotency key</text></svg>`;
  return `${head} aria-labelledby="pilot-diagram-title"><title id="pilot-diagram-title">Synthetic commerce fixtures feed PostgreSQL. FastAPI and n8n create a permission-checked exception workflow for the operations UI; audit events feed the pilot scorecard.</title><rect x="84" y="10" width="212" height="46" rx="5"/><text x="190" y="30">Synthetic commerce fixtures</text><text class="sub" x="190" y="46">Orders · inventory · documented assumptions</text><path d="M190 56v24m-4-5 4 5 4-5"/><rect x="100" y="81" width="180" height="44" rx="5"/><text x="190" y="108">PostgreSQL + data contracts</text><path d="M190 125v25m-4-5 4 5 4-5"/><rect x="83" y="151" width="214" height="48" rx="5"/><text x="190" y="171">FastAPI + n8n workflow</text><text class="sub" x="190" y="188">Permissions · replay-safe actions</text><path d="M190 199v23H94v24m-4-5 4 5 4-5M190 222h96v24m-4-5 4 5 4-5"/><rect x="15" y="247" width="158" height="56" rx="5"/><text x="94" y="271">Operations UI</text><text class="sub" x="94" y="288">Review · resolve · audit trail</text><rect x="207" y="247" width="158" height="56" rx="5"/><text x="286" y="271">Pilot scorecard</text><text class="sub" x="286" y="288">Outcomes · cost · adoption</text></svg>`;
}

function renderProjects() {
  $('#projects-view').innerHTML = `<div class="view-intro"><span class="mono">BUILD ON THE WORK YOU ALREADY HAVE</span><p>These are <strong>planned learning projects</strong>, not claims of shipped customer work. Each build adds a layer: application delivery, dependable AI integration, then a complete customer pilot. Reuse components to keep the scope realistic.</p></div>${data.projects.map(p => `<article class="project-card"><div class="project-header"><div><span class="mono">PORTFOLIO BUILD ${p.number} · WEEKS ${p.weeks}</span><h3>${esc(p.title)}</h3><p>${esc(p.subtitle)}</p></div><span class="project-index" aria-hidden="true">${p.number}</span></div><div class="project-body"><div class="project-copy"><div class="tag-list">${p.stack.map(s => `<span>${esc(s)}</span>`).join('')}</div><div class="small-heading">THE USER'S PROBLEM</div><p>${esc(p.problem)}</p><div class="small-heading">YOUR STARTING POINT</div><p>${esc(p.reuse)}</p><div class="small-heading">WHAT YOU WILL SHIP</div><ul>${p.deliverables.map(d => `<li>${esc(d)}</li>`).join('')}</ul>${p.repo ? link(p.repo, 'Open the existing repository', 'secondary-button') : '<span class="mono">NEW CAPSTONE · BUILD IN STAGES 05–06</span>'}</div><div class="project-architecture"><figure>${architecture(p.diagram)}<figcaption>Suggested architecture for this learning build. Validate the boundaries and implementation through the project's acceptance tests.</figcaption></figure></div></div><div class="project-footer"><strong>SUCCESS EVIDENCE</strong> &nbsp; ${esc(p.success)}</div></article>`).join('')}${mobileProgress()}`;
}

function renderResources() {
  const filters = ['all', 'Documentation', 'Engineering guide', 'Role reference'];
  const shown = data.resources.filter(r => resourceFilter === 'all' || r.type === resourceFilter);
  $('#resources-view').innerHTML = `<div class="view-intro"><span class="mono">PRIMARY SOURCES FIRST · REVIEWED 31 OCT 2026</span><p>Start with the resource linked to your current skill. Prefer building over collecting courses. Documentation changes; check current stable versions before implementing. Role pages illustrate expectations and may close.</p></div><div class="resource-controls" role="group" aria-label="Filter learning resources">${filters.map(f => `<button data-resource-filter="${f}" class="${f === resourceFilter ? 'selected' : ''}" aria-pressed="${f === resourceFilter}">${f === 'all' ? 'All resources' : f}</button>`).join('')}</div><div class="resource-grid">${shown.map(r => `<article class="resource-card"><div class="mono">${esc(r.publisher)} · ${esc(r.type)}</div><h3>${esc(r.title)}</h3><p>${esc(r.note)}</p>${link(r.url, 'Open resource')}</article>`).join('')}</div>`;
}

function renderAbout() {
  $('#about-view').innerHTML = `<div class="view-intro"><span class="mono">DATA & ANALYTICS → INTEGRATION & CUSTOMER DELIVERY</span><p>Forward Deployed Engineers work across customer discovery, software, integrations, and operational outcomes. Your strongest entry direction is <strong>data and AI workflow delivery</strong>. The plan adds application engineering and customer ownership around your existing foundation.</p></div><div class="about-layout">${data.startingPoints.map((p, i) => `<article class="about-card"><span class="mono">STARTING ADVANTAGE ${i + 1}</span><h3>${esc(p.title)}</h3><p class="skills">${esc(p.skills)}</p><p>${esc(p.use)}</p></article>`).join('')}${data.principles.map((p,i) => `<article class="about-card"><span class="mono">WORKING PRINCIPLE ${i + 1}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join('')}</div><div class="role-note"><h3>A realistic role strategy</h3><p>FDE titles vary widely. The <a href="${esc(resources['role-anthropic'].url)}" target="_blank" rel="noopener noreferrer">Anthropic</a> and <a href="${esc(resources['role-palantir'].url)}" target="_blank" rel="noopener noreferrer">Palantir</a> role references emphasize customer-facing engineering and delivery. They are examples of role expectations, not job recommendations. Embedded work can require travel or an office presence.</p><p>For your remote-first search from Egypt, also screen Solutions Engineer, Implementation Engineer, Technical Consultant, and AI Integration Engineer opportunities. Verify country eligibility, travel, coding expectations, and seniority for each role. Completing this roadmap is portfolio preparation, not a guarantee of employment.</p><p><strong>Defer until a project needs it:</strong> model training, deep ML mathematics, Kubernetes administration, multi-agent systems, multiple clouds, and vendor certifications. You can explore a platform-specific FDE track after the core delivery skills are demonstrated.</p></div><div class="role-note"><h3>How this roadmap was personalized</h3><p>The starting point uses your stated SQL, Python, Power BI, Power Query, DAX, n8n, Docker, networking, and operating-systems learning, plus the public README contents of your <a href="https://github.com/Sohila-Khaled-Abbas/pixelfed-analytics-engineering" target="_blank" rel="noopener noreferrer">PixelFed</a> and <a href="https://github.com/Sohila-Khaled-Abbas/n8n-production-queue-setup" target="_blank" rel="noopener noreferrer">n8n stack</a> repositories. These establish context and project opportunities, not independently verified mastery or production employment.</p><p>The 24-week schedule, exercises, architecture proposals, and learning thresholds are recommendations designed for you. Every topic starts as not started. Progress and notes stay in this browser; export them to move between devices. This static site has no sign-in, analytics, paid service, or backend.</p></div>${mobileProgress()}`;
}

function setView(view, shouldScroll = true, setHash = true) {
  if (!headings[view]) view = 'roadmap';
  currentView = view;
  for (const key of Object.keys(headings)) $(`#${key}-view`).hidden = key !== view;
  $('#view-kicker').textContent = headings[view][0];
  $('#view-title').textContent = headings[view][1];
  document.querySelectorAll('[data-view]').forEach(el => {
    const selected = el.dataset.view === view;
    el.classList.toggle('selected', selected);
    if (el.classList.contains('nav-link')) {
      el.classList.toggle('current', selected);
      if (selected) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    }
  });
  if (setHash) history.replaceState(null, '', `#${view}`);
  if (shouldScroll) $('.learning-workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openTopic(id, setHash = true) {
  const topic = topics.find(t => t.id === id);
  if (!topic) return;
  clearTimeout(noteTimer);
  if (openedTopic) persist();
  openedTopic = id;
  const phase = phaseFor[id];
  const entry = progress.topics[id] || { status: 'todo', notes: '' };
  const index = topics.indexOf(topic);
  const missing = topic.requires.filter(key => progress.topics[key]?.status !== 'done');
  $('#topic-phase').textContent = `STAGE ${phase.number} / ${phase.title}`;
  $('#topic-content').innerHTML = `<div class="topic-eyebrow">${topic.familiar ? '<span class="familiar-badge">EXISTING FOUNDATION</span>' : '<span>NEW DEPTH</span>'}<span>~${topic.hours} GUIDED HOURS</span></div><h2 id="topic-title">${esc(topic.title)}</h2><p class="topic-summary">${esc(topic.summary)}</p><div class="status-control"><label for="topic-status">Your progress</label><select id="topic-status">${Object.entries(statusNames).map(([key, label]) => `<option value="${key}" ${key === entry.status ? 'selected' : ''}>${label}</option>`).join('')}</select></div><section class="topic-section"><h3>WHY THIS MATTERS FOR YOU</h3><p>${esc(topic.bridge)}</p></section><section class="topic-section"><h3>LEARN & PRACTICE</h3><ul>${topic.learn.map(l => `<li>${esc(l)}</li>`).join('')}</ul></section><section class="topic-section"><h3>BUILD THIS EVIDENCE</h3><p>${esc(topic.artifact)}</p></section><section class="topic-section gate-box"><h3>YOU CAN MOVE ON WHEN…</h3><p>${esc(topic.gate)}</p></section><section class="topic-section"><h3>PREREQUISITES</h3>${topic.requires.length ? `<div class="prereq-links">${topic.requires.map(key => `<button data-topic="${key}">${progress.topics[key]?.status === 'done' ? '✓ ' : ''}${esc(topics.find(t => t.id === key).title)}</button>`).join('')}</div><p class="prereq-note">${missing.length ? `${missing.length} prerequisite${missing.length === 1 ? '' : 's'} not yet marked complete. Demonstrate the exit checks before building on them.` : 'Prerequisite topics are marked complete.'}</p>` : '<p>This is your starting point. No prerequisite topics.</p>'}</section><section class="topic-section"><h3>GO TO THE SOURCE</h3><div class="topic-resources">${topic.resources.map(key => { const r = resources[key]; return `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(r.title)}<small>${esc(r.publisher)} · ${esc(r.type)}</small></span>${icon('out')}</a>`; }).join('')}</div></section><section class="topic-section"><h3><label for="topic-notes">YOUR FIELD NOTES</label></h3><textarea id="topic-notes" maxlength="5000" placeholder="What did you build? Link the evidence. What still needs work?">${esc(entry.notes)}</textarea><p class="notes-hint">Saved locally on this device. Export your progress to back it up. Keep credentials and sensitive customer information out of notes.</p></section><div class="drawer-navigation"><button class="secondary-button" data-topic="${index > 0 ? topics[index-1].id : topic.id}" ${index === 0 ? 'disabled' : ''}>← Previous skill</button><button class="primary-button" data-topic="${index < topics.length-1 ? topics[index+1].id : topic.id}" ${index === topics.length-1 ? 'disabled' : ''}>Next skill ${icon('arrow')}</button></div>`;
  if (!$('#topic-dialog').open) $('#topic-dialog').showModal();
  $('#topic-dialog').scrollTop = 0;
  if (setHash) history.replaceState(null, '', `#skill/${id}`);
}

function closeTopic() {
  clearTimeout(noteTimer);
  if (openedTopic) persist();
  openedTopic = null;
  history.replaceState(null, '', `#${currentView}`);
}

function clearFilters() {
  phaseFilter = 'all';
  $('#topic-search').value = '';
  $('#status-filter').value = 'all';
  renderMap();
}

function exportProgress() {
  const blob = new Blob([JSON.stringify({ ...progress, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'sohila-fde-progress.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Progress export created. Keep it as your backup.');
}

function bindEvents() {
  document.addEventListener('click', e => {
    const view = e.target.closest('[data-view]');
    if (view) { setView(view.dataset.view); return; }
    const phase = e.target.closest('[data-phase]');
    if (phase) { phaseFilter = phase.dataset.phase; setView('roadmap'); renderMap(); return; }
    const topic = e.target.closest('[data-topic]');
    if (topic && !topic.disabled) { openTopic(topic.dataset.topic); return; }
    const resource = e.target.closest('[data-resource-filter]');
    if (resource) { resourceFilter = resource.dataset.resourceFilter; renderResources(); return; }
    if (e.target.closest('[data-export]')) exportProgress();
    if (e.target.closest('[data-import]')) $('#progress-file').click();
  });
  $('#continue').addEventListener('click', () => {
    const next = nextTopic(topics, progress);
    if (next) openTopic(next.id); else setView('projects');
  });
  $('#topic-search').addEventListener('input', renderMap);
  $('#status-filter').addEventListener('change', renderMap);
  $('#all-stages').addEventListener('click', () => { phaseFilter = 'all'; renderMap(); });
  $('#clear-filters').addEventListener('click', clearFilters);
  $('#close-topic').addEventListener('click', () => $('#topic-dialog').close());
  $('#topic-dialog').addEventListener('close', closeTopic);
  $('#topic-dialog').addEventListener('click', e => {
    if (e.target !== $('#topic-dialog')) return;
    const rect = e.target.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right) e.target.close();
  });
  $('#topic-dialog').addEventListener('change', e => {
    if (e.target.id !== 'topic-status') return;
    const previous = progress.topics[openedTopic] || { notes: '' };
    progress.topics[openedTopic] = { ...previous, status: e.target.value };
    persist(); updateProgress(); renderMap();
    toast(`Skill ${statusNames[e.target.value].toLowerCase()}. Progress saved on this device.`);
  });
  $('#topic-dialog').addEventListener('input', e => {
    if (e.target.id !== 'topic-notes') return;
    progress.topics[openedTopic] = { status: progress.topics[openedTopic]?.status || 'todo', notes: e.target.value };
    clearTimeout(noteTimer); noteTimer = setTimeout(persist, 300);
  });
  $('#export-progress').addEventListener('click', exportProgress);
  $('#import-progress').addEventListener('click', () => $('#progress-file').click());
  $('#progress-file').addEventListener('change', async e => {
    const file = e.target.files[0]; if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error('Choose a progress file smaller than 1 MB.');
      const incoming = validateProgress(JSON.parse(await file.text()), topics.map(t => t.id));
      // Merge imported topics; a sparse file never erases unrelated local notes.
      progress = { version: 1, topics: { ...progress.topics, ...incoming.topics } };
      persist(); updateProgress(); renderMap(); renderWeeks(); renderProjects(); renderAbout();
      toast('Progress imported and merged with this browser.');
    } catch (err) { toast(`Import failed: ${err.message}`); }
    e.target.value = '';
  });
  $('#theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('fieldnotes-theme', theme); } catch { /* Theme still works without storage. */ }
  });
  $('#print-plan').addEventListener('click', () => window.print());
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !$('#topic-dialog').open) {
      e.preventDefault(); setView('roadmap', false); $('#topic-search').focus();
    }
  });
  window.addEventListener('pagehide', () => { if (noteTimer) persist(); });
  window.addEventListener('hashchange', route);
}

function route() {
  const hash = location.hash.slice(1);
  if (hash.startsWith('skill/')) { setView('roadmap', false, false); openTopic(hash.slice(6), false); }
  else { if ($('#topic-dialog').open) $('#topic-dialog').close(); setView(hash || 'roadmap', false, false); }
}

async function init() {
  try {
    const response = await fetch('./data/roadmap.json');
    if (!response.ok) throw new Error('The roadmap data could not be loaded.');
    data = await response.json();
    topics = data.phases.flatMap(p => p.topics);
    phaseFor = Object.fromEntries(data.phases.flatMap(p => p.topics.map(t => [t.id, p])));
    resources = Object.fromEntries(data.resources.map(r => [r.id, r]));
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) progress = validateProgress(JSON.parse(saved), topics.map(t => t.id));
      const theme = localStorage.getItem('fieldnotes-theme');
      if (theme === 'dark') document.documentElement.dataset.theme = 'dark';
    } catch { toast('Saved progress could not be read. Import a backup if you have one.'); }
    renderMap(); renderWeeks(); renderProjects(); renderResources(); renderAbout(); updateProgress(); bindEvents(); route();
  } catch (error) {
    $('#roadmap-canvas').innerHTML = `<div class="empty-state"><h3>The roadmap could not load</h3><p>${esc(error.message)}</p><p>Refresh the page or read the Markdown roadmap in the GitHub repository.</p></div>`;
    $('#continue').disabled = true;
  }
}

init();
