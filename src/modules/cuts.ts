// Renders the 8 named cuts as specimen rows. Each row's FLEX axis sweeps from
// 0 to its target value when it scrolls into view (CSS, triggered by .is-in),
// so you watch the wind reach each line.
import { CUTS, PANGRAM } from '../data/font';

export function buildCuts(): void {
  const list = document.querySelector<HTMLElement>('[data-cuts-list]');
  if (!list) return;

  const frag = document.createDocumentFragment();
  for (const cut of CUTS) {
    const row = document.createElement('div');
    row.className = 'cut-row';
    row.setAttribute('data-reveal', '');
    row.style.setProperty('--row-wght', String(cut.wght));
    row.style.setProperty('--row-flex-target', String(cut.FLEX));

    const meta = document.createElement('div');
    meta.className = 'cut-row__meta';
    meta.innerHTML =
      `<span class="cut-row__name">${cut.name.toLowerCase()}</span>` +
      `<span class="cut-row__coords">wght ${cut.wght} · flex ${cut.FLEX}</span>`;

    const text = document.createElement('div');
    text.className = 'cut-row__text';
    text.textContent = PANGRAM;

    row.append(meta, text);
    frag.appendChild(row);
  }
  list.appendChild(frag);
}
