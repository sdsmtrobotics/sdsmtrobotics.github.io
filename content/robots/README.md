# Robots page content

Everything you can see on the robots page (`/projects`) is controlled from this
folder. You do not need to touch any HTML.

```
config.toml    all the text, and which photo goes in each spot
images/        the photos for this page
map.html       a guide showing what goes where  <- open this first
```

## Start here

Open **`map.html`** in a web browser (double-click it). It lists every photo and
every piece of text on the page, in the order they appear, and tells you the
exact setting name to change for each one. It is generated from the real page,
so it can never be out of date.

## Adding a new robot

This is the job you will do most often. At the end of a season:

1. Write the robot's own page in `content/projects/`: copy one of the folders in
   there, rename it after the address you want (`/projects/sumobot-2026` comes
   from `content/projects/sumobot-2026/`), and replace its words and photos. See
   `content/projects/README.md`.
2. Put a photo of the robot in `images/` **here**, named after the robot
   (`sumobot-2026.jpg`, not `IMG_4471.jpg`). This is separate from the photos
   inside the write-up.
3. Open `config.toml` and copy a whole `[[robots.card]]` block.
4. Paste it **above** the others — the page runs newest first — and edit it,
   pointing `link` at `/projects/<folder name>`.
5. Run `./build.py` from the top of the repository, then commit.

Each card has these settings:

| Setting | What it is |
|---|---|
| `name` | The robot's name, shown as the card heading |
| `tag` | The small gold label in the corner of the photo |
| `category` | Which filter button shows this card (see below) |
| `years` | The date line under the name |
| `blurb` | The description. Links and basic HTML are allowed |
| `image` | Filename in `images/`. Leave `""` for a placeholder |
| `link` | The write-up page the card opens. Leave `""` for none |
| `link_text` | The words on the link at the bottom of the card |

**A robot with no write-up yet.** Leave `link = ""` and the card shows its
`link_text` as plain grey text instead of a dead link. Leave `image = ""` and it
shows a navy "photos coming soon" panel instead of a photo. The RoboSub card at
the top of the list is set up that way — fill both in once there is a page and a
photo for it.

## The filter buttons

The row of buttons above the cards comes from the `[[robots.filter]]` blocks.
Each button shows only the robots whose `category` matches its `value`, and the
one with `value = ""` shows everything.

If you add a robot in a brand new category, **add a button for it too**, or its
card will only ever appear under "All robots".

The buttons need JavaScript. With JavaScript off they are hidden altogether and
the page shows the complete list, which is how it worked before the filters
existed — so nothing is ever unreachable.

## Changing text

1. Open `config.toml` in any text editor.
2. Find the setting — `map.html` tells you the name, e.g. `robots.heading`.
3. Change the text between the quote marks.
4. Save, run `./build.py`, and commit.

You can use basic HTML in any text: `<strong>bold</strong>`, `<em>italics</em>`,
`<br>` for a line break, and `<a href="...">links</a>`. Quote marks inside a
setting have to be escaped as `\"`, which is why the links in the blurbs look
the way they do.

## Changing a photo

1. Put the new photo in the `images/` folder.
2. In `config.toml`, set that card's `image` to the new filename.
3. Run `./build.py` and commit.

**Photo sizes.** The banner at the top stretches the full width of the screen,
so it wants a wide landscape photo, ideally 1900px or wider. The card photos are
shown in a 16:10 box and cropped to fit, so around 1200px wide is plenty —
bigger just makes the page slower to load. `map.html` shows the current size of
every photo, and flags any that are missing.

## Things that are not in this folder

The top navigation and the footer are shared by every page on the site, so they
are not here. They live in `_partials/header.html` and `_partials/footer.html`
at the top of the repository.

The page's layout lives in `_src/projects.html`, its styling in
`assets/css/site.css`, and the filter buttons' behaviour in `assets/js/site.js`.
You only need those if you want to change the structure of the page rather than
what it says.

The individual robot write-ups the cards link to are one folder over, in
`content/projects/` — one folder per robot, each with its own `config.toml` and
`images/`, all built by one shared page source, `_src/robot.html`. That folder
has its own `README.md`.

The cards on this page and the pages they open are two separate sets of words,
so keep each robot's `name`, `years` and `blurb` here in step with the `name`,
`years` and `intro` in `content/projects/<robot>/config.toml`. Nothing checks
that they agree.
