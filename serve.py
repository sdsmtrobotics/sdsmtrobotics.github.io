#!/usr/bin/env python3
"""Local preview server for the Rocker Robotics site.

    ./serve.py            serve on http://localhost:4000
    ./serve.py 8080       serve on a different port

Two things this does that `python3 -m http.server` does not:

1. It matches GitHub Pages routing, so what you see locally is what the live
   site will do. Pages resolves an extensionless request like /about to
   /about.html, serves /404.html with a real 404 status for anything missing,
   and never shows a directory listing.

2. It rebuilds automatically. Edit a config.toml or a template, hit refresh,
   and the change is there - no need to remember ./build.py while working.
   (You still need to run ./build.py before committing, so the generated
   pages in the repo stay current. ./build.py --check verifies that.)
"""
import functools
import http.server
import os
import socketserver
import sys
import traceback

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build  # noqa: E402  - same directory, imported for auto-rebuild

ROOT = build.ROOT
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4000

WATCH = ['_src', '_partials', 'content', 'assets']
_fingerprint = None
_error = None


def _sources_fingerprint():
    """Newest mtime across everything a build depends on."""
    newest = 0.0
    for folder in WATCH:
        base = ROOT / folder
        if not base.is_dir():
            continue
        for path in base.rglob('*'):
            if path.is_file() and path.name != 'map.html':
                newest = max(newest, path.stat().st_mtime)
    return newest


def rebuild_if_stale():
    """Rebuild when a source file changed. Never let an error kill the server."""
    global _fingerprint, _error
    try:
        current = _sources_fingerprint()
    except OSError:
        return
    if current == _fingerprint:
        return
    _fingerprint = current
    try:
        build.main()
        _error = None
    except SystemExit as exc:            # build.py reports problems this way
        _error = str(exc)
        print(f'\n  BUILD FAILED: {_error}\n', file=sys.stderr)
    except Exception:
        _error = traceback.format_exc()
        print(f'\n  BUILD FAILED:\n{_error}\n', file=sys.stderr)


class PagesHandler(http.server.SimpleHTTPRequestHandler):

    def send_head(self):
        # only worth rebuilding for a page view, not for every image
        if not os.path.splitext(self.path.split('?')[0])[1] or \
                self.path.split('?')[0].endswith('.html'):
            rebuild_if_stale()
            if _error:
                return self._build_error_page()
        return super().send_head()

    def _build_error_page(self):
        body = (
            '<!doctype html><meta charset="utf-8">'
            '<title>Build failed</title>'
            '<style>body{font:15px/1.6 system-ui,sans-serif;margin:0;padding:2.5rem;'
            'background:#2b0b0b;color:#ffd9d9}h1{font-size:1.3rem;margin:0 0 .75rem}'
            'pre{background:#1a0606;padding:1rem;border-radius:6px;overflow:auto;'
            'border-left:3px solid #e05252}p{color:#ffb4b4}</style>'
            '<h1>Build failed</h1>'
            '<p>Fix the problem below, then refresh this page.</p>'
            f'<pre>{_error}</pre>'
        ).encode('utf-8')
        self.send_response(500)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        import io
        return io.BytesIO(body)

    def translate_path(self, path):
        local = super().translate_path(path)
        if path.rstrip('/').endswith('.html'):
            return local
        # A bare name may collide with a same-named directory: this site has both
        # projects/ and projects.html. Pages serves the .html unless the directory
        # has its own index.html, so prefer the file in that case.
        if os.path.isdir(local) and not os.path.isfile(os.path.join(local, 'index.html')):
            if os.path.isfile(local + '.html'):
                return local + '.html'
        # /about -> /about.html, matching GitHub Pages' extension fallback
        if not os.path.exists(local) and os.path.isfile(local + '.html'):
            return local + '.html'
        return local

    def list_directory(self, path):
        # Pages has no directory listings - a directory without index.html is a 404
        self.send_error(404)
        return None

    def send_error(self, code, message=None, explain=None):
        page = os.path.join(ROOT, '404.html')
        if code == 404 and os.path.isfile(page):
            body = open(page, 'rb').read()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

    def end_headers(self):
        # never cache during development
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("  %s\n" % (fmt % args))


class Server(socketserver.ThreadingTCPServer):
    # On Windows SO_REUSEADDR lets a second server silently hijack a port that
    # is already serving, which looks like "my edits stopped appearing". Only
    # enable it where it means what we want: reuse of a TIME_WAIT port.
    allow_reuse_address = os.name != 'nt'
    daemon_threads = True


if __name__ == '__main__':
    rebuild_if_stale()
    handler = functools.partial(PagesHandler, directory=str(ROOT))
    try:
        httpd = Server(('127.0.0.1', PORT), handler)
    except OSError as exc:
        sys.exit(f"could not start on port {PORT}: {exc}\n"
                 f"Something else is using it. Try: ./serve.py {PORT + 1}")
    with httpd:
        # flush: the URL must appear immediately even when output is piped
        print(f"Rocker Robotics site -> http://localhost:{PORT}", flush=True)
        print("Edits rebuild automatically on refresh. Ctrl-C to stop.", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped")
