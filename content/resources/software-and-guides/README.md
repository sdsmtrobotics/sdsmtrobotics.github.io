# Software and Guides page content

The wording on `/resources/software-and-guides` is controlled from this folder.
You do not need to touch any HTML.

```
config.toml    all the text, and every link on the page
images/        photos for this page (currently empty - the page uses none)
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
2. Find the setting — `map.html` tells you the name, e.g. `software.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## The program cards

Each `[[software.tool]]` block is one card, and the order they appear in the
file is the order they appear on the page.

| Setting | What it is |
|---|---|
| `icon` | A Font Awesome 4.7 name without the `fa-` prefix. Browse them at <https://fontawesome.com/v4/icons/> |
| `heading` | The program's name |
| `meta` | The small grey line under it — what the program is for |
| `body` | A sentence or two on why the team uses it |
| `links` | The list of links (see below) |
| `note` | Plain instructions that are not a link — an install path, a warning. Optional |

To add a program, copy a whole `[[software.tool]]` block and edit it. To
reorder the cards, move the blocks.

### How `links` works

Each link is a list of two or three pieces:

```toml
links = [
  ["Install for Linux", "https://git-scm.com/download/linux"],
  ["Cheat sheet",       "https://education.github.com/git-cheat-sheet-education.pdf", "(PDF)"],
]
```

The first is the words you click, the second is the address, and the third is
optional — it is shown in grey after the link, which is where `(PDF)` and
`(~13 min)` come from.

**Every link in `links` opens in a new tab.** That is right for the other
people's websites this page is full of, but wrong for a page on this site. If
you need to point at one of ours, use `link` and `link_text` on the card
instead, the way the Super Robo Time page does.

**An `&` inside a web address has to be written `&amp;`.** Several of the Google
Drive and SharePoint addresses have them. If a link comes out broken, that is
the first thing to check.

## This page is mostly links, and links rot

Everything here points at somebody else's website, and they move things. It is
worth clicking through the whole page once a year — the start of the fall
semester is the obvious moment, before a new intake follows a dead link.

Two of them are worth particular attention:

- **The install paths in `note`** — the F: drive path and the SharePoint folder
  are the school's, not the team's, and ITS changes them without telling anyone.
- **The SOLIDWORKS download** wants a Mines account and, usually, a machine on
  the campus network.

The SolidWorks workshop guide and CAD files are also linked from the Super Robo
Time page, in `content/resources/super-robo-time/config.toml`. If those move,
change both.

## No logos on the cards

The old page had a small logo beside each program name. They only ever existed
at 24 × 24 pixels — the old CMS cached them at that size and the originals are
not in this repository — so they were dropped rather than blown up into
something blurry. The Font Awesome icons stand in for them. If you want the real
logos back, they would need re-fetching at a usable size from each vendor.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/software-and-guides.html` and its styling in
`assets/css/site.css`. That source is also where the page's address is set —
`output: resources/software-and-guides.html` in the comment at the top — which
is how a file called `software-and-guides.html` in `_src/` ends up inside the
`resources/` folder.

## No banner photo

Like the resources page this sits under, there is deliberately no photo across
the top. The `[page_head]` block still has an `image` setting, so if you ever
want one, drop a wide photo in `images/` and name it there.
