// Hero opening timeline: letters of "zephir flex" assemble from the right,
// then the wind strengthens and the word morphs into its full serif form.
import { prefersReducedMotion } from './reveal';

export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const word = hero.querySelector<HTMLElement>('[data-hero-word]');
  const taglines = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-tagline]'));
  const scroll = hero.querySelector<HTMLElement>('[data-hero-scroll]');
  const lines = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-line]'));

  // Build per-character spans for each word line.
  const chars: HTMLElement[] = [];
  for (const line of lines) {
    const text = line.dataset.heroLine ?? '';
    line.textContent = '';
    for (const ch of text) {
      const span = document.createElement('span');
      span.className = 'hero__char';
      span.textContent = ch;
      line.appendChild(span);
      chars.push(span);
    }
  }

  const showSupporting = () => {
    taglines.forEach((t) => t.classList.add('is-in'));
    scroll?.classList.add('is-in');
  };

  const reveal = () => {
    chars.forEach((c) => c.classList.add('is-in'));
    showSupporting();
  };

  const blow = () => {
    // The wind builds to its full serif "Regular" form (FLEX 100). The word
    // starts at flex 30 (see _hero.scss) so the morph never shows the
    // unfinished flex-0 terminals.
    word?.style.setProperty('--hero-flex', '100');
  };

  if (prefersReducedMotion()) {
    reveal();
    blow();
    return;
  }

  // Stagger the letters in, then reveal the supporting type, then let the wind blow.
  const STEP = 90; // ms between letters
  chars.forEach((c, i) => {
    window.setTimeout(() => c.classList.add('is-in'), 300 + i * STEP);
  });
  const lettersDone = 300 + chars.length * STEP;
  window.setTimeout(showSupporting, lettersDone + 150);
  window.setTimeout(blow, lettersDone + 650);
}
