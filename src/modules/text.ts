// Small shared text helpers.

/**
 * Lowercase the contents of a contenteditable element, preserving the caret at
 * the end. Zephir Flex only ships lowercase letters, so editable demos coerce
 * input to lowercase rather than show tofu/fallback uppercase.
 */
export function enforceLowercase(el: HTMLElement): void {
  const lower = (el.textContent ?? '').toLowerCase();
  if (lower === el.textContent) return;
  el.textContent = lower;
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}
