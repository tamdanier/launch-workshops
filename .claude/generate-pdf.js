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
    await page.setViewport({ width: W, height: H });
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
