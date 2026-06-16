import './styles/main.scss';
// Reuse the same bundled (hashed, base-prefixed) font file for downloads.
import fontUrl from './assets/fonts/ZephirFlexVF.ttf?url';

import { initReveal } from './modules/reveal';
import { initHero } from './modules/hero';
import { populateWindfield, createSwirl } from './modules/wind';
import { initPlayground } from './modules/playground';
import { buildCuts } from './modules/cuts';
import { initAnatomy } from './modules/anatomy';
import { initSpecimen } from './modules/specimen';

function boot(): void {
  // Decorative wind motifs.
  const windfield = document.querySelector<HTMLElement>('[data-windfield]');
  if (windfield) populateWindfield(windfield, 5);

  const footerMark = document.querySelector<HTMLElement>('.footer__mark');
  if (footerMark) footerMark.appendChild(createSwirl());

  // Point every download link at the bundled font file.
  document.querySelectorAll<HTMLAnchorElement>('[data-font-download]').forEach((link) => {
    link.href = fontUrl;
  });

  // Build dynamic content BEFORE wiring the reveal observer so generated
  // [data-reveal] rows (the cuts) get observed too.
  buildCuts();
  initSpecimen();
  initPlayground();
  initAnatomy();
  initHero();

  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
