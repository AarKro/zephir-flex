// The favourite letter: a giant "n" whose FLEX axis is driven by a slider so
// the wind's three signatures appear. Numbered markers over the glyph sync with
// the feature notes (hovering either highlights the pair).
import { prefersReducedMotion } from './reveal';

// Feature positions on the glyph itself, derived from the font's outlines:
// units/em = 1000, advance of "n" = 542, typo ascender 800 (USE_TYPO_METRICS)
// puts the baseline at 80% of the 1em line box. left/top are % of the glyph's
// box; ring is the highlighted area's diameter in em of the glyph size; angle
// points the numbered badge away from the letter (0 = right, clockwise).
const MARKERS = [
  { left: 21.0, top: 33.8, ring: 0.19, angle: -140 }, // 1: stem top, curves left
  { left: 9.8, top: 72.8, ring: 0.17, angle: 140 }, // 2: left foot serif, points left
  { left: 91.3, top: 79.0, ring: 0.11, angle: 35 }, // 3: right-facing corner, softened
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
    m.style.left = `${pos.left}%`;
    m.style.top = `${pos.top}%`;
    m.style.setProperty('--ring', `${pos.ring}em`);
    m.style.setProperty('--angle', `${pos.angle}deg`);
    const arm = document.createElement('span');
    arm.className = 'anatomy__arm';
    const badge = document.createElement('span');
    badge.className = 'anatomy__badge';
    badge.textContent = String(i + 1);
    arm.appendChild(badge);
    m.appendChild(arm);
    glyph.appendChild(m);
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
