// The favourite letter: a giant "n" whose FLEX axis is driven by a slider so
// the wind's three signatures appear. Numbered markers over the glyph sync with
// the feature notes (hovering either highlights the pair).
import { prefersReducedMotion } from './reveal';

// Approximate positions (% of the square stage) of each feature on the "n".
const MARKERS = [
  { left: 34, top: 16 }, // 1: stem top, curves left
  { left: 15, top: 90 }, // 2: lower-left serif (pulled out from the foot)
  { left: 85, top: 90 }, // 3: right-facing corner, softened (pulled out)
];

export function initAnatomy(): void {
  const stage = document.querySelector<HTMLElement>('[data-anatomy-stage]');
  const slider = document.querySelector<HTMLInputElement>('[data-anatomy-slider]');
  const out = document.querySelector<HTMLElement>('[data-an-out]');
  const notes = Array.from(document.querySelectorAll<HTMLElement>('[data-anatomy-note]'));
  if (!stage || !slider) return;

  // Build the glyph + markers.
  const glyph = document.createElement('div');
  glyph.className = 'anatomy__glyph';
  glyph.textContent = 'n';
  glyph.setAttribute('aria-hidden', 'true');
  stage.appendChild(glyph);

  const markers = MARKERS.map((pos, i) => {
    const m = document.createElement('span');
    m.className = 'anatomy__marker';
    m.dataset.marker = String(i);
    m.style.left = `${pos.left}%`;
    m.style.top = `${pos.top}%`;
    m.textContent = String(i + 1);
    m.setAttribute('aria-hidden', 'true');
    stage.appendChild(m);
    return m;
  });

  const setActive = (i: number, on: boolean) => {
    markers[i]?.classList.toggle('is-active', on);
    notes[i]?.classList.toggle('is-active', on);
  };

  // Pair hovers/focus between notes and markers.
  notes.forEach((note, i) => {
    note.addEventListener('mouseenter', () => setActive(i, true));
    note.addEventListener('mouseleave', () => setActive(i, false));
  });
  markers.forEach((m, i) => {
    m.addEventListener('mouseenter', () => setActive(i, true));
    m.addEventListener('mouseleave', () => setActive(i, false));
  });

  const apply = () => {
    const flex = Number(slider.value);
    glyph.style.setProperty('--an-flex', String(flex));
    if (out) out.textContent = String(flex);
  };
  slider.addEventListener('input', apply);

  // Start calm; on reveal, let the wind blow in once so the change is visible.
  apply();
  if (!prefersReducedMotion()) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          animateTo(slider, 100, apply);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(stage);
  } else {
    slider.value = '100';
    apply();
  }
}

/** Smoothly ramp the slider to a target value, calling apply() each frame. */
function animateTo(slider: HTMLInputElement, target: number, apply: () => void): void {
  const start = Number(slider.value);
  const duration = 2500;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    slider.value = String(Math.round(start + (target - start) * eased));
    apply();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
