# sdsmtrobotics.github.io

Website for the **South Dakota Mines Rocker Robotics Team**, live at
<https://sdsmtrobotics.github.io> and hosted on GitHub Pages.

---

## Running the website on your own computer

Works the same on **Windows, macOS and Linux**. The only difference is how you
type the command, noted below.

### What you need

**Python 3.11 or newer. That is the whole list.** No Node, no Ruby, no
`npm install`, nothing to download.

Check what you have — on Windows:

```bash
py --version
```

on macOS or Linux:

```bash
python3 --version
```

If that prints 3.11 or higher you are ready. Otherwise install Python from
<https://www.python.org/downloads/> (on Fedora: `sudo dnf install python3`).

> **Windows:** when installing, tick **"Add python.exe to PATH"** on the first
> screen of the installer. Without it the commands below will not be found.

### Get the code

```bash
git clone https://github.com/sdsmtrobotics/sdsmtrobotics.github.io.git
```

```bash
cd sdsmtrobotics.github.io
```

### Start it

On **Windows** (Command Prompt or PowerShell):

```bash
py serve.py
```

On **macOS or Linux**:

```bash
./serve.py
```

Then open **<http://localhost:4000>** in your browser.

Press **Ctrl+C** in the terminal to stop it.

That is it. Leave the server running while you work: when you change any text or
image, just **refresh the browser** and your change is there. You do not need to
restart it or run anything else.

### Using a different port

If port 4000 is taken, pass another number:

```bash
./serve.py 8080
```

---

## Making changes

**To change wording or swap a photo you do not need to touch any HTML.** Every
page's words and pictures are under `content/`, one folder per page, and each of
those folders has a **`README.md` telling you everything you need for that
page**. Start there.

The two commands are all you need to know:

| Command | When |
|---|---|
| `./serve.py` | While you work. Leave it running, edit a `config.toml`, refresh the browser |
| `./build.py` | Once, before you commit. It writes the pages GitHub Pages actually serves |

### Every content folder works the same way

```
content/<page>/config.toml   all the text, and which photo goes where
content/<page>/images/       the photos for that page
content/<page>/map.html      a generated guide showing what goes where
content/<page>/README.md     how to edit this page
```

**Open `map.html` in a browser first** (double-click it). It lists every photo
and every piece of text on the page, in the order they appear, and names the
exact setting to change for each one. It is generated from the real page, so it
is never out of date.

Then edit `config.toml`, refresh your browser, and the change is there. Basic
HTML works in any text — `<strong>bold</strong>`, `<em>italics</em>`, `<br>`,
`<a href="...">links</a>` — and quote marks inside a setting are escaped as
`\"`.

### Which folder is which page

| Folder | The page it makes | |
|---|---|---|
| `content/landing/` | the front page, `/` | [README](content/landing/README.md) |
| `content/about/` | `/about` | [README](content/about/README.md) |
| `content/robots/` | `/projects` — the Robots index | [README](content/robots/README.md) |
| `content/projects/` | the 12 robot write-ups under `/projects/` | [README](content/projects/README.md) |
| `content/news/` | `/news` — the story index | [README](content/news/README.md) |
| `content/posts/` | the 11 news write-ups under `/news/` | [README](content/posts/README.md) |
| `content/gallery/` | `/gallery` — the album index | [README](content/gallery/README.md) |
| `content/albums/` | the 31 album pages under `/gallery/` | [README](content/albums/README.md) |
| `content/calendar/` | `/calendar` | [README](content/calendar/README.md) |
| `content/sponsors/` | `/sponsors` | [README](content/sponsors/README.md) |
| `content/support-us/` | `/sponsors/support-us` | [README](content/support-us/README.md) |
| `content/resources/` | `/resources`, plus four pages below it | [README](content/resources/README.md) |
| `content/pumpkin/` | `/pumpkin` — the scoreboard's wording | [README](content/pumpkin/README.md) |
| `content/404/` | the not-found page | [README](content/404/README.md) |
| `content/site/` | **not a page** — the settings every page shares | [README](content/site/README.md) |

The four pages under Resources are one folder deeper, so the folders mirror the
addresses, and each has its own README:

