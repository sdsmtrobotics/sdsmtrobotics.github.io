# Settings every page shares

```
config.toml    the handful of things the header and footer show on EVERY page
```

**This is not a page.** It is the one folder under `content/` that does not
build anything of its own — no `images/`, no `map.html`, no
`_src/site.html`. Its settings arrive in every template under `site`, so
`{{site.year}}` in the footer and `{{site.scoreboard.nav_label}}` in the header
read from here.

**Almost nothing belongs in this file.** Each page's own words go in its own
`content/<page>/config.toml`. This is only for what a single page's config could
not decide, because every page has to agree on it.

Change anything here and **run `./build.py`** — it rebuilds all 69 generated
pages, because every one of them uses it.

> `site` is a reserved name. A page config with its own `[site]` table would
> shadow this file for that page.

## The year in the footer

```toml
year = 2026
```

Every page's footer ends with "© *year* Rocker Robotics Team". **Change it once
each January**, then run `./build.py` and commit.

It is here because all of the pages have to agree on it. It used to be typed
into each page's source separately, which is how the album and news-post pages
ended up showing no year at all.

One trap: this line sits **above** the first `[table]` in the file on purpose. A
bare key written below one belongs to that table, not to the file — move `year`
under `[scoreboard]` and the footer loses it.

## The scoreboard button

The `[scoreboard]` block is what puts the **Pumpkin** button in the header.

| Setting | What it is |
|---|---|
| `sheet_url` | The pumpkin chunkin scoring **Google Sheet**. Empty `""` and the button never appears |
| `gid` | Which tab of that workbook holds the scores. Empty for the first tab |
| `nav_label` | What the button says |
| `nav_link` | Where it goes — `/pumpkin` |

**The sheet link.** Either kind works: the normal share link from the Share
button, as long as the sheet is shared with "Anyone with the link — Viewer", or
the link from *File → Share → Publish to the web*. Ask a team officer for the
sheet if you do not have it. For `gid`, open the tab in Google Sheets and copy
the number after `gid=` in the address bar.

Leaving `sheet_url = ""` is the right state in the off-season: the button never
appears and the scoreboard page says it is not set up yet.

**Turning the button on and off during a season is done in the sheet, not
here.** Put a cell reading `Visible` with `TRUE` or `FALSE` beside it. TRUE and
the button appears on every page; FALSE, or no such cell at all, and it does
not. Nothing needs rebuilding and nothing needs committing — change the cell,
then load any page of the site and it is already right. A page already open in
front of you does not change by itself; the header is worked out as a page
loads, so refresh it.

**Be clear about what that flag does.** It hides the *button*, not the numbers.
The scoreboard page is still at `/pumpkin` for anyone who knows the address, and
the sheet's own address is in the page source, because the visitor's browser is
what fetches it. Do not put anything in that sheet that would matter if a
stranger read it.

`nav_label` is worth dating during the event — "2026 Pumpkin" tells a visitor
the numbers are current. Changing the label **does** need `./build.py`, unlike
the on/off switch.

## Things that are not in this file

The scoreboard page's own wording — the headings, the column names, and
everything it says when there is no table — is in `content/pumpkin/config.toml`,
which has a `README.md` beside it.

The markup these settings feed is in `_partials/header.html` (the button) and
`_partials/footer.html` (the year). The button ships hidden and
`assets/js/site.js` reveals it after reading the sheet, so that a visitor whose
browser cannot reach Google sees the site exactly as it was served: no button.
