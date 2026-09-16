# Resources page content

The wording on the resources page (`/resources`) is controlled from this folder.
You do not need to touch any HTML.

```
config.toml    all the text on the page
images/        photos for this page (currently empty - the page uses none)
map.html       a guide showing what goes where  <- open this first
```

## This folder has four folders inside it

The resources page is a signpost, and the four pages it points at are edited one
level down:

| Folder | Page |
|---|---|
| `software-and-guides/` | `/resources/software-and-guides` |
| `links/` | `/resources/links` |
| `super-robo-time/` | `/resources/super-robo-time` |
| `robo-parts/` | `/resources/robo-parts` |

Each has its own `config.toml`, `images/`, `map.html` and `README.md`, and works
exactly the way this one does. The nesting mirrors the addresses so it is
obvious which folder is which page &mdash; it is **not** a collection in the
sense `content/albums/` is, and nothing in `config.toml` here is shared with
them. Change a word in this file and only the signpost page changes.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every piece of
text on the page, in the order it appears, and tells you the exact setting name
to change for each one. It is generated from the real page, so it can never be
out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `sections.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## The four cards

The `[[sections.card]]` blocks are the four pages, in the order they appear.
Each one has:

| Setting | What it is |
|---|---|
| `icon` | A Font Awesome 4.7 name without the `fa-` prefix. Browse them at <https://fontawesome.com/v4/icons/> |
| `heading` | The card title |
| `body` | The sentence or two saying what is behind the link |
| `holds` | The short list under it. Leave it out and the card is just its sentence |
| `link`, `link_text` | Where the card goes, and what the link says |

The old version of this page was four grey buttons with nothing to choose
between them, which is why each card now says what it is for. **If you add a
fifth page under Resources, add a card here too** — this page is the only route
to any of them from the navigation.

The `[[elsewhere.card]]` blocks near the bottom are the things people arrive on
this page looking for that live somewhere else on the site. `external = true`
opens that card's link in a new tab; leave it out for a link to a page on this
site.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/resources.html` and its styling in
`assets/css/site.css`.

## No banner photo

Like the calendar and sponsors pages, there is deliberately no photo across the
top: the four cards are the whole point of the page, and a photo would push them
off the first screen. The `[page_head]` block still has an `image` setting, so
if you ever want one, drop a wide photo in `images/` and name it there.
