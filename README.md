# BeCompletelyHuman.com

The homepage for Completely Human LLC. The site lives at **becompletelyhuman.com**. **completelyhuman.llc** forwards to it. Plain Jekyll 4 (no theme, no plugins), deployed to GitHub Pages with a GitHub Actions workflow.

## What lives where

| To change... | Edit |
|---|---|
| Coming-soon page on/off, its eyebrow and message | `_config.yml` (`coming_soon`) and `_includes/coming-soon.html` |
| Full homepage copy | `_includes/home.html` |
| Category cards (add, remove, reorder, links) | `_data/categories.yml` |
| Accent palettes | `_data/palettes.yml` |
| Default accent, theme switcher on/off | `_config.yml` (`accent`, `theme_switcher`) |
| Hero headline (pick 1, 2, or 3) and eyebrow | `_config.yml` (`hero`) |
| Contact email | `_config.yml` (`email`) |
| Page copy (hero text, Why, Contact) | `index.html` |
| Header / footer | `_includes/header.html`, `_includes/footer.html` |
| Styles | `_sass/` (`_tokens.scss` holds the base colors) |
| Placeholder logo | the `<svg>` in `_includes/header.html` and `assets/img/favicon.svg` |

Restart `jekyll serve` after editing `_config.yml`. Everything else reloads on save.

### Coming-soon page vs. full site

Right now `coming_soon.enabled: true` in `_config.yml`, so the homepage is a single screen: the eyebrow, "Completely Human," "Coming soon," and the email button. The header is hidden.

To launch the full site, set `enabled: false`, push, and the workflow deploys it. The full page lives in `_includes/home.html`. To preview it locally first, flip the setting and run `bundle exec jekyll serve`, then flip it back before you commit.

### Removing the theme switcher

The switcher is already off (`theme_switcher: false`, accent `ember`), so visitors never see it. To turn it back on for comparing colors, set `theme_switcher: true`.

Optional cleanup if you never want it again: delete `_includes/theme-switcher.html`, `assets/js/theme-switcher.js`, `_sass/_switcher.scss`, and the `@use "switcher";` line in `assets/css/main.scss`.

## Local preview

You need Ruby 3.3 (the version is pinned in `.ruby-version`). macOS ships an old system Ruby, so install a current one with Homebrew (`brew install ruby`) or a version manager like rbenv, asdf, or mise.

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000.

The first `bundle install` creates `Gemfile.lock`. Before you commit it, add the Linux platform so the GitHub build can use it:

```sh
bundle lock --add-platform x86_64-linux
```

## Deploy

Every push to `main` builds and deploys the site through `.github/workflows/pages.yml`. You can also run it by hand from the **Actions** tab (**Deploy site to GitHub Pages** > **Run workflow**).

## One-time setup

### 1. Create the repo and push

On GitHub, create a new **public** repository (GitHub Pages on a free account needs a public repo). Don't add a README, license, or .gitignore. A name like `completelyhuman-site` works.

Then, from this folder:

```sh
bundle install
bundle lock --add-platform x86_64-linux
git init -b main
git add .
git commit -m "First draft of the Completely Human homepage"
git remote add origin https://github.com/YOUR-USERNAME/completelyhuman-site.git
git push -u origin main
```

Or with the GitHub CLI, after the first commit: `gh repo create completelyhuman-site --public --source=. --push`

### 2. Turn on Pages with GitHub Actions

1. In the repo, go to **Settings > Pages**.
2. Under **Build and deployment > Source**, choose **GitHub Actions**. (Not "Deploy from a branch.")
3. Go to the **Actions** tab. If the first run failed because Pages wasn't on yet, open it and click **Re-run all jobs**, or use **Run workflow**.
4. When it's green, the site is live at `https://YOUR-USERNAME.github.io/completelyhuman-site/` (styles may look off at that address until the custom domain is set, because the site is configured for the root of a domain).

### 3. Verify the domain (recommended, do this first)

This stops anyone else from claiming your domain on GitHub Pages.

