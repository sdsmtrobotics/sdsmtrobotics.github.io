# News page content

Everything you can see on the news page (`/news`) is controlled from this
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

## Adding a news post

This is the job you will do most often.

1. Write the post itself in `content/posts/`: copy one of the folders in there,
   rename it after the address you want (`/news/robosub-2026` comes from
   `content/posts/robosub-2026/`), and replace the words and photos. See
   `content/posts/README.md`.
2. Put a photo for the card in the `images/` folder **here**, named after the
   story (`robosub-2026.jpg`, not `IMG_4471.jpg`). This is separate from the
   photos inside the write-up.
3. Open `config.toml` and copy a whole `[[news.post]]` block.
4. Paste it **above** the others — the page runs newest first — and edit it,
   pointing `link` at `/news/<folder name>`.
5. Move `featured = true` onto the new post and delete that line from the old
   one, so the big band at the top shows the newest story.
6. Run `./build.py` from the top of the repository, then commit.

Each post has these settings:

| Setting | What it is |
|---|---|
| `title` | The headline, shown as the card heading |
| `date` | The date line under the headline |
| `tag` | The small gold label in the corner of the photo |
| `category` | Which filter button shows this card (see below) |
| `blurb` | The summary. Links and basic HTML are allowed |
| `image` | Filename in `images/`. Leave `""` for a placeholder |
| `link` | The write-up the card opens. Leave `""` for none |
| `link_text` | The words on the link at the bottom of the card |
| `featured` | `true` on **one** post; leave the line off all the others |

**The featured post.** Exactly one post should carry `featured = true`. That
post gets the large band at the top of the page under "Latest update" and is
left out of the list below, so it never appears twice. If you mark two, you get
two bands; if you mark none, the page starts straight in on the list. The
wording above it — "Latest update" and "Read the full write-up" — comes from
`news.featured_eyebrow` and `news.featured_link_text`.

**A post with no photo yet.** Leave `image = ""` and the card shows a navy
"photos coming soon" panel instead. Leave `link = ""` and the card shows its
`link_text` as plain grey text rather than a dead link.

## The filter buttons

The row of buttons above the cards comes from the `[[news.filter]]` blocks.
Each button shows only the posts whose `category` matches its `value`, and the
one with `value = ""` shows everything. The three we use are:

| `category` | Shows under | Typical post |
|---|---|---|
| `competition` | Competitions | IGVC, ASME, NRC, IEEE results |
| `outreach` | Outreach | Pumpkin chunkin, FLL, festivals, demos |
| `team` | Team news | Newsletters, Super Robo Time, officer news |

If you add a post in a brand new category, **add a button for it too**, or its
card will only ever appear under "All updates".

The buttons need JavaScript. With JavaScript off they are hidden altogether and
the page shows the complete list, so nothing is ever unreachable.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `news.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py`, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## Changing a photo

1. Put the new photo in the `images/` folder.
2. In `config.toml`, set that post's `image` to the new filename.
3. Run `./build.py` and commit.

**Photo sizes.** The banner at the top stretches the full width of the screen,
so it wants a wide landscape photo, ideally 1900px or wider. The card photos are
shown in a 16:10 box and cropped to fit, so around 1200px wide is plenty —
bigger just makes the page slower to load. `map.html` shows the current size of
every photo, and flags any that are missing.

Several of the photos in here came from the old site's thumbnail cache and are
only as large as that cache kept them. If you find a bigger original, drop it in
and overwrite the file.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/news.html`, its styling in
`assets/css/site.css`, and the filter buttons' behaviour in `assets/js/site.js`.
You only need those if you want to change the structure of the page rather than
what it says.

The write-ups themselves are one folder over, in `content/posts/` — one folder
per story, each with its own `config.toml` and `images/`. The cards on this page
and the pages they open are two separate sets of words, so keep each post's
`title`, `date` and `blurb` here in step with the `title`, `date` and `intro` in
`content/posts/<story>/config.toml`. Nothing checks that they agree.
