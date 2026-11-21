# Completely Human site: read before changing anything

Jekyll 4 site on GitHub Pages (deployed by `.github/workflows/pages.yml`). Full project context lives in the "Completely Human LLC" Claude Project (`claude/project-context.md`). The rules below keep every session on the same look and feel.

## Look and feel (do not drift)
- Dark near-black background (`--bg #121110`), white headings, muted warm-gray body text, ONE accent: Ember `#ff7a3d`. Never pale, cold, or muddy. No second accent color, no gradients other than the soft Ember glow behind the landing/QR/connect pages.
- Font: Inter. The "C" in Completely (white) and "H" in Human (Ember) are logo-cut glyph masks (`.glyph--c`, `.glyph--h`). Use that title treatment wherever the brand name is shown big. Do not replace it with a different font. (Feeling Passionate needs a paid license; not licensed.)
- Logo: white brush ring, orange script CH. Files in `assets/img/`. Never redraw or recolor it by hand.
- Buttons are rare. Primary button = Ember with white text. Secondary actions are quiet gray underlined text links (`.soon__email`).
- Every colour comes from CSS variables (`_sass/_tokens.scss`, accent from `_data/palettes.yml`). No hard-coded hex in components.
- Landing, `/qr/` and `/connect/` are each exactly one screen: no scrolling on normal phones and laptops. Check at 1280x800, 390x844, 360x640 after any change.

## Voice
- Plain, direct, a little messy, human. No marketing buzzwords, no overselling, never em dashes.
- Projects in development are stealth: never name them on the site. Describe work by category (coaching, consulting, software, content, writing).
- Company-first, but Dan's energy comes through.

## Pages
- `/` coming-soon landing (`coming_soon.enabled` in `_config.yml`; full homepage is `_includes/home.html`). Email there is hello@becompletelyhuman.com.
- `/qr/` QR code for networking events (points to `/connect/`). `/connect/` temporary contact card with a vCard download (dan@becompletelyhuman.com, 315 559 6139). Both are unlinked, `noindex`, and must stay hard to find. Do not add them to nav, footer, or any sitemap. `connect_link` stays false unless Dan asks.
- No nav items for utility pages. Google Analytics 4 is on (Dan approved 2026-11-21; ID in `_config.yml` as `google_analytics`, `_includes/analytics.html`, production builds only). No other analytics or trackers without asking.
- `/reviewchaser/` solution page (Dan's call, 2026-11-20: named on purpose, an exception to the stealth rule). Uses `_layouts/bare.html` (shared head and tokens, no CH header/footer) with `body_class: solution`; styles live in `_sass/_solution.scss`, all scoped under `.solution`. Its "I'm interested" popup posts to Formspree form `mppdjpvz`. Not linked from the CH homepage or nav yet. Footer says "ReviewChaser is a Completely Human solution."

## Working with Dan
Give a full draft to react to instead of asking many questions. He edits actively. Commit small, push to `main`, tell him what changed in a few plain sentences.
