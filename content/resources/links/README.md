# Links page content

The wording on `/resources/links` is controlled from this folder. You do not
need to touch any HTML.

```
config.toml    all the text, and the four addresses
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
2. Find the setting — `map.html` tells you the name, e.g. `places.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py` from the top of the repository, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

## The cards

Each `[[places.place]]` block is one card.

| Setting | What it is |
|---|---|
| `icon` | A Font Awesome 4.7 name without the `fa-` prefix. Browse them at <https://fontawesome.com/v4/icons/> |
| `heading` | The name of the place |
| `access` | The small grey line under it — **who can actually get in** |
| `body` | What is stored there |
| `note` | An optional warning, shown in grey |
| `link`, `link_text` | Where the card goes, and what the link says |

Every card on this page opens in a new tab.

## Keep `access` honest

`access` is the thing people most want to know before clicking, and it is the
one setting on this page that can quietly become a lie. The old page was four
buttons with no indication that two of them would turn most visitors away, which
is the problem this line exists to fix.

- **Google Drive** and **GitLab** are invitation-only. Nobody is added
  automatically when they join the team — somebody has to do it.
- **GitHub** is public to read.
- **Subversion** is the pre-Git archive. It is served over plain `http` and is
  the most likely of the four to stop answering; if it does, say so here rather
  than leaving people clicking a dead link.

If access to one of these changes, change the line.

## GitHub was added in the rebuild

The old page listed three places: Drive, GitLab and Subversion. GitHub was
added because it is where the Arduino libraries linked from the parts reference
and the ROS setup guides actually live, and people were arriving here looking
for it. If that is not wanted, delete the whole `[[places.place]]` block — the
site links to it from the footer regardless.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/links.html` and its styling in
`assets/css/site.css`. That source is also where the page's address is set —
`output: resources/links.html` in the comment at the top — which is how a file
called `links.html` in `_src/` ends up inside the `resources/` folder.

## No banner photo

Like the resources page this sits under, there is deliberately no photo across
the top. The `[page_head]` block still has an `image` setting, so if you ever
want one, drop a wide photo in `images/` and name it there.
