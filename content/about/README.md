# About page content

Everything you can see on the about page is controlled from this folder. You do
not need to touch any HTML.

```
config.toml    all the text, and which photo goes in each spot
images/        the photos for this page
map.html       a guide showing what goes where  <- open this first
```

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every photo and
every piece of text on the page, in the order they appear, and tells you the
exact setting name to change for each one. It is generated from the real page,
so it can never be out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `who_we_are.heading`.
3. Change the text between the quote marks.
4. Save, then run `./build.py` from the top of the repository.
5. Commit the change.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break.

## Changing a photo

1. Put the new photo in the `images/` folder.
2. In `config.toml`, set that section's `image` to the new filename.
3. Run `./build.py` and commit.

You can either replace a file directly (keeping the same name, in which case
step 2 is unnecessary) or add a new one and point at it. Keeping the old file
around costs nothing and makes it easy to switch back.

**Photo sizes.** The banner at the top stretches the full width of the screen,
so it wants a wide landscape photo, ideally 1900px or wider. The three photos
beside the text are shown in a 4:3 box and cropped to fit, so anything from
about 1200px wide is fine — portrait photos work, they just lose their top and
bottom. `map.html` shows the current size of every photo.

Every photo also has an `image_alt`, which is the description read aloud by a
screen reader and shown if the photo fails to load. Change it when you change
the photo.

## Common jobs

**New officers at the start of the year.** Edit the `[[officers.person]]`
blocks. Each block is one entry, shown left to right and then down in the order
they are written. Copy a block to add someone, delete one to remove them.

**Change the meeting times.** Edit the `rows` table in the first
`[[join_us.card]]` block.

**A new competition.** Copy a whole `[[competitions.card]]` block, paste it
below the others, and edit it. If there is no page for it yet, leave
`link = ""` — the card then shows its `link_text` as plain grey text instead of
a dead link. Remember to update `competitions.intro`, which says how many series
there are.

**Add or remove a paragraph.** `paragraph` is a list: each quoted line between
the square brackets is one paragraph on the page. Add a line to add a paragraph.
The same applies to `discipline` in `[what_we_do]`, which is the row of labels.

**A plain banner instead of a photo.** Set `page_head.image = ""`. The banner
falls back to solid navy, and the heading still reads correctly.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout and styling live in `_src/about.html` and
`assets/css/site.css`. You only need those if you want to change the structure
of the page rather than what it says.
