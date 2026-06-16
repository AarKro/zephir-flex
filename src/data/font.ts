// Single source of truth for the font's variable axes and named instances.
// Parsed directly from ZephirFlexVF.ttf (fvar table).

export const FONT_FAMILY = 'Zephir Flex';

export interface Axis {
  tag: 'wght' | 'FLEX';
  label: string;
  min: number;
  def: number;
  max: number;
}

export const AXES: Record<'wght' | 'FLEX', Axis> = {
  wght: { tag: 'wght', label: 'Weight', min: 90, def: 90, max: 180 },
  FLEX: { tag: 'FLEX', label: 'Flex', min: 0, def: 0, max: 100 },
};

export interface Cut {
  name: string;
  wght: number;
  FLEX: number;
}

// The 8 named instances shipped in the font, in display order.
// FLEX 100 = the serif "wind" form, FLEX 0 = the calm sans.
export const CUTS: Cut[] = [
  { name: 'Regular', wght: 90, FLEX: 100 },
  { name: 'Medium', wght: 103, FLEX: 100 },
  { name: 'SemiBold', wght: 119, FLEX: 100 },
  { name: 'Bold', wght: 136, FLEX: 100 },
  { name: 'ExtraBold', wght: 157, FLEX: 100 },
  { name: 'Black', wght: 180, FLEX: 100 },
  { name: 'Regular Sans', wght: 90, FLEX: 0 },
  { name: 'Black Sans', wght: 180, FLEX: 0 },
];

export const PANGRAM = 'the quick brown fox jumps over the lazy dog';

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Lowercase-only lorem, since the font only ships lowercase glyphs we want to show.
export const LOREM =
  'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim ' +
  'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
  'commodo consequat.';

/** Build a `font-variation-settings` value string from axis coordinates. */
export function fvs(wght: number, flex: number): string {
  return `"wght" ${wght}, "FLEX" ${flex}`;
}

/** Find the named cut matching the given coordinates, if any. */
export function matchCut(wght: number, flex: number): Cut | undefined {
  return CUTS.find((c) => c.wght === wght && c.FLEX === flex);
}
