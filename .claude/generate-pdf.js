#!/usr/bin/env node
/**
 * generate-pdf.js — Launch HTML deck → PDF export
 *
 * Usage:
 *   node .claude/generate-pdf.js                  # export all decks
 *   node .claude/generate-pdf.js xla-by-design    # export one deck by folder name
 *   node .claude/generate-pdf.js --url=http://localhost:4321
 *   node .claude/generate-pdf.js --width=1440 --height=810
 *
 * Requires: puppeteer  (npm install puppeteer  — or  npm install -g puppeteer)
 * The local dev server must be running before calling this script.
 * Default base URL: http://localhost:4321
 *
 * Output: decks/<name>/<name>.pdf  (overwrites if present)
 */

const path = require('path');
const fs   = require('fs');

// ── resolve puppeteer from project, global, or /tmp fallback ──────────
let puppeteer;
const candidates = [
  path.resolve(__dirname, '../node_modules/puppeteer'),
  '/tmp/node_modules/puppeteer',
];
for (const c of candidates) {
  try { puppeteer = require(c); break; } catch {}
}
if (!puppeteer) {
  try { puppeteer = require('puppeteer'); } catch {
    console.error([
      '✗  puppeteer not found.',
      '   Install it:  npm install puppeteer',
      '   Or globally: npm install -g puppeteer',
    ].join('\n'));
    process.exit(1);
  }
}

// ── parse args ────────────────────────────────────────────────────────
const argv    = process.argv.slice(2);
const deckArg = argv.find(a => !a.startsWith('--'));
const getOpt  = (key, def) => {
  const hit = argv.find(a => a.startsWith(`--${key}=`));
  return hit ? hit.split('=').slice(1).join('=') : def;
};

const BASE_URL = getOpt('url', 'http://localhost:4321');
const W        = parseInt(getOpt('width',  '1440'), 10);
const H        = parseInt(getOpt('height', '810'),  10);

const ROOT      = path.resolve(__dirname, '..');
const DECKS_DIR = path.join(ROOT, 'decks');

// ── export one deck ───────────────────────────────────────────────────
async function exportDeck(deckId) {
  const deckDir = path.join(DECKS_DIR, deckId);
  const htmlPath = path.join(deckDir, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    console.warn(`  ⚠  skipping ${deckId} — no index.html`);
    return;
  }

  const url     = `${BASE_URL}/decks/${deckId}/`;
  const outPath = path.join(deckDir, `${deckId}.pdf`);

  process.stdout.write(`  ⟶  ${deckId} … `);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
    await page.waitForFunction(() => document.fonts.ready);

    // Force all reveal animations visible; strip chrome UI
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      ['nav', 'prog'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      document.querySelectorAll('.print-btn').forEach(el => el.style.display = 'none');
      document.documentElement.style.scrollBehavior = 'auto';
    });

    // Screenshot-per-slide approach: bypasses Puppeteer's px→pt page-size
    // rounding (810px = 607.5pt is fractional, causing cumulative drift when
    // using the CSS print pipeline).
    const slideHandles = await page.$$('.slide');
    const jpegs = [];

    for (const handle of slideHandles) {
      const box = await handle.boundingBox();
      await page.evaluate(y => window.scrollTo(0, y), box.y);
      // Two rAF passes: scroll settles, then paint completes
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
      jpegs.push((await page.screenshot({ type: 'jpeg', quality: 92 })).toString('base64'));
    }

    // Assemble screenshots into a multi-page PDF via a minimal image-HTML doc
    const body = jpegs.map(b64 =>
      `<div><img src="data:image/jpeg;base64,${b64}"></div>`
    ).join('');

    await page.setContent(
      `<!doctype html><html><head><meta charset="utf-8"><style>` +
      `*{margin:0;padding:0;box-sizing:border-box}` +
      `@page{size:${W}px ${H}px;margin:0}` +
      `html,body{width:${W}px}` +
      `div{width:${W}px;height:${H}px;overflow:hidden;page-break-after:always;break-after:page}` +
      `img{width:${W}px;height:${H}px;display:block}` +
      `</style></head><body>${body}</body></html>`,
      { waitUntil: 'domcontentloaded' }
    );

    await page.pdf({
      path:            outPath,
      width:           `${W}px`,
      height:          `${H}px`,
      printBackground: true,
      margin:          { top: 0, bottom: 0, left: 0, right: 0 },
    });

    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`✓  ${path.relative(ROOT, outPath)}  (${kb} KB)`);
  } catch (err) {
    console.log(`✗  ${err.message}`);
  } finally {
    await browser.close();
  }
}

// ── main ──────────────────────────────────────────────────────────────
(async () => {
  // Determine which decks to export
  let decks;

  if (deckArg) {
    decks = [deckArg];
  } else {
    // All subdirectories under decks/ that contain an index.html
    decks = fs.readdirSync(DECKS_DIR).filter(d =>
      fs.statSync(path.join(DECKS_DIR, d)).isDirectory() &&
      fs.existsSync(path.join(DECKS_DIR, d, 'index.html'))
    );
  }

  if (decks.length === 0) {
    console.error('✗  No decks found to export.');
    process.exit(1);
  }

  console.log(`\nLaunch PDF export  ${W}×${H}  →  ${BASE_URL}\n`);

  for (const id of decks) {
    await exportDeck(id);
  }

  console.log('\nDone.\n');
})();
