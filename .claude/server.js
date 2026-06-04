const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const PORT       = 4321;
const PAGES_BASE = '/launch-workshops'; // strip this prefix to mirror GitHub Pages locally

const MIME = {
  '.html': 'text/html', '.css': 'text/css',
  '.js':   'text/javascript', '.mjs': 'text/javascript',
  '.md':   'text/plain', '.json': 'application/json',
  '.png':  'image/png',  '.svg':  'image/svg+xml',
  '.woff': 'font/woff',  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',   '.pdf':  'application/pdf',
};

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }

  let url = req.url.split('?')[0];

  // Strip GitHub Pages repo prefix so local dev mirrors Pages paths
  if (url.startsWith(PAGES_BASE + '/')) url = url.slice(PAGES_BASE.length);
  else if (url === PAGES_BASE) url = '/';

  if (url === '/' || url === '') url = '/index.html';

  let filePath = path.join(ROOT, url);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, CORS);
    return res.end();
  }

  // Serve directory index
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback: a deck route like /decks/<name>/5 → serve that deck's index.html
      const m = url.match(/^(\/decks\/[^/]+)\//);
      if (m && path.extname(url) === '') {
        const spa = path.join(ROOT, m[1], 'index.html');
        if (fs.existsSync(spa)) {
          res.writeHead(200, { ...CORS, 'Content-Type': 'text/html' });
          return res.end(fs.readFileSync(spa));
        }
      }
      res.writeHead(404, CORS);
      return res.end('Not found');
    }
    const ct = MIME[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { ...CORS, 'Content-Type': ct });
    res.end(data);
  });
}).listen(PORT, () => console.log('Serving on http://localhost:' + PORT));
