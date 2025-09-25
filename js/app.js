// Basic site interactivity — theme toggle, table render & filters
(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (persist in localStorage)
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const THEME_KEY = 'pr3tack-theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute('data-theme', saved);
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // Populate matrix table
  const tableBody = document.querySelector('#matrixTable tbody');
  const tacticFilter = document.getElementById('filterTactic');
  const feFilter = document.getElementById('filterFeasibility');
  const searchBox = document.getElementById('searchBox');
  let rows = [];
  let data = [];

  function renderRows(items) {
    tableBody.innerHTML = '';
    items.forEach((item, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.tactic}</td>
        <td>${item.technique}</td>
        <td>${item.feasibility}</td>
        <td>${item.defense}</td>
      `;
      tr.addEventListener('click', () => {
        alert([
          `Technique: ${item.technique}`,
          `Tactic: ${item.tactic}`,
          `Feasibility: ${item.feasibility}`,
          `Defense: ${item.defense}`,
          `Rationale: ${item.rationale || '—'}`,
          `Status: ${item.status || '—'}`,
          `Last Updated: ${item.last_updated || '—'}`
        ].join('\n'));
      });
      tableBody.appendChild(tr);
    });
  }

  function applyFilters() {
    const t = tacticFilter.value.toLowerCase();
    const f = feFilter.value.toLowerCase();
    const q = searchBox.value.toLowerCase().trim();
    const filtered = data.filter(it => {
      const matchesT = !t || it.tactic.toLowerCase() === t;
      const matchesF = !f || it.feasibility.toLowerCase() === f;
      const text = (it.tactic + ' ' + it.technique + ' ' + it.defense + ' ' + (it.rationale||'')).toLowerCase();
      const matchesQ = !q || text.includes(q);
      return matchesT && matchesF && matchesQ;
    });
    renderRows(filtered);
  }

  fetch('data/seed-matrix.json')
    .then(r => r.json())
    .then(json => {
      data = json.entries || [];
      // Tactic dropdown
      const tactics = Array.from(new Set(data.map(d => d.tactic))).sort();
      tactics.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        tacticFilter.appendChild(opt);
      });
      renderRows(data);
    });

  [tacticFilter, feFilter, searchBox].forEach(el => {
    el && el.addEventListener('input', applyFilters);
  });
})();
