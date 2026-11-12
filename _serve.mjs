import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = process.cwd();
const PORT = Number(process.argv[2] || 8080);
const ENTRY = '/命理排盘.html';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const u = url.parse(req.url || '/');
  let p = decodeURIComponent(u.pathname || '/');
  if (p === '/' || p === '/index.html') p = ENTRY;
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      // 单页兜底：任何未知路径都回首页，避免手机上手打错
      const home = path.join(ROOT, decodeURIComponent(ENTRY));
      fs.readFile(home, (e2, buf) => {
        if (e2) { res.writeHead(404).end('not found'); return; }
        res.writeHead(200, { 'content-type': TYPES['.html'], 'cache-control': 'no-cache' });
        res.end(buf);
      });
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'content-type': TYPES[ext] || 'application/octet-stream',
      'content-length': st.size,
      'cache-control': 'no-cache',
    });
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('listening http://0.0.0.0:' + PORT + ' root=' + ROOT);
});
