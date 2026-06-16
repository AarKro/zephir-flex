// Interactive playground: two sliders drive the live preview's variable axes,
// and chips jump to the named cuts. Highlights the matching cut when coords line up.
import { AXES, CUTS, matchCut } from '../data/font';
import { enforceLowercase } from './text';

export function initPlayground(): void {
  const preview = document.querySelector<HTMLElement>('[data-pg-preview]');
  const wghtSlider = document.querySelector<HTMLInputElement>('[data-pg-slider="wght"]');
  const flexSlider = document.querySelector<HTMLInputElement>('[data-pg-slider="FLEX"]');
  const wghtOut = document.querySelector<HTMLElement>('[data-pg-out="wght"]');
  const flexOut = document.querySelector<HTMLElement>('[data-pg-out="FLEX"]');
  const chipHost = document.querySelector<HTMLElement>('[data-pg-chips]');
  if (!preview || !wghtSlider || !flexSlider || !chipHost) return;

  // Build a chip per named cut.
  const chips = CUTS.map((cut) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = cut.name.toLowerCase();
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      wghtSlider.value = String(cut.wght);
      flexSlider.value = String(cut.FLEX);
      apply();
    });
    chipHost.appendChild(chip);
    return chip;
  });

  const apply = () => {
    const wght = Number(wghtSlider.value);
    const flex = Number(flexSlider.value);
    preview.style.setProperty('--pg-wght', String(wght));
    preview.style.setProperty('--pg-flex', String(flex));
    if (wghtOut) wghtOut.textContent = String(wght);
    if (flexOut) flexOut.textContent = String(flex);

    const active = matchCut(wght, flex);
    chips.forEach((chip, i) => {
      chip.setAttribute('aria-pressed', String(CUTS[i] === active));
    });
  };

  wghtSlider.addEventListener('input', apply);
  flexSlider.addEventListener('input', apply);

  // Keep glyphs to lowercase since the font only ships lowercase letters.
  preview.addEventListener('input', () => enforceLowercase(preview));

  // Seed from defaults.
  wghtSlider.value = String(AXES.wght.def);
  flexSlider.value = String(AXES.FLEX.def);
  apply();
}
