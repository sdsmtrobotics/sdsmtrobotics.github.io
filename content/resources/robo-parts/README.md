# Robo Parts page content

The wording on `/resources/robo-parts` is controlled from this folder. You do
not need to touch any HTML.

```
config.toml    all the text, and every link on the page
images/        the eight pinout and circuit diagrams the page links to
map.html       a guide showing what goes where  <- open this first
```

This page sits under the resources page, which is edited one folder up in
`content/resources/`.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every piece of
text on the page, in the order it appears, and tells you the exact setting name
to change for each one. It is generated from the real page, so it can never be
out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `parts.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## The part cards

Each `[[parts.part]]` block is one part, and `[[chips.chip]]` blocks are the
microcontrollers further down. They take the same settings.

| Setting | What it is |
|---|---|
| `icon` | A Font Awesome 4.7 name without the `fa-` prefix. Browse them at <https://fontawesome.com/v4/icons/> |
| `heading` | The part's name, spelled the way you would search for it |
| `meta` | The small grey line under it — what kind of thing it is |
| `category` | Which filter button shows this card (parts only — see below) |
| `body` | **What it is actually like to use** |
| `links` | The list of links (see below) |

`body` is the part worth writing carefully. The datasheet already covers the
numbers; nothing else covers whether the thing is a pleasure or a misery to work
with, and that is what the next person needs.

To add a part, copy a whole `[[parts.part]]` block. Order on the page is order
in the file.

### How `links` works

Each link is a list of two or three pieces:

```toml
links = [
  ["Specs", "https://motors.vex.com/other-motors/bb-550"],
  ["CAD",   "https://workbench.grabcad.com/...", "(GrabCAD)"],
]
```

The first is the words you click, the second is the address, and the third is
optional — shown in grey after the link, which is where `(PDF)`, `(ours)` and
`(GrabCAD)` come from. `(ours)` marks the libraries and diagrams the team wrote
itself; they are worth flagging, because they are the ones that can be fixed.

**An `&` inside a web address has to be written `&amp;`.** Two of the addresses
here have several.

## The filter buttons

`[[parts.filter]]` blocks are the row of buttons above the part cards. The first
one, with `value = ""`, is the "show everything" button; the rest each match the
`category` on the cards they show.

**Add a category in two places or not at all.** A new button with no cards
behind it shows an empty page, and a card with a category no button names can
only ever be found under "All parts". The microcontroller grid further down has
no filter buttons, so those cards have no `category`.

The buttons are built by `assets/js/site.js` — the same filter the robots and
news pages use. With JavaScript off, every card is still on the page and the
buttons simply do not appear.

## The images in this folder

The eight pinouts and the BTS7960 circuit diagram are **in this repository**,
not hotlinked, so they keep working whatever happens to the sites they came
from. They are referred to by full address:

```toml
["Pinout", "/content/resources/robo-parts/images/atmega328p-pinout.png"]
```

To replace one, drop the new file in `images/` and change the filename in that
address to match. They open in a new tab, the same as every other link on the
page.

## This page is only as good as its last update

It is a decade of accumulated opinion about parts, and parts get discontinued.
Two things are worth doing when somebody notices:

- **A part that is no longer buyable** should say so in `body` rather than
  disappear — knowing a part was dropped is useful, and the CAD is often still
  wanted for an old robot.
- **A part somebody used and liked** belongs here. The list is worth reading
  precisely because it is what the team actually reaches for.

Two small corrections were made during the rebuild, in case they look wrong
against the old page: the XBee link was labelled "Sparkfun" but has always
pointed at Digi-Key, and the two tables of chips and Arduino boards were merged
into one list.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/robo-parts.html` and its styling in
`assets/css/site.css`. That source is also where the page's address is set —
`output: resources/robo-parts.html` in the comment at the top — which is how a
file called `robo-parts.html` in `_src/` ends up inside the `resources/` folder.

## No banner photo

Like the resources page this sits under, there is deliberately no photo across
the top. The `[page_head]` block still has an `image` setting, so if you ever
want one, drop a wide photo in `images/` and name it there.