```
content/resources/software-and-guides/   /resources/software-and-guides
content/resources/links/                 /resources/links
content/resources/super-robo-time/       /resources/super-robo-time
content/resources/robo-parts/            /resources/robo-parts
```

This is nesting for readability only — unlike `content/albums/` it is *not* a
collection, and nothing in `content/resources/config.toml` is shared with the
four below it. Those pages are mostly links to other people's websites, which
move; each one's README says what is most likely to rot and when to check.

### Three folders hold many pages, not one

`content/posts/`, `content/projects/` and `content/albums/` are **collections**:
one folder per story, robot or album, each becoming its own page. A `config.toml`
in the collection folder itself holds the wording every page in it shares — the
link back, the headings, the band at the bottom — so changing it once changes all
31 albums. Each collection's README explains its own blocks and how to add a new
item.

**The one trap worth knowing.** A story, robot or album exists in **two**
places: its card on the index page, and the page that card opens.

| The card comes from | The page it opens comes from |
|---|---|
| `content/news/config.toml` | `content/posts/<story>/config.toml` |
| `content/robots/config.toml` | `content/projects/<robot>/config.toml` |
| `content/gallery/config.toml` | `content/albums/<album>/config.toml` |

Keep the title, date and summary in step. **Nothing checks that they agree**, and
adding the page without adding a card means nothing links to it.

### The pumpkin chunkin scoreboard

`/pumpkin` is the one page whose contents are not in this repository. It reads
the team's scoring **spreadsheet** live, in the visitor's browser, so a throw
typed in at the field is on the page about a minute later with nothing to
rebuild and nothing to commit. Scores, teams and rounds are all edited in that
spreadsheet — ask a team officer for it.

Only the wording around the table is here, in `content/pumpkin/config.toml`.
Which spreadsheet is read, and whether the **Pumpkin** button appears in the
header at all, is in `content/site/config.toml`. Both have READMEs, and
`content/pumpkin/README.md` is the one to read before an event.

### Before you commit

The website is served as plain files, so the generated pages have to be saved
into the repository too. Run this once before committing:

```bash
./build.py
```

Then commit everything, including the generated `index.html`. To check whether
you forgot:

```bash
./build.py --check
```

---

## Troubleshooting

**Windows: `'.' is not recognized` or `./serve.py : The term ... is not
recognized`** — you used the macOS/Linux form. Drop the `./` and use `py`:
`py serve.py`.

**Windows: `'py' is not recognized`** — Python is not on your PATH. Re-run the
Python installer, choose *Modify*, and make sure **"Add python.exe to PATH"** is
ticked. Then open a new terminal.

**`./serve.py: Permission denied`** (macOS/Linux) — the file lost its executable
bit. Either run `chmod +x serve.py build.py`, or just use `python3 serve.py`.

**`could not start on port 4000`** — you already have a copy running in another
terminal. Close it, or start this one on a different port: `./serve.py 4001`.

**A red "Build failed" page in the browser** — there is a mistake in a
`config.toml`, and the message on the page says what and where. The most common
cause is a missing quote mark. Fix it and refresh; the server keeps running.

**My change is not showing up** — make sure you saved the file, then do a hard
refresh (Ctrl+Shift+R) to bypass the browser cache.

**I changed `build.py` and the pages came out wrong, or went back to how they
were** — `serve.py` loads `build.py` once, when it starts, and a server left
running from before your change will keep rebuilding the pages with the old
copy, overwriting what `./build.py` just wrote. Stop the server (Ctrl+C) and
start it again after any change to `build.py`. Editing a `config.toml` or a
template needs no restart.

**`ModuleNotFoundError: No module named 'tomllib'`** — your Python is older than
3.11. Check with `py --version` on Windows, `python3 --version` elsewhere.

**Do not use `python3 -m http.server`.** It will appear to work, then mislead
you: it does not resolve `/about` to `about.html`, does not serve the 404 page,
and shows directory listings the real site does not have. `serve.py` matches
GitHub Pages' behaviour so what you see locally is what goes live.

---

## How the site is put together

Pages share one header and footer, assembled by `build.py`. It is deliberately
dependency-free so anyone can contribute with just Python, and GitHub Pages
still serves plain static files with no build step on its side.

