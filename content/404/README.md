# Page-not-found content

Everything you can see on the not-found page (`404.html`) is controlled from
this folder. You do not need to touch any HTML.

```
config.toml    all the text, and the cards sending people on their way
map.html       a guide showing what goes where  <- open this first
```

There is no `images/` folder: the page has no photos on purpose. Someone who
lands here took a wrong turn, and the fastest way out is to see the links
without scrolling past a picture first.

## How anyone ends up here

GitHub Pages serves this page by itself whenever a visitor follows a dead link
or mistypes an address. **Nothing on the site links to it**, so the only way to
see your own changes is to visit an address that does not exist — with
`./serve.py` running, try <http://localhost:4000/nope>. `serve.py` serves the
404 page for unknown addresses exactly as GitHub Pages does, which is one of the
reasons not to use `python3 -m http.server` instead.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every piece of
text on the page in the order it appears and names the setting behind each one.
It is generated from the real page, so it can never be out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `page_head.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## The cards

`[routes]` is the band under the heading, and each `[[routes.card]]` block is one
card in it. This is the part worth keeping current: it is the short list of
places to send somebody who is lost.

| Setting | What it is |
|---|---|
| `icon` | A Font Awesome 4 name **without** the `fa-` in front, e.g. `cogs` |
| `heading` | The card title |
| `body` | The sentence under it |
| `link` | Where the card goes |
| `link_text` | The words on the link at the bottom of the card |

To add a card, copy a whole block and edit it. To reorder them, move the blocks —
they appear in the order they are written. To remove one, delete its block.

**The icons** have to be ones that ship with the site. The four in use are
`cogs`, `newspaper-o`, `camera` and `users`; for anything else, check the name
exists in `assets/vendor/font-awesome/css/font-awesome.min.css` first. A name
that does not exist leaves a blank space rather than an error, so it is easy to
miss.

**Keep the links alive.** These are hand-written addresses, and this is the one
page nobody visits deliberately, so a card pointing at a page that has since
moved can sit there broken for a long time. Worth clicking all four whenever the
navigation changes.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/404.html` and its styling in
`assets/css/site.css`. You only need those if you want to change the structure
of the page rather than what it says.

The old site's 404 page used four social icons and a Rocker Central icon from
its own image folder. The rebuilt page uses the shared footer's Font Awesome
icons instead, so those files are gone and nothing here points at them.
