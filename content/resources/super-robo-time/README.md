# Super Robo Time page content

The wording on `/resources/super-robo-time` is controlled from this folder. You
do not need to touch any HTML.

```
config.toml    all the text, and every link on the page
images/        the photo in the middle of the page
map.html       a guide showing what goes where  <- open this first
```

This page sits under the resources page, which is edited one folder up in
`content/resources/`.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every piece of
text and every photo on the page, in the order they appear, and tells you the
exact setting name to change for each one. It is generated from the real page,
so it can never be out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `kit.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## This page goes stale every year

**It is the handout for an event that runs once a year**, and the guides, the
base code, the wiring diagram and the challenge list get rewritten for each one.
Everything in `[kit]` is worth going through link by link *before* the event
starts, not during it, while there is still time to fix what has moved.

The three figures in `[feature]` — the weeks, the clubs, the workday — are the
other thing that quietly stops being true. Check them against what is actually
planned.

## The stage cards

Each `[[kit.stage]]` block is one card, in the order a team meets them during
the event: install the software, build it, wire it, program it, then find out
what it has to do.

| Setting | What it is |
|---|---|
| `icon` | A Font Awesome 4.7 name without the `fa-` prefix. Browse them at <https://fontawesome.com/v4/icons/> |
| `heading` | The stage name |
| `body` | A sentence on what the stage is. Optional |
| `links` | The list of links (see below) |
| `note` | Plain instructions that are not a link — an install path. Optional |
| `link`, `link_text` | One link **to a page on this site**, at the bottom of the card. Optional |

### How `links` works

Each link is a list of two or three pieces:

```toml
links = [
  ["Wiring diagram", "https://drive.google.com/file/d/..."],
  ["Demo part - wheel drawing", "https://drive.google.com/file/d/...", "(PDF)"],
]
```

The first is the words you click, the second is the address, and the third is
optional — shown in grey after the link.

**Everything in `links` opens in a new tab**, which is right for the Drive and
GitLab addresses this page is full of and wrong for a page on this site. That is
what `link` / `link_text` are for, and why the "Going further" card at the
bottom uses them instead.

**An `&` inside a web address has to be written `&amp;`.** Several of the Drive
and SharePoint addresses have them.

## The photo band

`[feature]` is the wide photo in the middle of the page, with a navy gradient
laid over it so the text on top stays readable whatever the photo is. To change
it, put a new **wide landscape** photo in `images/` and name it in `image`. Set
`image` to `""` and the band is plain navy, which also reads fine.

The old page ran this photo across the very top instead. It was moved down so
the material a team actually needs during the event starts on the first screen.

## Shared with the software page

The SOLIDWORKS install instructions, and the SolidWorks workshop guide and CAD
files, are on the software-and-guides page too, in
`content/resources/software-and-guides/config.toml`. They are written out in
both places and nothing checks that they agree — if one moves, change both.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/super-robo-time.html` and its styling in
`assets/css/site.css`. That source is also where the page's address is set —
`output: resources/super-robo-time.html` in the comment at the top — which is
how a file called `super-robo-time.html` in `_src/` ends up inside the
`resources/` folder.

## No banner photo

Like the resources page this sits under, there is deliberately no photo across
the very top. The `[page_head]` block still has an `image` setting if you ever
want one back.
