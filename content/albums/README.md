# Photo albums

One folder per album. Each one is a page at `/gallery/<folder name>` — the
banner, the sentence under it, and the grid of photographs. You do not need to
touch any HTML.

```
config.toml               the wording every album shares  <- the link back,
                          the heading over the photos, the band at the bottom
<album>/config.toml       one album: its title, date and list of photos
<album>/images/           the photos themselves
<album>/map.html          a guide showing what goes where  <- open this first
```

There are 31 albums in here. The cards on the gallery page that link *to* these
pages are somewhere else: `content/gallery/config.toml`. The two sets of words
are separate, so keep an album's `title`, `date` and `intro` here in step with
its `title`, `date`, `count` and `blurb` there.

## Start here

Open an album's **`map.html`** in a web browser (double-click it). It lists every
photo and every piece of text on that page, in the order they appear, and names
the setting to change for each one. It is generated from the real page, so it can
never be out of date.

## Adding an album

1. Copy an existing folder and rename it to the address you want. Lower case,
   words separated by hyphens: `content/albums/robosub-2026/` becomes
   `/gallery/robosub-2026`.
2. Put its photos in that folder's `images/`. Number them in the order you want
   them shown (`01-photo.jpg`, `02-photo.jpg`) — that is only a habit, but it
   keeps the folder readable and it is what every existing album does.
3. Edit its `config.toml`: the `[album]` block at the top, then one
   `[[album.photo]]` block per picture.
4. Add a card for it in `content/gallery/config.toml`, with `link` set to
   `/gallery/<folder name>`. **Without this nothing links to the new page.**
5. Run `./build.py` from the top of the repository, then commit.

## The album's own settings

The `[album]` block at the top of each folder's `config.toml`:

| Setting | What it is |
|---|---|
| `title` | The album name — the heading, and the browser tab title |
| `date` | The date line under the heading |
| `season` | The school year, shown after the date |
| `tag` | The small gold label over the banner |
| `intro` | The sentence under the heading. Links and basic HTML are allowed |
| `image` | The banner photo: a filename from `images/`. `""` gives a plain navy band |

The banner is usually the first photo, but any of them will do — and it does not
have to be one of the photos in the grid at all.

## The photographs

Each `[[album.photo]]` block is one picture in the grid:

| Setting | What it is |
|---|---|
| `image` | A filename in that album's `images/` folder |
| `caption` | Shown under the photo at full size, and read out to screen readers |

To swap a photo, put the new file in `images/` and change the filename here. To
reorder them, move the blocks — they appear in the order they are written. To
remove one, delete its block **and** the file.

A `caption` may be left `""`; the page falls back to "<album title>, photo 3" so
screen readers still have something to read. There is no separate thumbnail —
the same file is used for the grid and for the full-size view.

Every tile is a plain link to the photo itself, so with JavaScript off a photo
still opens on its own. With it on, `assets/js/site.js` upgrades the grid to an
overlay that can be stepped through.

## Photo sizes

Nothing in here needs to be larger than **1600px** on its longest side; the page
never displays one bigger, and the repository is the one copy of the site there
is. `map.html` shows the current size of every photo and flags any that are
missing.

Some albums share photos with a robot write-up under `content/projects/`, and
for 42 of those the copy over there is the larger one — up to 2560 × 1440,
because the write-ups were converted by keeping whichever copy was bigger. If an
album page wants the bigger file, it is one folder over rather than in the git
history.

## The wording all 31 share

`config.toml` in **this** folder — beside the album folders, not inside one —
holds what every album page has in common: the "All albums" link back to the
gallery, the heading and hint above the photographs, and the band at the bottom.
Change it once here and all 31 pages follow.

An album's own `config.toml` wins wherever both files set the same key, so a
single album can override any of it without affecting the others.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, and live
in `_partials/header.html` and `_partials/footer.html`.

There is one page source behind all 31 albums: `_src/album.html`. Change it and
every album page changes. Their styling is in `assets/css/site.css`, and the
full-size photo overlay is in `assets/js/site.js`.

The album pages kept the filenames the old site used, so every existing link to
`/gallery/2023-igvc` still works — including the ones from the robot write-ups,
which link to an album at the foot of each page. Renaming a folder changes the
page's address and breaks those links.
