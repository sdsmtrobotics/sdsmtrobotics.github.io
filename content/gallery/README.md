# Gallery page content

Everything you can see on the gallery page (`/gallery`) is controlled from this
folder. You do not need to touch any HTML.

```
config.toml    all the text, and which photo goes in each spot
images/        the cover photos for this page
map.html       a guide showing what goes where  <- open this first
```

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every photo and
every piece of text on the page, in the order they appear, and tells you the
exact setting name to change for each one. It is generated from the real page,
so it can never be out of date.

## What this page is, and is not

This page is the **index** of albums — one card per album, with a cover photo, a
date and a photo count. The 31 albums themselves are edited one folder over, in
`content/albums/`: one folder per album, each with its own `config.toml` and
`images/`. That folder has its own `README.md`.

So adding an album is a job in two halves: make the album, then add a card here
that points at it.

## Adding an album

1. Make the album in `content/albums/`: copy one of the folders in there, rename
   it after the address you want (`/gallery/robosub-2026` comes from
   `content/albums/robosub-2026/`), and replace its words and photos. See
   `content/albums/README.md`.
2. Pick one photo from the album as the cover, put it in `images/` **here**, and
   name it after the album (`robosub-2026.jpg`, not `IMG_4471.jpg`). This is
   separate from the photos inside the album.
3. Open `config.toml` and copy a whole `[[gallery.album]]` block.
4. Paste it **above** the others — the page runs newest first — and edit it,
   pointing `link` at `/gallery/<folder name>`.
5. Run `./build.py` from the top of the repository, then commit.

Each album has these settings:

| Setting | What it is |
|---|---|
| `title` | The album name, shown as the card heading |
| `date` | The date line under the name |
| `season` | The school year, shown after the date |
| `tag` | The small gold label in the corner of the cover photo |
| `category` | Which filter button shows this card (see below) |
| `count` | How many photos the album holds |
| `blurb` | The summary. Links and basic HTML are allowed |
| `image` | Cover filename in `images/`. Leave `""` for a placeholder |
| `link` | The album page the card opens |

**The photo count** is the badge in the top corner of the cover. It is typed in
by hand — nothing counts the `[[album.photo]]` blocks in
`content/albums/<album>/config.toml` for you. If you add photos to an album,
bump its `count` here too.

**The season.** The old gallery page grouped albums under headings — "2024 -
2025", "2023 - 2024" and so on. The rebuilt page is one list with filter buttons
instead, so each card carries its own season on the line under the title. Use an
en dash entity, `&ndash;`, the way the existing entries do.

**An album with no cover yet.** Leave `image = ""` and the card shows a navy
"photos coming soon" panel instead of a photo.

**The link wording.** Unlike the news and robots pages, every card here opens the
same kind of thing, so the words on the bottom link are one shared setting —
`gallery.link_text` — rather than one per card.

## The filter buttons

The row of buttons above the cards comes from the `[[gallery.filter]]` blocks.
Each button shows only the albums whose `category` matches its `value`, and the
one with `value = ""` shows everything. The four we use are:

| `category` | Shows under | Typical album |
|---|---|---|
| `competition` | Competitions | IGVC, ASME, NRC, IEEE trips |
| `outreach` | Outreach | Pumpkin chunkin, FLL, festivals, school visits |
| `robots` | Robots | Build photos of a single machine |
| `team` | Team | Super Robo Time, org fairs, parties |

If you add an album in a brand new category, **add a button for it too**, or its
card will only ever appear under "All albums".

The buttons need JavaScript. With JavaScript off they are hidden altogether and
the page shows the complete list, so nothing is ever unreachable.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `gallery.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py`, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## Changing a photo

1. Put the new photo in the `images/` folder.
2. In `config.toml`, set that album's `image` to the new filename.
3. Run `./build.py` and commit.

**Photo sizes.** The banner at the top stretches the full width of the screen,
so it wants a wide landscape photo, ideally 1900px or wider. The cover photos are
shown in a 16:10 box and cropped to fit, so around 1200px wide is plenty —
bigger just makes the page slower to load. `map.html` shows the current size of
every photo, and flags any that are missing.

The covers in here are the largest copy of each photo that survived in the old
site's image cache, so a few are small or portrait-shaped and get cropped hard.
If you find a bigger original, drop it in and overwrite the file.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/gallery.html`, its styling in
`assets/css/site.css`, and the filter buttons' behaviour in `assets/js/site.js`.
You only need those if you want to change the structure of the page rather than
what it says.

The album pages themselves are built from `content/albums/` by one shared page
source, `_src/album.html`. The cards on this page and the pages they open are
two separate sets of words, so keep each album's `title`, `date` and `blurb`
here in step with the `title`, `date` and `intro` in
`content/albums/<album>/config.toml`. Nothing checks that they agree.

**One thing in `_src/gallery.html` must not be deleted:** a deliberately
invisible link sits under the last row of albums, and it is the only route on
the whole site to `memes.html`. Remove it and that page becomes unreachable.
