# Pumpkin chunkin scoreboard content

Everything you can *read* on the scoreboard page (`/pumpkin`) is controlled from
this folder. You do not need to touch any HTML.

```
config.toml    all the wording, and how to read the scoring sheet
map.html       a guide showing what goes where  <- open this first
```

There is no `images/` folder: the page has no photos on purpose. Someone reading
it is standing in the field waiting for the next throw, and a banner photo would
push the numbers off the first screen of their phone.

## The scores are not in this repository

**This is the one page whose contents do not live here.** The numbers come out
of the team's pumpkin chunkin scoring **Google Sheet**, read live by the
visitor's browser each time the page loads. Type a throw into that sheet at the
field and it is on the page about a minute later — nothing to rebuild, nothing
to commit, nothing to deploy.

So there are two completely separate jobs:

| What you want to change | Where you do it |
|---|---|
| A score, a team, a round | **The scoring sheet.** Not this folder, and not this repository |
| The words around the table | `config.toml` here, then `./build.py` |
| Which sheet is read, and whether the header button shows | `content/site/config.toml` |

Ask a team officer for the sheet if you do not have it — its address is
deliberately kept in `content/site/config.toml` rather than written down here,
so there is one place to change it.

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every block of
text on the page in the order it appears and names the setting behind each one.
It is generated from the real page, so it can never be out of date.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `board.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## What the settings do

| Block | What it controls |
|---|---|
| `[page_head]` | The band at the top: the eyebrow, the heading, the sentence under it |
| `[board]` | The band the table sits in, and the small print under it |
| `[sheet]` | **How the sheet is read** — see below |
| `[table]` | The two column headings the sheet does not supply, and the overthrow wording |
| `[podium]` | The leader cards above the table. `show = false` turns them off |
| `[messages]` | Everything the page says when there is no table to show |

## Turning the scoreboard on and off

This is done **in the sheet, not here.** Put a cell reading `Visible` with
`TRUE` or `FALSE` beside it — a single cell saying `Visible: TRUE` works too,
and `Visable` is accepted because that is how the sheet has it.

- **TRUE** — a **Pumpkin** button appears in the header of every page, and this
  page shows the table.
- **FALSE**, or no such cell at all — the button is not there, and this page
  says the scoreboard is closed (the `hidden_*` settings under `[messages]`).

No rebuild, no commit, no deploy. Change the cell, then load any page of the
site and it is already right. A page you already have open does not change on
its own — the header is worked out as a page loads, so refresh it.

**That flag hides the button, not the numbers.** The sheet has to be readable by
anyone or the page could not read it either, the sheet's address is in the page
source, and `/pumpkin` stays at that address for anyone who kept the link. Do
not put anything in that sheet that would matter if a stranger read it.

## Adding teams and rounds

Also a job in the sheet. The page finds its way around by looking for the labels
down the left-hand column, not by counting rows and columns, which is what lets
this work with nothing changed here:

- **Teams.** Add or delete rows freely. Every row under the `Team` label with a
  name in the first column is a team. Blank rows and any working-out kept below
  the table are ignored.
- **Rounds.** Each round is a column *pair* — what was thrown, then the points
  it earned. Add the pair and fill in the `Rnd Type:` and `Rnd Dist:` rows above
  it, and a new column appears on the page on its own.
- **Total.** The column between the team names and the first round. Left empty,
  the page adds the rounds up itself rather than showing a blank.

The `[sheet]` block here holds the labels it looks for (`type_row_label`,
`target_row_label`, `team_row_label`) — change those only if somebody renames
them in the sheet. It also sets `unit` (written after each round's distance),
`refresh_seconds` (60 is a good live setting; Google caches the sheet for a
couple of minutes, so under about 30 gets you nothing fresher),
`highlight_top` (how many leaders to mark), and `low_score_wins` (leave `false`
unless the scoring is ever changed so the lowest total wins).

## Before an event

Read the `[messages]` block through once. Every setting in it is a state the
page can genuinely end up in — still loading, could not reach the sheet, read
fine but nobody scored yet, no sheet set at all, and the closed-for-the-season
state — and the field is a bad place to discover the wording is wrong.

## Things that are not in this folder

The sheet's address, the tab to read, and the header button's label are in
`content/site/config.toml`, because the button needs them on **every** page, not
just this one. That file explains itself at the top; there is a `README.md`
beside it too.

The top navigation and the footer are shared by every page on the site and live
in `_partials/header.html` and `_partials/footer.html`.

The page's layout is in `_src/pumpkin.html`, its styling in
`assets/css/site.css`, and the code that actually reads the sheet, builds the
table and sorts it is in `assets/js/site.js`. You only need those if you want to
change the structure of the page rather than what it says.
