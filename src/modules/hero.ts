// Hero opening timeline: letters of "zephir flex" assemble from the right,
// then the wind passes and the word morphs from calm sans to the serif form.
import { prefersReducedMotion } from './reveal';

export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const word = hero.querySelector<HTMLElement>('[data-hero-word]');
  const tagline = hero.querySelector<HTMLElement>('[data-hero-tagline]');
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

  const reveal = () => {
    chars.forEach((c) => c.classList.add('is-in'));
    tagline?.classList.add('is-in');
    scroll?.classList.add('is-in');
  };

  const blow = () => {
    // The wind arrives: settle into the serif "Regular" form (FLEX 100).
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
  window.setTimeout(() => {
    tagline?.classList.add('is-in');
    scroll?.classList.add('is-in');
  }, lettersDone + 150);
  window.setTimeout(blow, lettersDone + 650);
}
