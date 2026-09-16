# Support Us page content

The wording on the support-us page (`/sponsors/support-us`) is controlled from
this folder. You do not need to touch any HTML.

```
config.toml    all the text, including what each sponsorship level gets
images/        photos for this page (currently empty - the page uses none)
map.html       a guide showing what goes where  <- open this first
```

This is the page that asks. The list of companies who have already said yes is
the sponsors page, edited in `content/sponsors/`.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every piece of
text on the page, in the order it appears, and tells you the exact setting name
to change for each one. It is generated from the real page, so it can never be
out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `why.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## The sponsorship levels

The `[[levels.card]]` blocks are the four levels, **lowest first** — the page
reads as a ladder from the cheapest way in. Each one has:

| Setting | What it is |
|---|---|
| `level` | `bronze`, `silver`, `gold` or `platinum`. Sets the colour of the stripe across the top of the card |
| `name` | The level's name, shown as the card heading |
| `amount` | The dollar range under the name |
| `benefit` | One line per benefit, shown as a list |

To change what a level gets, add or edit a line in its `benefit` list.

**These amounts and benefits are also on the sponsors page**, in short form, in
`content/sponsors/config.toml`. Change one and change the other — they are set
in two places and nothing checks that they agree.

`level` only picks a colour. A word that is not one of the four gets the team's
gold, which is the right thing for a new level until somebody adds a colour for
it in `assets/css/site.css`.

## Keeping the ask honest

Two things on this page are promises to somebody paying money, so they are
worth being careful with:

- **The benefit lists** describe what a sponsor gets for a year of support. If
  the team stops doing one of them — no banners this season, say — take the
  line out rather than leaving it as a promise nobody is keeping.
- **The email address** in the contact bar at the bottom is the only way in
  from this page. If it changes, it also has to change in
  `_partials/footer.html` and on the about, landing and calendar pages.

## No banner photo

Like the sponsors page this sits under, there is deliberately no photo across
the top. The `[page_head]` block still has an `image` setting, so if you ever
want one, drop a wide photo in `images/` and name it there.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/support-us.html` and its styling in
`assets/css/site.css`. That source is also where the page's address is set —
`output: sponsors/support-us.html` in the comment at the top — which is how a
file called `support-us.html` in `_src/` ends up inside the `sponsors/` folder.