```
content/<page>/      text + images for that page          <- edit these
_src/<page>.html     the page's HTML structure
_partials/*.html     the markup every rebuilt page shares
assets/css/site.css  the design system
assets/js/site.js    nav toggle, sticky header, scroll reveal, lightbox
assets/img/          the logo and the favicon
assets/vendor/       Font Awesome, vendored so the icons work offline
<page>.html          GENERATED - do not edit, run ./build.py instead
```

Everything the browser loads that is not a page's own content is under
`assets/`, and every page refers to it by a site-absolute path (`/assets/...`)
so the same markup works at any depth — `/`, `/news`, `/gallery/2025`. A page's
own photos are the exception: those stay in `content/<page>/images/` and are
served from there.

A page source starts with a front-matter comment; every key becomes a `{{key}}`
substitution, and `page:` also lands on `<body data-page="...">` so the matching
nav link highlights itself:

```html
<!--
title: Home
page: home
content: landing
-->
```

Template syntax: `{{include:header}}` pulls in a partial, `{{hero.heading}}`
reads from that page's `config.toml`, and `{{#if x}}` / `{{#each x}}` handle
optional and repeated blocks. Inside an `{{#each}}`, `{{index}}` counts 1, 2,
3…

**The partials.** Everything every page has in common lives in `_partials/`,
so a page source is mostly the bands that are actually that page:

| Partial | What it is |
|---|---|
| `page-top.html` | Doctype, `<head>`, the header, the opening `<main>`. Every page source starts with `{{include:page-top}}` |
| `page-bottom.html` | Closing `</main>`, the footer, `</body></html>` |
| `head.html`, `header.html`, `footer.html` | Pulled in by the two above — partials can include partials |
| `page-head.html` | The banner band. Photo, plain navy band, or a back link above the heading — all three decided by the page's own `[page_head]` config, not by separate copies of the markup |
| `filter-bar.html` | The row of filter pills above a filtered grid, used by four pages |

An include can take arguments, which is what lets one partial serve pages
that each keep their own names for things:

```html
{{include:filter-bar noun="robots"
                     aria="Filter robots by competition"
                     options=robots.filter}}
```

A quoted argument is literal text; an unquoted one is a path into this page's
config. So `options` arrives as that page's own list of filters and the
partial can say `{{#each options}}` without knowing which page it is serving.
Arguments are visible only inside that partial.

One trap: because a partial may include another, includes are expanded until
none are left. A partial that shows its own include tag in an HTML comment
would include itself forever — write such an example without the braces, as
`filter-bar.html` does.

**Collections.** Where many pages share one shape, one source builds all of
them. `_src/album.html` is the only album page there is; the 31 pages under
`/gallery/` come from it:

```html
<!--
title: {{album.title}}
page: gallery
collection: albums
output: gallery/{{slug}}.html
-->
```

Every subfolder of `content/albums/` that has a `config.toml` becomes one page,
with `{{slug}}` set to the folder name and `output` saying where it lands. A
`config.toml` in the collection folder itself holds the wording every page in
it shares; each item's own config wins wherever both set a key.

`_src/post.html` and `content/posts/` are the second collection, and build the
11 news write-ups under `/news/`. `_src/robot.html` and `content/projects/` are
the third, and build the 12 robot write-ups under `/projects/`. A robot page is
a news write-up with two cards on the front of it: the same `[[robot.block]]`
run for the words, the same photo grid, the same cards at the foot, plus the
Details and Files-and-code cards that the old site kept in boxes.

**Migration status: done.** All 69 pages are now generated — `index.html`,
`about.html`, `projects.html` (the robots page) and the 12 robot write-ups under
`projects/`, `news.html` and the 11 news write-ups under `news/`,
`gallery.html` and the 31 album pages under `gallery/`, `calendar.html`,
`sponsors.html`, `sponsors/support-us.html`, `resources.html` and the four pages
under `resources/`, plus `pumpkin.html` and `404.html`. No page is still the old
Grav-derived markup.

The three easter-egg pages are the only files in the site that are **not**
generated; they are edited directly. To add a brand new page, add a
`_src/<name>.html` and a `content/<name>/` folder, and give that folder a
`README.md` the way every other one has.

