# Sponsors page content

Everything you can see on the sponsors page (`/sponsors`) is controlled from
this folder. You do not need to touch any HTML.

```
config.toml    all the text, the four levels, and who is in each one
images/        the sponsor logos
map.html       a guide showing what goes where  <- open this first
```

The page that asks people to become sponsors is a different one, edited in
`content/support-us/`. This folder is only the list of who has already said
yes.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every logo and
every piece of text on the page, in the order they appear, and tells you the
exact setting name to change for each one. It is generated from the real page,
so it can never be out of date.

## Adding a sponsor

This is the job you will do most often.

1. Save the company's logo into `images/`, named after the company
   (`knecht-home-center.png`, not `logo4.png`).
2. Open `config.toml` and find the level they are supporting us at —
   `[platinum]`, `[gold]`, `[silver]` or `[bronze]`.
3. Copy a whole `[[gold.sponsor]]` block and paste it under that level,
   changing `gold` to the level's name if it is a different one.
4. Fill it in, run `./build.py` from the top of the repository, and commit.

Each sponsor has these settings:

| Setting | What it is |
|---|---|
| `name` | The company, shown under the logo |
| `image` | Filename in `images/` |
| `image_alt` | What the logo says, for screen readers |
| `link` | The company's website. Leave `""` for no link |

Sponsors appear in the order their blocks appear in the file.

**A level with nobody in it** — `[platinum]` and `[silver]` at the time of
writing — shows a dashed panel inviting somebody to be the first, instead of a
row of logos. There is nothing to switch on: delete every `[[silver.sponsor]]`
block and the panel comes back on its own; add one and it goes away. The
wording of that panel is `sponsors.open_text` and the two settings under it,
and it is shared by all four levels.

## Removing a sponsor

Support runs for the year it is given. When a sponsorship ends, delete that
`[[<level>.sponsor]]` block and run `./build.py`. Leave the logo file in
`images/` unless you are sure it will not be needed again — it costs nothing to
keep, and re-finding a good copy of somebody's logo is annoying.

## Logo files

Logos are shown in a box **216px wide and 144px tall**, and are scaled down to
fit inside it without being stretched or cropped. So the shape of the file does
not matter much, but two things do:

- **A transparent background** (PNG or SVG) sits properly on the white tile. A
  logo saved on its own white square will look like a box inside a box.
- **SVG is best where a company offers one**, because it stays sharp at any
  size. `solidworks.svg` is one. Otherwise use a PNG around 400px wide.

`map.html` shows the current size of every logo, and flags any that are missing
from `images/`.

Use the logo the company publishes, in the colours they publish it in. Most
companies have a press or brand page with a proper copy; that is worth two
minutes of looking before pulling one out of a search result.

## Changing the levels themselves

The four `[platinum]` / `[gold]` / `[silver]` / `[bronze]` blocks set each
level's name, its dollar range, and the one-line summary of what it gets. The
levels appear on the page in the order they appear in the file — highest first.

The **full** list of what each level gets is on the support-us page, in
`content/support-us/config.toml`. If you change an amount or a benefit here,
change it there too. Nothing checks that the two agree.

Each level's colour — the rule across the top of its row — comes from its name
and lives in `assets/css/site.css`. A brand new level would need a colour added
there; the four that exist do not.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `sponsors.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py`, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## No banner photo

Like the calendar, this page deliberately has no photo across the top. The list
of sponsors is what people come here for, and a banner would push it off the
first screen. The `[page_head]` block still has an `image` setting, so if you
ever want one, drop a wide photo in `images/` and name it there.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/sponsors.html` and its styling in
`assets/css/site.css`. You only need those if you want to change the structure
of the page rather than what it says.
