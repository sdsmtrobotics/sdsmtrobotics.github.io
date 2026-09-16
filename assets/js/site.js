/* Rocker Robotics - site behaviour. No dependencies. */
(function () {
  'use strict';

  /* ---- mobile nav ------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // close when a link is chosen, or on Escape
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { close(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  /* ---- header lifts off the page once you scroll ----------------------- */
  // The header is always solid; this only adds the drop shadow, so it reads as
  // floating above the content rather than sitting flat at the top.
  var header = document.getElementById('site-header');

  if (header) {
    var shadow = function () {
      header.classList.toggle('is-stuck', window.scrollY > 4);
    };
    shadow();
    window.addEventListener('scroll', shadow, { passive: true });
  }

  /* ---- robots and news pages: filter the card grid --------------------- */
  // Progressive enhancement. The markup ships every card; this only hides the
  // ones that do not match. site.css keeps the button bar hidden until we get
  // here, so with JS off the page is still the complete list.
  var bar = document.querySelector('[data-filter-bar]');
  var target = document.querySelector('[data-filter-target]');

  if (bar && target) {
    // what the running count calls the things it is counting
    var noun = bar.dataset.filterNoun || 'items';
    var pills = bar.querySelectorAll('[data-filter]');
    var count = bar.querySelector('[data-filter-count]');
    var empty = document.querySelector('[data-filter-empty]');
    var reset = document.querySelector('[data-filter-reset]');
    var cards = target.querySelectorAll('[data-category]');
    var total = cards.length;

    var apply = function (value) {
      var shown = 0;

      cards.forEach(function (card) {
        var match = !value || card.dataset.category === value;
        card.hidden = !match;
        if (match) { shown++; }
      });

      pills.forEach(function (pill) {
        pill.setAttribute('aria-pressed', String(pill.dataset.filter === value));
      });

      if (count) {
        count.textContent = shown === total
          ? 'Showing all ' + total + ' ' + noun
          : 'Showing ' + shown + ' of ' + total + ' ' + noun;
      }
      if (empty) { empty.hidden = shown > 0; }
    };

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () { apply(pill.dataset.filter); });
    });
    if (reset) {
      reset.addEventListener('click', function () { apply(''); });
    }

    apply('');
  }

  /* ---- calendar page: the next few events ------------------------------ */
  // Progressive enhancement, like the filter bars above: the grid beside this
  // list is the complete schedule on its own, so if any of this fails we leave
  // the note the page shipped with and change nothing else.
  //
  // The API key this reads is public by necessity - it travels to every
  // visitor as part of the page, and Google's browser keys are designed that
  // way. It is kept safe by being restricted, in the Google Cloud console, to
  // this site's domain and to the Calendar API alone. See the long note in
  // content/calendar/config.toml before touching it.
  var side = document.querySelector('[data-upcoming]');

  if (side && window.fetch) {
    var list = side.querySelector('[data-upcoming-list]');
    var note = side.querySelector('[data-upcoming-note]');
    var zone = side.dataset.timezone || 'America/Denver';

    var say = function (message) {
      if (note) { note.textContent = message; }
    };

    // Google wants an RFC3339 timestamp. Midnight today in UTC is close
    // enough: an event earlier today is still worth listing.
    var since = new Date();
    since.setUTCHours(0, 0, 0, 0);

    var url = 'https://www.googleapis.com/calendar/v3/calendars/'
      + encodeURIComponent(side.dataset.calendarId) + '/events'
      + '?key=' + encodeURIComponent(side.dataset.apiKey)
      + '&timeMin=' + encodeURIComponent(since.toISOString())
      + '&maxResults=' + encodeURIComponent(side.dataset.count || 6)
      + '&singleEvents=true&orderBy=startTime';

    // An all-day event arrives as a plain "2026-09-12" with no time or zone.
    // Reading that with Date() would parse it as UTC midnight, which is the
    // evening before in Denver, so every all-day event would show a day early.
    // Splitting it into a local date keeps the date Google actually meant.
    var readStart = function (start) {
      if (start.dateTime) {
        return { at: new Date(start.dateTime), allDay: false };
      }
      if (start.date) {
        var p = start.date.split('-');
        return { at: new Date(+p[0], +p[1] - 1, +p[2]), allDay: true };
      }
      return null;
    };

    // An all-day date has no meaningful time of day, so it must be formatted
    // in the reader's own zone - forcing it into the calendar's would shift it
    // back off the date again.
    var fmt = function (options, allDay) {
      if (!allDay) { options.timeZone = zone; }
      try {
        return new Intl.DateTimeFormat('en-US', options);
      } catch (e) {
        return null;
      }
    };

    var part = function (formatter, date, fallback) {
      return formatter ? formatter.format(date) : fallback;
    };

    var row = function (event) {
      var start = readStart(event.start || {});
      if (!start || !event.summary) { return null; }

      var li = document.createElement('li');

      var chip = document.createElement('span');
      chip.className = 'event-date';

      var day = document.createElement('span');
      day.className = 'event-day';
      day.textContent = part(fmt({ day: 'numeric' }, start.allDay),
                             start.at, String(start.at.getDate()));

      var month = document.createElement('span');
      month.className = 'event-month';
      month.textContent = part(fmt({ month: 'short' }, start.allDay), start.at, '');

      chip.appendChild(day);
      chip.appendChild(month);

      var body = document.createElement('span');
      body.className = 'event-body';

      var name = document.createElement('span');
      name.className = 'event-name';
      // textContent, never innerHTML: this is somebody's calendar entry, and
      // an event titled with a stray "<" should read as a "<", not as markup.
      name.textContent = event.summary;

      var when = document.createElement('span');
      when.className = 'event-when';
      when.textContent = start.allDay
        ? part(fmt({ weekday: 'long' }, true), start.at, 'All day') + ' \u00b7 all day'
        : part(fmt({ weekday: 'long' }, false), start.at, '') + ' \u00b7 '
          + part(fmt({ hour: 'numeric', minute: '2-digit' }, false), start.at, '');

      body.appendChild(name);
      body.appendChild(when);
      li.appendChild(chip);
      li.appendChild(body);
      return li;
    };

    fetch(url)
      .then(function (response) {
        if (!response.ok) { throw new Error('calendar responded ' + response.status); }
        return response.json();
      })
      .then(function (data) {
        var rows = (data.items || []).map(row).filter(Boolean);

        if (!rows.length) {
          say(side.dataset.none);
          return;
        }
        rows.forEach(function (li) { list.appendChild(li); });
        list.hidden = false;
        if (note) { note.remove(); }
      })
      .catch(function () {
        say(side.dataset.failed);
      });
  }

  /* ---- album lightbox -------------------------------------------------- */
  // Progressive enhancement, like the filter bars above. Every tile in the
  // grid ships as a plain link to the photo, so with JS off - or if anything
  // here throws - choosing one still opens it. This only intercepts the click
  // and shows the photo in an overlay instead, which is what lets a visitor
  // step through the album without going back and forward.
  var grid = document.querySelector('[data-lightbox]');
  var tiles = grid ? Array.prototype.slice.call(grid.querySelectorAll('.photo')) : [];

  if (tiles.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', (grid.dataset.lightbox || 'Album') + ' photographs');
    if (tiles.length < 2) { box.setAttribute('data-single', ''); }
    box.innerHTML =
      '<div class="lightbox-stage"><img alt=""></div>' +
      '<div class="lightbox-bar">' +
        '<p class="lightbox-count"></p>' +
        '<p class="lightbox-caption"></p>' +
      '</div>' +
      '<button class="lightbox-prev" type="button" aria-label="Previous photo">' +
        '<i class="fa fa-angle-left" aria-hidden="true"></i></button>' +
      '<button class="lightbox-next" type="button" aria-label="Next photo">' +
        '<i class="fa fa-angle-right" aria-hidden="true"></i></button>' +
      '<button class="lightbox-close" type="button" aria-label="Close">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>';
    document.body.appendChild(box);

    var stage = box.querySelector('.lightbox-stage img');
    var caption = box.querySelector('.lightbox-caption');
    var count = box.querySelector('.lightbox-count');
    var prev = box.querySelector('.lightbox-prev');
    var next = box.querySelector('.lightbox-next');
    var close = box.querySelector('.lightbox-close');
    var at = 0;
    var opener = null;

    var show = function (n) {
      at = (n + tiles.length) % tiles.length;      // wrap at either end
      var tile = tiles[at];
      var photo = tile.querySelector('img');
      stage.src = tile.href;
      // the tile's alt already falls back to "<album>, photo 3" when the
      // photo has no caption of its own, so it is never empty
      stage.alt = photo ? photo.alt : '';
      caption.textContent = tile.dataset.caption || '';
      count.textContent = (at + 1) + ' of ' + tiles.length;
    };

    var open = function (n, from) {
      opener = from || null;
      show(n);
      box.classList.add('is-open');
      document.body.classList.add('has-lightbox');
      // the overlay is visibility:hidden until that class lands, and a hidden
      // element cannot take focus - so make the browser apply the style first,
      // or focus stays on the tile behind and a screen reader never enters the
      // dialog. Reading a layout property forces that; requestAnimationFrame
      // would too, but not in a background tab, where it does not run at all.
      void box.offsetWidth;
      close.focus();
    };

    var shut = function () {
      box.classList.remove('is-open');
      document.body.classList.remove('has-lightbox');
      // put the reader back where they were rather than at the top of the page
      if (opener) { opener.focus(); }
      opener = null;
    };

    tiles.forEach(function (tile, n) {
      tile.addEventListener('click', function (e) {
        // let a modified click do what the visitor asked - open in a new tab,
        // save the photo - rather than swallowing it into the overlay
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) { return; }
        e.preventDefault();
        open(n, tile);
      });
    });

    prev.addEventListener('click', function () { show(at - 1); });
    next.addEventListener('click', function () { show(at + 1); });
    close.addEventListener('click', shut);

    // anywhere off the photo itself closes, which is what the backdrop is for
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox-stage')) { shut(); }
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) { return; }
      if (e.key === 'Escape') { shut(); }
      else if (e.key === 'ArrowLeft') { show(at - 1); }
      else if (e.key === 'ArrowRight') { show(at + 1); }
      else if (e.key === 'Tab') {
        // the overlay covers the page, so keep Tab inside it: the rest of the
        // document is still there underneath and must not be reachable
        var stops = tiles.length < 2 ? [close] : [prev, next, close];
        var i = stops.indexOf(document.activeElement);
        e.preventDefault();
        stops[(i + (e.shiftKey ? -1 : 1) + stops.length) % stops.length].focus();
      }
    });
  }

  /* ---- pumpkin chunkin scoreboard -------------------------------------- */
  // Two things read the same view-only Google Sheet: the button in the header,
  // which is only there while the sheet says it should be, and the scoreboard
  // page itself. Both go through readSheet() below, so a visit to /pumpkin
  // fetches the sheet once, not twice.
  //
  // None of this is a lock. The sheet has to be readable by anyone or the page
  // could not read it either, and its address ships in the page source. The
  // Visible cell decides whether the team is SHOWING the scoreboard, not
  // whether the numbers could be found by somebody determined to find them.
  // Nothing belongs in that sheet that would matter if a stranger read it.

  var sheets = {};                       // url -> in-flight or settled fetch
  var FLAG_TTL = 120000;                 // how long the header trusts a flag

  // A pasted link comes in one of two shapes and neither can be fetched as it
  // stands: the Share link ends in /edit, and the Publish-to-the-web one is a
  // different document id altogether. Turn either into the CSV endpoint.
  function sheetCsvUrl(link, gid) {
    if (!link) { return ''; }
    var tail = gid ? '&gid=' + encodeURIComponent(gid) : '';
    var published = link.match(/\/spreadsheets\/d\/e\/([^/?#]+)/);
    if (published) {
      return 'https://docs.google.com/spreadsheets/d/e/' + published[1]
        + '/pub?single=true&output=csv' + tail;
    }
    var shared = link.match(/\/spreadsheets\/d\/([^/?#]+)/);
    return shared
      ? 'https://docs.google.com/spreadsheets/d/' + shared[1] + '/gviz/tq?tqx=out:csv' + tail
      : '';
  }

  // RFC 4180 by hand. Splitting on commas would tear "Douglas High School, WY"
  // in half, and a note typed into a cell can carry a line break of its own.
  function parseCsv(text) {
    var rows = [], row = [], field = '', quoted = false, i = 0;
    text = text.replace(/^\uFEFF/, '');   // Sheets sends a byte order mark

    while (i < text.length) {
      var c = text.charAt(i);
      if (quoted) {
        if (c !== '"') { field += c; i++; continue; }
        if (text.charAt(i + 1) === '"') { field += '"'; i += 2; continue; }
        quoted = false; i++; continue;
      }
      if (c === '"') { quoted = true; i++; }
      else if (c === ',') { row.push(field); field = ''; i++; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; }
      else if (c === '\r') { i++; }
      else { field += c; i++; }
    }
    if (field || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function cell(rows, r, c) {
    return rows[r] && rows[r][c] != null ? String(rows[r][c]).trim() : '';
  }

  // "245", "1,205 ft", "120'" - the number a cell is really carrying.
  function numberIn(text) {
    var m = String(text == null ? '' : text).replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }

  var YES = /^(true|yes|y|on|1|live|show|shown|open|visible)$/;
  var NO = /^(false|no|n|off|0|hidden|hide|closed)$/;
  // "Visible" and "Visable" both, because the sheet has been spelled both ways
  // and a scoreboard should not go dark over a typo.
  var FLAG = /^vis[ai]ble\s*[:=]?\s*(.*)$/i;

  // The switch can be written any of the ways somebody would naturally write
  // it: all in one cell, or the word with the answer beside it or under it.
  // Returns what it found and where, because those cells have to come back out
  // of the grid before anything counts rows - the flag sits in the first
  // column, which is exactly where a team name goes.
  function readFlag(rows) {
    for (var r = 0; r < rows.length; r++) {
      for (var c = 0; c < (rows[r] || []).length; c++) {
        var m = cell(rows, r, c).match(FLAG);
        if (!m) { continue; }

        var value = m[1].trim();
        var at = [[r, c]];

        for (var n = c + 1; !value && n < rows[r].length; n++) {
          if (cell(rows, r, n)) { value = cell(rows, r, n); at.push([r, n]); }
        }
        if (!value && cell(rows, r + 1, c)) {
          value = cell(rows, r + 1, c);
          at.push([r + 1, c]);
        }

        value = value.toLowerCase();
        // anything we cannot read as a yes is treated as a no: an unfinished
        // or misspelt answer should leave the scoreboard closed, not open it
        return { visible: YES.test(value) ? true : NO.test(value) ? false : null, cells: at };
      }
    }
    return { visible: null, cells: [] };
  }

  function readSheet(url, fresh) {
    if (fresh) { delete sheets[url]; }

    if (!sheets[url]) {
      sheets[url] = fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + '_=' + Date.now(),
                          { cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) { throw new Error('sheet responded ' + response.status); }
          return response.text();
        })
        .then(function (text) {
          var rows = parseCsv(text);
          var flag = readFlag(rows);
          flag.cells.forEach(function (at) { rows[at[0]][at[1]] = ''; });
          return { rows: rows, visible: flag.visible };
        });
      // a failed fetch must not be remembered, or the Refresh button and the
      // timer would both hand back the same old failure for the rest of the day
      sheets[url].catch(function () { delete sheets[url]; });
    }
    return sheets[url];
  }

  /* ---- the button in the header ---------------------------------------- */
  // It ships hidden, so a visitor with no JavaScript, or one whose browser
  // cannot reach the sheet, sees the site exactly as it was served: no button.

  var navLink = document.querySelector('[data-scoreboard-link]');

  if (navLink && window.fetch) {
    var navUrl = sheetCsvUrl(navLink.dataset.sheet, navLink.dataset.gid);

    if (navUrl) {
      // What the last page in this visit worked out. Trusted only when it says
      // the scoreboard is open, and only to decide what to paint FIRST - so
      // clicking through the site does not make the button flash in and out on
      // every page while the sheet is being fetched again.
      var remembered = false;
      try {
        var saved = JSON.parse(sessionStorage.getItem('rr-scoreboard') || 'null');
        remembered = !!saved && saved.url === navUrl
          && Date.now() - saved.at < FLAG_TTL && saved.visible === true;
      } catch (e) { remembered = false; }

      navLink.hidden = !remembered;

      // Then ask anyway, on every single page, and let the answer win. The
      // whole point of the cell is that somebody flips it in the middle of an
      // event and then refreshes to watch the button appear - a remembered
      // "no" outliving that flip is indistinguishable from a broken site.
      readSheet(navUrl).then(function (sheet) {
        var open = sheet.visible === true;
        try {
          sessionStorage.setItem('rr-scoreboard', JSON.stringify(
            { url: navUrl, visible: open, at: Date.now() }));
        } catch (e) { /* private window - we will just ask again next page */ }
        navLink.hidden = !open;
      }).catch(function () { /* no answer, so leave it as it was painted */ });
    }
  }

  /* ---- the scoreboard page --------------------------------------------- */

  var board = document.querySelector('[data-scoreboard]');

  if (board && window.fetch) {
    var url = sheetCsvUrl(board.dataset.sheet, board.dataset.gid);
    var status = board.querySelector('[data-scoreboard-status]');
    var closed = board.querySelector('[data-scoreboard-closed]');
    var podium = board.querySelector('[data-scoreboard-podium]');
    var podiumList = board.querySelector('[data-scoreboard-podium-list]');
    var host = board.querySelector('[data-scoreboard-table]');
    var foot = board.querySelector('[data-scoreboard-foot]');
    var stamp = board.querySelector('[data-scoreboard-updated]');
    var refresh = board.querySelector('[data-scoreboard-refresh]');

    var unit = board.dataset.unit || '';
    var prefix = board.dataset.threwPrefix || '';
    var pointsLabel = board.dataset.pointsLabel || '';
    // The sheet's DQ column: its heading, what the page prints in place of a
    // disqualified team's total, and which answer in that column means the
    // team is out. The sheet is written with FALSE against a team that is
    // out, so that is the default - config.toml can flip it if the column is
    // ever turned round, without anybody editing this file.
    var dqColumn = (board.dataset.dqColumn || '').trim();
    var dqText = (board.dataset.dqText || 'DQ').trim() || 'DQ';
    var dqOutWhen = YES.test(String(board.dataset.dqOut || 'false').trim().toLowerCase());
    // build.py writes a config.toml boolean out as True / False
    var lowWins = /^true$/i.test(board.dataset.lowWins || '');
    var wantPodium = /^true$/i.test(board.dataset.podium || '');
    var highlight = Math.max(0, parseInt(board.dataset.highlight, 10) || 0);
    var every = Math.max(0, parseInt(board.dataset.refresh, 10) || 0) * 1000;

    var columns = [];
    var entries = [];
    var sortAt = 1;                      // which column is being sorted on
    var sortDir = lowWins ? 1 : -1;      // 1 ascending, -1 descending
    var loadedAt = 0;

    var say = function (text) {
      // only when it actually changes: this is a live region, and rewriting it
      // with the same sentence every minute makes a screen reader say it again
      if (status && status.innerHTML !== text) { status.innerHTML = text; }
    };

    /* -- making sense of the sheet --------------------------------------- */

    var isMarker = function (text, label) {
      var tidy = function (s) { return String(s || '').trim().replace(/:$/, '').toLowerCase(); };
      return !!tidy(label) && tidy(text) === tidy(label);
    };

    // Is this team out? Only a cell that actually reads as the disqualifying
    // answer counts. A blank cell is a team nobody has ruled on yet, and a
    // cell nobody can read is a typo - neither is grounds for printing DQ
    // beside somebody's name, so both leave the team in.
    var isOut = function (text) {
      var value = String(text == null ? '' : text).trim().toLowerCase();
      if (!value) { return false; }
      // somebody writing "DQ" into the column instead of the TRUE/FALSE it
      // asks for has still said exactly what they meant
      if (value === dqText.toLowerCase()) { return true; }
      if (YES.test(value)) { return dqOutWhen; }
      if (NO.test(value)) { return !dqOutWhen; }
      return false;
    };

    // Which column is the DQ one. It is found by its heading rather than by
    // counting, like everything else here, so it can be moved or a round can
    // be added beside it without this changing. The first column is skipped:
    // that is where the team names are, and a team could be called anything.
    var findDq = function (rows) {
      if (!dqColumn) { return -1; }
      for (var r = 0; r < rows.length; r++) {
        for (var c = 1; c < (rows[r] || []).length; c++) {
          if (isMarker(cell(rows, r, c), dqColumn)) { return c; }
        }
      }
      return -1;
    };

    // Only the written-out booleans, never 1 and 0: a round nobody has scored
    // yet is a column of zeros, and that must not be mistaken for a column of
    // rulings. This is deliberately stricter than the TRUE/FALSE the cells are
    // then READ with, which is forgiving on purpose.
    var BOOLEAN = /^(true|false|yes|no|y|n)$/;

    // The heading is how the column is meant to be found, but it has been
    // added to the sheet without one - so when there is no heading to find,
    // look for a spare column, outside the rounds, holding nothing but TRUE
    // and FALSE against the teams. No score ever looks like that, so there is
    // nothing else such a column could be. Put "DQ" in the heading row and the
    // search above finds it directly and this never runs.
    var guessDq = function (rows, shape) {
      var claimed = {};
      if (shape.total >= 0) { claimed[shape.total] = true; }
      shape.rounds.forEach(function (round) {
        claimed[round.thrown] = true;
        if (round.points >= 0) { claimed[round.points] = true; }
      });

      var width = 0;
      rows.forEach(function (row) { width = Math.max(width, (row || []).length); });

      for (var c = 1; c < width; c++) {
        if (claimed[c]) { continue; }
        var found = 0, only = true;
        for (var r = shape.from; r < rows.length && only; r++) {
          if (!cell(rows, r, 0)) { continue; }          // not a team's row
          var value = cell(rows, r, c).toLowerCase();
          if (!value) { continue; }                     // nobody ruled on yet
          if (BOOLEAN.test(value)) { found++; } else { only = false; }
        }
        if (only && found) { return c; }
      }
      return -1;
    };

    // The sheet is not a plain table: two heading rows across the top name each
    // round, and every round is a PAIR of columns - what the team threw, then
    // the points it earned. So the shape is read from the labels down the left
    // rather than by counting, which is what lets a round be added to the sheet
    // without anybody touching this file.
    var readRounds = function (rows) {
      var typeRow = -1, targetRow = -1, teamRow = -1;

      for (var r = 0; r < rows.length; r++) {
        var first = cell(rows, r, 0);
        if (typeRow < 0 && isMarker(first, board.dataset.typeLabel)) { typeRow = r; }
        else if (targetRow < 0 && isMarker(first, board.dataset.targetLabel)) { targetRow = r; }
        else if (teamRow < 0 && isMarker(first, board.dataset.teamLabel)) { teamRow = r; }
      }
      if (typeRow < 0) { return null; }

      var dqAt = findDq(rows);

      var starts = [];
      for (var c = 1; c < rows[typeRow].length; c++) {
        // the DQ column is not a round, whatever row its heading was typed
        // into - otherwise a column of TRUE and FALSE turns up in the table
        if (c !== dqAt && cell(rows, typeRow, c)) { starts.push(c); }
      }
      if (!starts.length) { return null; }

      var rounds = starts.map(function (c, i) {
        var next = c + 1;
        return {
          type: cell(rows, typeRow, c),
          target: targetRow < 0 ? '' : cell(rows, targetRow, c),
          thrown: c,
          // the next column is this round's points, unless the next round
          // starts there - then the round is a single column and the one
          // number in it is the score. The DQ column is not points either,
          // for a round that happens to sit right beside it.
          points: (starts[i + 1] === next || next === dqAt) ? -1 : next
        };
      });

      // the column between the names and the first round, where the sheet
      // keeps the running total - stepping back past the DQ column if that is
      // where somebody put it
      var total = starts[0] - 1;
      if (total === dqAt) { total -= 1; }

      var shape = {
        rounds: rounds,
        total: total > 0 ? total : -1,
        dq: dqAt,
        from: Math.max(typeRow, targetRow, teamRow) + 1
      };

      // no heading anywhere, so fall back to recognising the column by what
      // is in it - which needs the rest of the shape worked out first, to know
      // which columns are already spoken for
      if (shape.dq < 0) { shape.dq = guessDq(rows, shape); }
      return shape;
    };

    var readEntries = function (rows, shape) {
      var out = [];
      for (var r = shape.from; r < rows.length; r++) {
        var name = cell(rows, r, 0);
        // no name, no team. This is what steps over blank spacer rows and over
        // the working-out people keep in the columns below the table.
        if (!name) { continue; }

        var scores = shape.rounds.map(function (round) {
          var thrown = cell(rows, r, round.thrown);
          if (round.points < 0) { return { thrown: '', points: thrown }; }
          return { thrown: thrown, points: cell(rows, r, round.points) };
        });

        var total = shape.total < 0 ? '' : cell(rows, r, shape.total);
        if (numberIn(total) === null) {
          // the sheet's own total is missing or not a number, so add the
          // rounds up here rather than showing the team a blank
          var sum = 0, counted = 0;
          scores.forEach(function (s) {
            var n = numberIn(s.points);
            if (n !== null) { sum += n; counted++; }
          });
          total = counted ? String(sum) : '';
        }

        out.push({
          name: name,
          total: total,
          // judged out of the competition: the total is still read and still
          // sorted on, but the page prints DQ where the number would go
          dq: shape.dq >= 0 && isOut(cell(rows, r, shape.dq)),
          scores: scores,
          rank: 0
        });
      }
      return out;
    };

    // If the sheet is ever rebuilt into something this does not recognise, show
    // it as the plain table it then is rather than an empty page: the widest
    // row near the top is the headings, and every row under it with something
    // in the first column is a row of the table.
    var readPlain = function (rows) {
      var filled = function (row) {
        return (row || []).filter(function (c) { return String(c).trim(); }).length;
      };
      var head = -1, widest = 1;
      for (var r = 0; r < rows.length; r++) {
        if (filled(rows[r]) > widest) { widest = filled(rows[r]); head = r; }
      }
      if (head < 0) { return null; }

      var names = rows[head].map(function (c) { return String(c).trim(); });
      while (names.length && !names[names.length - 1]) { names.pop(); }
      if (names.length < 2) { return null; }

      var out = [];
      for (var i = head + 1; i < rows.length; i++) {
        if (!cell(rows, i, 0)) { continue; }
        out.push({
          name: cell(rows, i, 0),
          total: '',
          dq: false,
          scores: names.slice(1).map(function (ignored, c) {
            return { thrown: '', points: cell(rows, i, c + 1) };
          }),
          rank: 0
        });
      }
      return {
        columns: [{ kind: 'team', label: names[0] }].concat(
          names.slice(1).map(function (label, i) {
            return { kind: 'round', label: label, sub: '', at: i };
          })),
        entries: out
      };
    };

    /* -- ordering -------------------------------------------------------- */

    var valueAt = function (entry, i) {
      var column = columns[i];
      if (column.kind === 'team') { return entry.name; }
      // a disqualified team sinks to the bottom of the total column the same
      // way a team with nothing recorded does, whichever way it is sorted
      if (column.kind === 'total') { return entry.dq ? null : numberIn(entry.total); }
      return numberIn((entry.scores[column.at] || {}).points);
    };

    var order = function (i, dir) {
      return function (a, b) {
        var x = valueAt(a, i), y = valueAt(b, i);
        var emptyX = x === null || x === '', emptyY = y === null || y === '';
        // a team with nothing recorded yet sits at the bottom whichever way
        // round the column is sorted, rather than winning by default
        if (emptyX !== emptyY) { return emptyX ? 1 : -1; }
        if (emptyX) { return 0; }
        if (typeof x === 'string') {
          return String(x).localeCompare(String(y), 'en', { numeric: true }) * dir;
        }
        return (x - y) * dir;
      };
    };

    // Standing is always by total, never by whatever column the reader has
    // chosen to sort on - clicking "150 ft" should not hand somebody a medal.
    var rank = function () {
      var totalAt = 0;
      columns.forEach(function (c, i) { if (c.kind === 'total') { totalAt = i; } });
      if (!columns[totalAt] || columns[totalAt].kind !== 'total') {
        entries.forEach(function (e) { e.rank = 0; });
        return;
      }

      var by = order(totalAt, lowWins ? 1 : -1);
      var ranked = entries.slice().sort(by);
      var place = 0;

      ranked.forEach(function (entry, i) {
        // no place for a team that is out, even though its total is a real
        // number - which also keeps it off the podium, since that reads ranks
        if (entry.dq || numberIn(entry.total) === null) { entry.rank = 0; return; }
        // a tie shares a place, the way a scoreboard should read
        if (i === 0 || by(ranked[i - 1], entry) !== 0) { place = i + 1; }
        entry.rank = place;
      });
      entries = ranked;
    };

    /* -- drawing --------------------------------------------------------- */

    var headingCell = function (column, i) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.className = 'col-' + column.kind;
      if (i === sortAt) { th.setAttribute('aria-sort', sortDir < 0 ? 'descending' : 'ascending'); }

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'sort' + (i === sortAt ? ' is-sorted' : '');

      var label = document.createElement('span');
      label.className = 'sort-label';
      label.textContent = column.label;
      button.appendChild(label);

      if (column.sub) {
        var sub = document.createElement('span');
        sub.className = 'sort-sub';
        sub.textContent = column.sub;
        button.appendChild(sub);
      }

      button.addEventListener('click', function () {
        // same column again turns it round; a new one starts the way that
        // column is most useful - biggest first for a score, A-Z for a name
        if (i === sortAt) { sortDir = -sortDir; }
        else { sortAt = i; sortDir = columns[i].kind === 'team' ? 1 : (lowWins ? 1 : -1); }
        paint();
      });

      th.appendChild(button);
      return th;
    };

    var scoreCell = function (entry, column) {
      var td = document.createElement('td');
      td.className = 'col-' + column.kind;

      if (column.kind === 'team') {
        td.textContent = entry.name;
        return td;
      }

      // What the whole DQ column is for: the team's rounds stay in the table
      // exactly as they were thrown, and only the total is replaced.
      if (column.kind === 'total' && entry.dq) {
        var out = document.createElement('span');
        out.className = 'score is-dq';
        out.textContent = dqText;
        td.appendChild(out);
        return td;
      }

      var score = column.kind === 'total'
        ? { points: entry.total, thrown: '' }
        : (entry.scores[column.at] || { points: '', thrown: '' });

      var points = document.createElement('span');
      points.className = 'score';
      points.textContent = score.points || '–';
      td.appendChild(points);

      // The points ARE the throw whenever a team lands short of the target, so
      // repeating it would be noise. Showing it only when the two differ is
      // what makes an overthrow visible at a glance.
      if (score.thrown && score.thrown !== score.points) {
        var threw = document.createElement('span');
        threw.className = 'threw';
        threw.textContent = (prefix ? prefix + ' ' : '') + score.thrown;
        td.appendChild(threw);
      }
      return td;
    };

    var paint = function () {
      var shown = entries.slice().sort(order(sortAt, sortDir));

      var table = document.createElement('table');
      table.className = 'score-table';

      var thead = document.createElement('thead');
      var headRow = document.createElement('tr');
      columns.forEach(function (column, i) { headRow.appendChild(headingCell(column, i)); });
      thead.appendChild(headRow);
      table.appendChild(thead);

      var tbody = document.createElement('tbody');
      shown.forEach(function (entry) {
        var tr = document.createElement('tr');
        // a disqualified team cannot also be a leader - rank() gave it no
        // place at all - so these two can never want the same row
        if (entry.dq) {
          tr.className = 'is-dq';
        } else if (highlight && entry.rank && entry.rank <= highlight) {
          tr.className = 'is-top is-rank-' + Math.min(entry.rank, 3);
        }
        columns.forEach(function (column) { tr.appendChild(scoreCell(entry, column)); });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      host.textContent = '';
      host.appendChild(table);
      host.hidden = false;

      paintPodium();
    };

    var paintPodium = function () {
      if (!podium) { return; }
      var top = entries.filter(function (e) { return e.rank > 0 && e.rank <= 3; })
                       .sort(function (a, b) { return a.rank - b.rank; })
                       .slice(0, 3);

      if (!wantPodium || !highlight || top.length < 2) {
        podium.hidden = true;
        return;
      }

      podiumList.textContent = '';
      top.forEach(function (entry) {
        var li = document.createElement('li');
        li.className = 'podium-card is-rank-' + entry.rank;

        var place = document.createElement('span');
        place.className = 'podium-place';
        place.textContent = entry.rank;

        var name = document.createElement('span');
        name.className = 'podium-team';
        name.textContent = entry.name;

        var score = document.createElement('span');
        score.className = 'podium-score';
        score.textContent = entry.total + (pointsLabel ? ' ' + pointsLabel : '');

        li.appendChild(place);
        li.appendChild(name);
        li.appendChild(score);
        podiumList.appendChild(li);
      });
      podium.hidden = false;
    };

    // Emptied, not just hidden: if the sheet is closed part-way through an
    // event, last hour's scores should leave the page rather than sit in it
    // waiting to be shown again by the next thing that unhides the table.
    var clearTable = function () {
      host.textContent = '';
      host.hidden = true;
      if (podium) { podium.hidden = true; podiumList.textContent = ''; }
    };

    // Takes the Refresh button away with it, so it is only for the two states
    // where pressing it could not help: no sheet set, and a closed scoreboard.
    var clear = function () {
      clearTable();
      foot.hidden = true;
    };

    var markTime = function () {
      if (!stamp) { return; }
      var time;
      try {
        time = new Intl.DateTimeFormat('en-US',
          { hour: 'numeric', minute: '2-digit' }).format(new Date(loadedAt));
      } catch (e) { time = new Date(loadedAt).toLocaleTimeString(); }
      stamp.textContent = (board.dataset.textUpdated || '{time}').replace('{time}', time);
    };

    /* -- loading --------------------------------------------------------- */

    // Read fine, but there is nothing in it to show yet. The sheet answered, so
    // the time it answered and the Refresh button both still belong on screen.
    var nothingYet = function () {
      clearTable();
      say(board.dataset.textEmpty);
      markTime();
      foot.hidden = false;
    };

    var show = function (sheet) {
      loadedAt = Date.now();          // the sheet answered, whatever it said

      if (sheet.visible !== true) {
        clear();
        say('');
        status.hidden = true;
        closed.hidden = false;
        return;
      }
      closed.hidden = true;
      status.hidden = false;

      var shape = readRounds(sheet.rows);
      if (shape) {
        entries = readEntries(sheet.rows, shape);
        columns = [{ kind: 'team', label: board.dataset.teamHeading || 'Team' }];
        if (shape.total >= 0) {
          columns.push({ kind: 'total', label: board.dataset.totalHeading || 'Total' });
        }
        shape.rounds.forEach(function (round, i) {
          columns.push({
            kind: 'round',
            label: round.target ? round.target + (unit ? ' ' + unit : '') : round.type,
            sub: round.target ? round.type : '',
            at: i
          });
        });
      } else {
        var plain = readPlain(sheet.rows);
        if (!plain) { nothingYet(); return; }
        columns = plain.columns;
        entries = plain.entries;
      }

      if (!entries.length) { nothingYet(); return; }

      // the reader's chosen column can outlive a refresh, but not a sheet that
      // came back with fewer columns than it had before
      if (sortAt >= columns.length) { sortAt = columns.length > 1 ? 1 : 0; }

      rank();
      paint();

      var counted = entries.length === 1 && board.dataset.textEntriesOne
        ? board.dataset.textEntriesOne
        : (board.dataset.textEntries || '{count}');
      say(counted.replace('{count}', entries.length));
      markTime();
      foot.hidden = false;
    };

    var load = function (fresh) {
      if (!url) { clear(); say(board.dataset.textUnset); return; }
      if (fresh && refresh) { refresh.disabled = true; }

      readSheet(url, fresh)
        .then(show)
        .catch(function () {
          // a refresh that fails leaves the numbers already on screen alone -
          // last minute's scores beat no scores at all
          if (host.hidden) { clearTable(); }
          say(board.dataset.textFailed);
          // the message tells them to use the Refresh button, so it had better
          // be there - and the stamp still says when the numbers last arrived
          foot.hidden = false;
        })
        .then(function () { if (refresh) { refresh.disabled = false; } });
    };

    if (refresh) { refresh.addEventListener('click', function () { load(true); }); }

    if (every) {
      setInterval(function () {
        // no point fetching for a tab nobody is looking at
        if (!document.hidden) { load(true); }
      }, every);

      // ...but catch up the moment they come back to it
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden && Date.now() - loadedAt > every) { load(true); }
      });
    }

    load(false);
  }

  /* ---- reveal on scroll ------------------------------------------------ */
  var targets = document.querySelectorAll('.reveal');

  if (!targets.length) { return; }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      var el = entry.target;
      // stagger siblings so a row of cards arrives in sequence
      var delay = Number(el.dataset.revealDelay || 0);
      setTimeout(function () { el.classList.add('is-visible'); }, delay);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  targets.forEach(function (el) { io.observe(el); });
})();
