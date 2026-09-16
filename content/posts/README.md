# News write-ups

One folder per story. Each one is a page at `/news/<folder name>` — the whole
write-up, its pictures, and the cards at the foot of it. You do not need to
touch any HTML.

```
config.toml               the wording every write-up shares  <- the link back,
                          the headings, the band at the bottom
<story>/config.toml       one story: its words and its photos
<story>/images/           the pictures for that story
<story>/map.html          a guide showing what goes where     <- open this first
```

The cards on the news page that link *to* these pages are somewhere else:
`content/news/config.toml`. The two sets of words are separate, so keep a
story's `title`, `date` and `intro` here in step with its `title`, `date` and
`blurb` there.

## Start here

Open a story's **`map.html`** in a web browser (double-click it). It lists every
photo and every piece of text on that page, in the order they appear, and names
the setting to change for each one. It is generated from the real page, so it
can never be out of date.

## Adding a story

1. Copy an existing folder and rename it to the address you want. Lower case,
   words separated by hyphens: `content/posts/robosub-2026/` becomes
   `/news/robosub-2026`.
2. Put its photos in that folder's `images/`. Number them in the order you want
   them shown (`01-photo.jpg`, `02-photo.jpg`) — that is only a habit, but it
   keeps the folder readable.
3. Edit its `config.toml`: the headline and date at the top, then the story
   itself, then the photographs, then the cards at the foot.
4. Add a card for it in `content/news/config.toml`, with `link` set to
   `/news/<folder name>`. **Without this nothing links to the new page.**
5. Run `./build.py` from the top of the repository, then commit.

## Writing the story itself

The write-up is a run of `[[post.block]]` blocks. Each block is one piece of the
page and can hold any of:

| Setting | What it is |
|---|---|
| `heading` | A sub-heading above the block |
| `text` | The paragraphs — one entry in the list per paragraph |
| `list` | A bulleted list — one entry per bullet |
| `image` | A filename in `images/`, shown in the column |
| `caption` | The line under that image |

Leave out what a block does not need. They always come out in that order, so to
put a picture *before* some text, give the picture a block of its own above it:

```toml
[[post.block]]
image   = "team-with-trebuchet.jpg"
caption = "The team at Memorial Park with the rebuilt trebuchet."

[[post.block]]
text = [
  "Once again, the team participated in the annual Pumpkin Chunkin&rsquo; ...",
  "The design for the new trebuchet was similar to the previous one ...",
]
```

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`, which is why links written in `config.toml`
look like `<a href=\"/projects/soccerbots\">`.

## The photographs at the foot

`[[post.photo]]` blocks become the grid under "Photographs", the same grid and
the same full-size overlay the album pages use. A story with no `[[post.photo]]`
blocks simply has no photo band — the 2022 trebuchet and the winter 2025
newsletter are both like that, because every picture they have belongs beside a
particular paragraph.

Pictures inside the story and pictures in the grid both come from the same
`images/` folder. Nothing stops you using one file for both.

## Photo sizes

Nothing in here needs to be larger than **1600px** on its longest side; the page
never displays one bigger than that, and the repository is the one copy of the
site there is. Diagrams, CAD renders and board layouts are left at whatever size
they came in at: the column shows them at their own size rather than blowing
them up, so a 300px screenshot stays sharp.

`map.html` shows the current size of every photo and flags any that are missing.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, and live
in `_partials/header.html` and `_partials/footer.html`.

There is one page source behind all of these stories: `_src/post.html`. Change
it and every write-up changes. Their styling is in `assets/css/site.css` (look
for "news write-ups"), and the full-size photo overlay is in
`assets/js/site.js`.
