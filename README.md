# Zephir Flex

A specimen site for **Zephir Flex**, a variable typeface built on a simple
conceit: *what if wind blows against the font?* Slide the **flex** axis and
the wind picks up. Stem tops curve away, soft serifs stream off to the left,
and right-facing corners round smooth. A second **weight** axis runs from a
delicate hairline to a heavy black.

🔗 **Live:** https://aarkro.github.io/zephir-flex/

## What's on the page

- **Hero**: the name assembles, then the wind morphs it from sans to serif.
- **Concept**: the idea behind the typeface.
- **Playground**: drag two sliders (weight + flex) on live, editable type, or jump to any named cut.
- **The cuts**: all eight named instances set in the pangram.
- **Anatomy**: the favourite letter `n`, with its three wind-shaped features.
- **Specimen**: an editable type tester, the `a–z` grid, and text blocks at different settings.

Only the lowercase alphabet is shown, since that's what the font draws.

## Tech

Plain **TypeScript** + **SCSS**, bundled with **Vite**. No framework. The font's
two axes (`wght` 90–180, `FLEX` 0–100) and eight named instances live in
[`src/data/font.ts`](src/data/font.ts) as the single source of truth.

```
src/
  main.ts            # boots every module
  data/font.ts       # axes, cuts, pangram
  modules/           # hero, playground, cuts, anatomy, specimen, reveal, wind, text
  styles/            # main.scss + per-section partials
  assets/fonts/      # ZephirFlexVF.ttf
```

## Local development

Requires Node 20+.

```bash
npm install      # install dev tooling
npm run dev      # start the dev server (prints a local URL)
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Deployment (GitHub Pages)

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages.

**One-time setup:** in the repository, go to **Settings → Pages → Build and
deployment** and set **Source** to **GitHub Actions**.

The site is served from the `/zephir-flex/` sub-path (see `base` in
[`vite.config.ts`](vite.config.ts)); update that value if the repository is
ever renamed.