A page that does not sit at the top level says where it lands with `output:` in
its front matter, the way the album pages do. That is how
`_src/support-us.html` builds to `sponsors/support-us.html`, keeping the
address the navigation and the old site both use. The four resources pages do
the same, so `/resources/robo-parts` and the rest are still at the addresses the
old site used.

The old site published the support-us page twice, at `/sponsors/support-us` and
at `/sponsors/support-us-2`, with identical content. The rebuilt page is at the
first address only. The second address served a small hand-written redirect for
a while; that file has been deleted, so `/sponsors/support-us-2` now returns the
404 page. Nothing in the site linked to it — only anything off-site that still
carries the old address.

`news.html` is the list of stories; the stories themselves are the pages under
`news/`, built from `content/posts/`. They kept their filenames, so every
existing link to `/news/2023-igvc-competition` still works. `projects.html` and
the robot pages under `projects/` work the same way, built from
`content/robots/` and `content/projects/`, and they kept their filenames too.

Each story is in two places on purpose: its card on the news page comes from
`content/news/config.toml`, and the page that card opens comes from
`content/posts/<story>/config.toml`. Nothing checks that the title, date and
summary agree.

The album pages kept their filenames, so every existing link to
`/gallery/2023-igvc` still works — including the ones from the robot write-ups,
which now link to an album, a news story and a neighbouring robot at the foot of
each page.

`projects.html` keeps its filename so every existing link to `/projects` and to
the write-ups under `projects/` still works, even though the page and the
navigation both call it Robots.

---

## Where everything lives

| Path | Contents |
|---|---|
| `index.html` | The landing page (generated) |
| `about.html` | The about page (generated) |
| `projects.html` | The robots page (generated) |
| `news.html` | The news page (generated) |
| `gallery.html` | The gallery page (generated) |
| `gallery/` | 31 photo-album pages (generated), linked from the gallery page |
| `calendar.html` | The calendar page (generated) |
| `sponsors.html` | The sponsors page (generated) |
| `sponsors/support-us.html` | The support-us page (generated) — the only file under `sponsors/` |
| `resources.html` | The resources page (generated) |
| `resources/` | 4 pages (generated): software and guides, links, Super Robo Time, robo parts |
| `pumpkin.html` | The pumpkin chunkin scoreboard (generated); its scores come from a Google Sheet at view time, not from this repo |
| `404.html` | The not-found page (generated); GitHub Pages serves it for any address that does not exist |
| `memes.html`, `pong.html`, `schraderbug.html` | The three easter-egg pages — hand-written, not generated, see below |
| `projects/` | 12 robot write-ups (generated), linked from the robots page |
| `news/` | 11 news write-ups (generated), linked from the news page, plus one empty stub |
| `content/` | Editable text + images for every page — one folder each, and every one has a `README.md` saying how to edit that page |
| `content/site/config.toml` | The few settings every page shares, via `{{site....}}` in the header and footer — the scoreboard button, and the copyright year |
| `assets/css/`, `assets/js/` | The site's own stylesheet and script |
| `assets/img/` | The logo and favicon — the only two images that are not a page's own content |
| `assets/img/eggs/` | The pictures the easter-egg pages use, and nothing else |
| `assets/vendor/` | Font Awesome, vendored so the icons work offline |

Hidden pages, reachable only via easter eggs — each one is an invisible link,
and the only route to that page:

| Page | Where the link hides |
|---|---|
| `pong.html` | The very bottom-right corner of the home page, below the footer — 40 × 10px |
| `schraderbug.html` | A 3px strip under the banner on the news page |
| `memes.html` | The gallery page, in a 3px strip under the last row of albums |

The links are carried through the rebuild in `_src/index.html`, `_src/news.html`
and `_src/gallery.html`; delete any of those links and the page it opens becomes
unreachable.

These three pages are the only `.html` files in the site root that `build.py`
does not generate — edit them directly, and note that `./build.py` will neither
rewrite nor complain about them. Each is self-contained: its own `<style>`
block, no shared header or footer, and no stylesheet or script beyond what is
inside the file. Their pictures are in `assets/img/eggs/`.

---

