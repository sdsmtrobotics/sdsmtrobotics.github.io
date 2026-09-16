# Robot write-ups

One folder per robot. Each one is a page at `/projects/<folder name>` — the
whole write-up, its details, its links, and its photographs. You do not need to
touch any HTML.

```
config.toml               the wording every write-up shares  <- the link back,
                          the headings, the band at the bottom
<robot>/config.toml       one robot: its words, its links and its photos
<robot>/images/           the pictures for that robot
<robot>/map.html          a guide showing what goes where     <- open this first
```

The cards on the robots page that link *to* these pages are somewhere else:
`content/robots/config.toml`. The two sets of words are separate, so keep a
robot's `name`, `years` and `intro` here in step with its `name`, `years` and
`blurb` there.

## Start here

Open a robot's **`map.html`** in a web browser (double-click it). It lists every
photo and every piece of text on that page, in the order they appear, and names
the setting to change for each one. It is generated from the real page, so it
can never be out of date.

## Adding a robot

1. Copy an existing folder and rename it to the address you want. Lower case,
   words separated by hyphens: `content/projects/robosub/` becomes
   `/projects/robosub`.
2. Put its photos in that folder's `images/`. Number them in the order you want
   them shown (`01-photo.jpg`, `02-photo.jpg`) — that is only a habit, but it
   keeps the folder readable.
3. Edit its `config.toml`: the name and dates at the top, then the details and
   links, then the write-up, then the photographs, then the cards at the foot.
4. Add a card for it in `content/robots/config.toml`, with `link` set to
   `/projects/<folder name>`. **Without this nothing links to the new page.**
5. Run `./build.py` from the top of the repository, then commit.

## The two cards at the top

`fact` is the Details card — the rows the old site called Date, Created By,
Purpose, Cost and Features. Each row is a label and what goes beside it:

```toml
fact = [
  ["Built by", "Samuel Ryckman"],
  ["Purpose",  "Drivetrain idea for the 2019 competition"],
]
```

Add rows, delete rows, reorder them. There is no fixed set — a robot with no
cost to report simply has no Cost row, rather than a blank one. The date is not
in here because it is already under the robot's name at the top of the page.

`file` is the Files and code card beside it — the CAD, the repository, the
design report. Each row is the words to show, where they go, and an optional
note that follows in grey:

```toml
file = [
  ["CAD model", "https://workbench.grabcad.com/...", "(GrabCAD)"],
  ["Code",      "https://github.com/sdsmt-robotics/...", "(GitHub)"],
]
```

A robot with no `file` list gets the details card on its own, full width. Do not
add a row that points at `#`: the old site had several of those and they look
like links until somebody clicks one.

## Writing the write-up itself

The write-up is a run of `[[robot.block]]` blocks — the same shape the news
write-ups use. Each block is one piece of the page and can hold any of:

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
[[robot.block]]
image   = "electrical-diagram.png"
caption = "The planned electrical system."

[[robot.block]]
text = [
  "Brushless motors with integrated drivers were chosen ...",
]
```

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`, which is why links written in `config.toml`
look like `<a href=\"/projects/soccerbots\">`.

## The photographs

`[[robot.photo]]` blocks become the grid under "Photographs", the same grid and
the same full-size overlay the album and news pages use. The old site showed
these as a carousel at the top of the page; they are now a grid below the
write-up, where they do not push the words off the screen.

Most of these robots also have a photo album of their own under
`content/albums/`, holding the same pictures. The two are separate on purpose —
an album is the whole day, a write-up is the machine — so changing one does not
change the other.

Pictures inside the write-up and pictures in the grid both come from the same
`images/` folder. Nothing stops you using one file for both.

## Photo sizes

Photographs here are up to **2560px** on the longest side, because that is the
largest copy of them that survives anywhere. The page never displays one at full
size; the extra pixels are there so a future redesign has something to work
with. Diagrams, CAD renders and board layouts are left at whatever size they
came in at: the column shows them at their own size rather than blowing them up,
so a 500px block diagram stays sharp.

`map.html` shows the current size of every photo and flags any that are missing.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, and live
in `_partials/header.html` and `_partials/footer.html`.

There is one page source behind all of these write-ups: `_src/robot.html`.
Change it and every robot page changes. The details card reuses the meeting-time
list from the about page, the links card reuses the link list from the resources
pages, and the write-up and the photo grid reuse the news pages' styling — all
in `assets/css/site.css`. The full-size photo overlay is in `assets/js/site.js`.
