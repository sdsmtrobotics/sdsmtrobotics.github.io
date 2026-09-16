# Calendar page content

The wording on the calendar page (`/calendar`) is controlled from this folder.
You do not need to touch any HTML.

```
config.toml    all the text, and the calendar settings
images/        photos for this page (currently empty - the page uses none)
map.html       a guide showing what goes where  <- open this first
```

## The events are not in this folder

This is the important thing to know about this page, and it is different from
every other page on the site.

**To add, move, or cancel an event, edit the team's Google Calendar.** Nothing
in this repository lists the events. Both the grid in the middle of the page
and the "Next up" list beside it read the calendar live, so a change you make
in Google Calendar appears on the site within a minute or two, with no
rebuild and no commit.

The calendar is `robotics@mines.sdsmt.edu`, and it has to stay **public** for
any of this to work. If the page ever goes blank, the first thing to check is
that the calendar is still shared publicly: in Google Calendar, open Settings
for it, then "Access permissions for events", and confirm **Make available to
public** is ticked.

Because it is public, treat every event as readable by anyone. Do not put door
codes, personal phone numbers, or anything else private in an event title,
location, or description.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `meet.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py`, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`.

The meeting times in the "The weekly rhythm" card are typed out by hand in
`config.toml`, under `meet.card`. They are **not** read from the calendar, so
when the term's schedule changes, update them here as well as in Google
Calendar. The same times also appear on the landing page and the about page,
in `content/landing/config.toml` and `content/about/config.toml`.

## No banner photo

Unlike the other sub-pages, this one deliberately has no photo across the top.
The calendar is what people come to this page for, and a banner would push it
off the first screen. The `[page_head]` block is still there and still has an
`image` setting, so if you ever do want one, drop a wide photo in `images/`
and name it there — the layout will pick it up like any other page.

## The Google API key

The "Next up" list asks Google for the team's events, and Google wants an API
key with the question. That key is in `config.toml`, under `upcoming.api_key`.

To replace the key, change it in `config.toml` and run `./build.py`. That file
is the only place in the repository it appears.

## If the "Next up" list is empty

The list is built in the browser, and it is deliberately allowed to fail
quietly — the grid above it is the complete schedule on its own, so a broken
list never leaves the page without its content.

| What you see | What it usually means |
|---|---|
| "Loading the next few events…" and it never changes | JavaScript is off, or `site.js` failed to load |
| "The next few events could not be loaded" | The key is wrong, over quota, or restricted to the wrong domain |
| "Nothing on the calendar right now" | Google answered fine; there genuinely are no upcoming events |

The middle one is the common case after somebody restricts the key. Check that
the referrer restriction is `sdsmtrobotics.github.io/*` — a rule for the wrong
domain rejects the site's own requests. Note that the list will also fail on
`localhost` once the key is restricted, because localhost is not the allowed
domain. That is expected, and only affects local previews.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/calendar.html`, its styling in
`assets/css/site.css`, and the "Next up" list's behaviour in
`assets/js/site.js`. You only need those if you want to change the structure of
the page rather than what it says.
