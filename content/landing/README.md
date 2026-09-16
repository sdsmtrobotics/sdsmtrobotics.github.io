# Landing page content

Everything you can see on the front page of the website is controlled from this
folder. You do not need to touch any HTML.

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
2. Find the setting — `map.html` tells you the name, e.g. `hero.heading`.
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

**Photo sizes.** The hero and the feature band stretch the full width of the
screen, so those want a wide landscape photo, ideally 2000px or wider. The robot
cards are small, so anything from about 800px wide is fine. `map.html` shows the
current size of every photo.

## Common jobs

**New season — change the headline.** Edit `[hero]`: set `heading` to the new
competition, and update `body` with the date and venue. Replace
`images/hero.jpg` with a photo of the new build.

**Add a robot card.** Copy a whole `[[robots.card]]` block in `config.toml`,
paste it below the others, and edit it. Cards appear left to right in the order
they are written. Delete a block to remove a card.

**A robot with no photos yet.** Leave its `image = ""`. The card shows a styled
"photos coming soon" placeholder instead of a broken image. Set `link = ""` too
if there is no page for it yet.

**Change the meeting times.** Edit the `rows` table in the second
`[[join_us.card]]` block.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout and styling live in `_src/index.html` and
`assets/css/site.css`. You only need those if you want to change the structure
of the page rather than what it says.
