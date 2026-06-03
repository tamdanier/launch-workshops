/* Launch by NTT DATA — Workshop Interaction Engine v1
   Handles: three-state decision buttons, expand/collapse, tallies,
   warning banner, reset, clipboard, export wiring.
   Usage: LaunchWorkshop.init({ buildMarkdown, buildJSON })
   Both builders receive (state, ORDER) — state is a map of
   id → { decision: string|null, note: string }. */

(function (global) {
  const STATES = [
    { key: 'approved',  label: 'Approve recommendation', short: 'Approved' },
    { key: 'different', label: 'Decide differently',      short: 'Decided differently' },
    { key: 'parked',    label: 'Park / async',            short: 'Parked' }
  ];

  function needsNote(s) {
    return (s.decision === 'different' || s.decision === 'parked') && !s.note.trim();
  }

  function renderCard(card, id, state) {
    const s = state[id];
    card.classList.remove('s-approved', 's-different', 's-parked', 'needs-note');
    if (s.decision) card.classList.add('s-' + s.decision);
    if (needsNote(s)) card.classList.add('needs-note');
    card.querySelectorAll('.oq-btn').forEach(b => {
      b.classList.remove('active-approved', 'active-different', 'active-parked');
      if (b.dataset.state === s.decision) b.classList.add('active-' + s.decision);
    });
    const badge = card.querySelector('.oq-status-badge');
    const st = STATES.find(x => x.key === s.decision);
    badge.textContent = st ? st.short : '';
  }

  function renderSummary(state) {
    const counts = { approved: 0, different: 0, parked: 0 };
    Object.values(state).forEach(s => { if (s.decision) counts[s.decision]++; });
    document.getElementById('ct-approved').textContent  = counts.approved;
    document.getElementById('ct-different').textContent = counts.different;
    document.getElementById('ct-parked').textContent    = counts.parked;
  }

  function renderWarnBanner(state) {
    const missing = Object.values(state).filter(needsNote).length;
    const banner  = document.getElementById('warn-banner');
    const countEl = document.getElementById('warn-count');
    const textEl  = document.getElementById('warn-text');
    if (missing > 0) {
      banner.classList.add('visible');
      countEl.textContent = missing;
      textEl.textContent  = missing === 1
        ? 'decision needs a note captured.'
        : 'decisions need notes captured.';
    } else {
      banner.classList.remove('visible');
    }
  }

  function init(opts) {
    const cards = document.querySelectorAll('.oq');
    const state = {};
    const ORDER = Array.from(cards).map(c => c.dataset.id);

    cards.forEach(card => {
      const id = card.dataset.id;
      state[id] = { decision: null, note: '' };

      card.querySelector('.oq-row').addEventListener('click', e => {
        if (e.target.closest('.oq-btn, .oq-note')) return;
        card.classList.toggle('expanded');
      });

      const actions = card.querySelector('.oq-actions');
      STATES.forEach(s => {
        const btn = document.createElement('button');
        btn.className    = 'oq-btn';
        btn.textContent  = s.label;
        btn.dataset.state = s.key;
        btn.addEventListener('click', e => {
          e.stopPropagation();
          state[id].decision = state[id].decision === s.key ? null : s.key;
          renderCard(card, id, state);
          renderSummary(state);
          renderWarnBanner(state);
        });
        actions.appendChild(btn);
      });

      card.querySelector('.oq-note').addEventListener('input', e => {
        state[id].note = e.target.value;
        renderCard(card, id, state);
        renderWarnBanner(state);
      });
    });

    const exportOut = document.getElementById('export-output');
    let currentExport = '';

    document.getElementById('btn-export-md').addEventListener('click', () => {
      currentExport = opts.buildMarkdown(state, ORDER);
      exportOut.textContent = currentExport;
      exportOut.classList.add('visible');
    });

    document.getElementById('btn-export-json').addEventListener('click', () => {
      currentExport = opts.buildJSON(state, ORDER);
      exportOut.textContent = currentExport;
      exportOut.classList.add('visible');
    });

    document.getElementById('btn-copy').addEventListener('click', () => {
      if (!currentExport) {
        currentExport = opts.buildMarkdown(state, ORDER);
        exportOut.textContent = currentExport;
        exportOut.classList.add('visible');
      }
      navigator.clipboard.writeText(currentExport).then(() => {
        const btn = document.getElementById('btn-copy');
        const orig = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = orig; }, 1200);
      });
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (!confirm('Reset all decisions and notes?')) return;
      cards.forEach(card => {
        const id = card.dataset.id;
        state[id] = { decision: null, note: '' };
        card.querySelector('.oq-note').value = '';
        renderCard(card, id, state);
      });
      renderSummary(state);
      renderWarnBanner(state);
      exportOut.classList.remove('visible');
      currentExport = '';
    });
  }

  global.LaunchWorkshop = { init };
})(window);