1. Click your profile picture > **Settings > Pages** (your account settings, not the repo).
2. **Add a domain**, enter `becompletelyhuman.com`.
3. GitHub shows a TXT record. Add it at the registrar for the .com. It looks like:
   - Type: `TXT`
   - Name/Host: `_github-pages-challenge-YOUR-USERNAME`
   - Value: the code GitHub gives you
4. Wait a few minutes, then click **Verify**.

### 4. Add the custom domain to the repo

Do this before changing the A/AAAA records, per GitHub's docs.

1. Repo **Settings > Pages > Custom domain**: enter `becompletelyhuman.com`, click **Save**.

GitHub Pages allows one custom domain per site. That's the .com. The .llc is handled by forwarding (step 7), not by GitHub.

A note on the `CNAME` file in this repo: when you deploy with a custom Actions workflow, GitHub ignores it. The Settings field above is what counts. The file is kept as a record of the domain and is harmless.

### 5. DNS records for becompletelyhuman.com

At the registrar for the .com, delete any default parking-page, "forwarding," or placeholder A/AAAA/CNAME records the registrar added for `@` and `www` first. Then add:

| Type | Name / Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

The `www` CNAME points at your GitHub Pages host only, with no repo name and no `https://`. GitHub then redirects `www.becompletelyhuman.com` to `becompletelyhuman.com` automatically.

Don't add a wildcard record (`*`). It's a takeover risk.

Check it from a terminal (changes can take up to 24 hours):

```sh
dig becompletelyhuman.com +noall +answer -t A
dig becompletelyhuman.com +noall +answer -t AAAA
dig www.becompletelyhuman.com +nostats +nocomments +nocmd
```

### 6. Turn on HTTPS

1. Back in repo **Settings > Pages**, wait for the DNS check to pass. GitHub then requests a free Let's Encrypt certificate.
2. When **Enforce HTTPS** becomes clickable, check it. This can take up to 24 hours after DNS is correct. If it stays stuck, remove the custom domain, save, add it back, save.

Don't share the link until **Enforce HTTPS** is checked.

If the registrar added CAA records for the .com, one must allow `letsencrypt.org`, or GitHub can't issue the certificate. No CAA records at all is fine.

### 7. Forward completelyhuman.llc to the .com

In the .llc domain's registrar, set up URL forwarding (sometimes called "redirect" or "web forwarding"):

- Forward `completelyhuman.llc` **and** `www.completelyhuman.llc` to `https://becompletelyhuman.com`
- Type: **permanent (301)**, not "masked" or "frame" forwarding. Masked forwarding hides the real address and breaks on many sites.
- Turn on "forward path" if offered, so `completelyhuman.llc/anything` lands on the same path at the .com.
- Don't add the GitHub A/AAAA records to the .llc. Forwarding replaces them.

**About HTTPS on the .llc.** Forwarding happens at the registrar, so whether `https://completelyhuman.llc` works depends on whether your registrar's forwarding service issues a certificate. Many do now, some don't. Test both:

```sh
curl -sI http://completelyhuman.llc | grep -i -E "^(HTTP|location)"
curl -sI https://completelyhuman.llc | grep -i -E "^(HTTP|location)"
```

Both should show a `301` with `location: https://becompletelyhuman.com/`. If only the `http://` one works, typing `CompletelyHuman.LLC` into a browser still lands on the .com (as far as I know, browsers don't force HTTPS for .llc). Only someone clicking an `https://completelyhuman.llc` link would see an error. Two fixes if that matters to you: move the .llc DNS to Cloudflare (free) and use a redirect rule, or ask and I'll set up a tiny second GitHub Pages site that redirects.

Capital letters don't matter in domains. `CompletelyHuman.LLC` and `BeCompletelyHuman.com` are fine on cards and signs. Enter them lowercase in settings.

### 8. Email (hello@becompletelyhuman.com)

GitHub Pages doesn't handle email. Set up email forwarding at the .com registrar, or a mail host such as Google Workspace or Fastmail. That adds MX (and usually TXT/SPF) records, which don't conflict with the website records above.

If you send mail *from* the address (not just receive), set up SPF, DKIM, and DMARC as your mail host describes, or replies may land in spam.
