// Builds the gray "wind swirl" motif from the spec sheets and scatters copies
// across the hero so they drift right -> left like a gust.

const VIEW_W = 220;
const VIEW_H = 64;

/** Archimedean spiral that curls into a centre point, then trails off to the right. */
function swirlPath(): string {
  const cx = 24;
  const cy = 32;
  const b = 16 / (4 * Math.PI); // outer radius ~16 after two full turns
  const pts: string[] = [];
  for (let t = 0; t <= 4 * Math.PI; t += 0.2) {
    const r = b * t;
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  // Outer end sits at (cx + 16, cy); trail a straight line to the right edge.
  return `M ${pts.join(' L ')} L ${VIEW_W - 6} ${cy}`;
}

const PATH_D = swirlPath();

/** Create one swirl element (span.swirl wrapping an inline SVG). */
export function createSwirl(): HTMLElement {
  const span = document.createElement('span');
  span.className = 'swirl';
  span.innerHTML =
    `<svg viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-hidden="true">` +
    `<path d="${PATH_D}" /></svg>`;
  return span;
}

/** Scatter drifting swirls across the hero windfield. */
export function populateWindfield(container: HTMLElement, count = 5): void {
  const tops = [12, 30, 48, 66, 82]; // % down the hero, spread out
  for (let i = 0; i < count; i++) {
    const swirl = createSwirl();
    swirl.style.top = `${tops[i % tops.length] + (Math.random() * 8 - 4)}%`;
    swirl.style.right = `${-10 + Math.random() * 10}%`;
    swirl.style.animationDelay = `${(i / count) * 9 - Math.random() * 2}s`;
    swirl.style.animationDuration = `${8 + Math.random() * 5}s`;
    swirl.classList.add('is-blowing');
    container.appendChild(swirl);
  }
}
