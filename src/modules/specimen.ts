// Specimen section: an editable type tester, an a–z glyph grid, and lorem
// paragraphs rendered at a few different axis settings.
import { ALPHABET, LOREM } from '../data/font';
import { enforceLowercase } from './text';

export function initSpecimen(): void {
  // Editable tester: keep it lowercase.
  const input = document.querySelector<HTMLElement>('[data-specimen-input]');
  input?.addEventListener('input', () => enforceLowercase(input));

  // a–z grid.
  const alphabet = document.querySelector<HTMLElement>('[data-alphabet]');
  if (alphabet) {
    const frag = document.createDocumentFragment();
    for (const letter of ALPHABET) {
      const cell = document.createElement('div');
      cell.className = 'glyph-cell';
      cell.textContent = letter;
      frag.appendChild(cell);
    }
    alphabet.appendChild(frag);
  }

  // Lorem blocks: set axes from data attributes.
  const blocks = document.querySelectorAll<HTMLElement>('[data-text-block]');
  blocks.forEach((block) => {
    const wght = block.dataset.wght ?? '90';
    const flex = block.dataset.flex ?? '100';
    const lorem = block.querySelector<HTMLElement>('.specimen__lorem');
    if (!lorem) return;
    lorem.textContent = LOREM;
    lorem.style.setProperty('--col-wght', wght);
    lorem.style.setProperty('--col-flex', flex);
  });
}
