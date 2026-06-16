// Shared scroll-reveal utility and a reduced-motion helper used across modules.

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion(): boolean {
  return motionQuery.matches;
}

/**
 * Observe every [data-reveal] element and add `.is-in` when it scrolls into
 * view. Elements may opt into a one-shot callback via the `onReveal` map
 * (keyed by a `data-reveal-id`) — used by sections that animate axes on entry.
 */
export function initReveal(onReveal: Record<string, (el: HTMLElement) => void> = {}): void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  // Reduced motion: show everything immediately, still fire entry callbacks.
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => {
      el.classList.add('is-in');
      const id = el.dataset.revealId;
      if (id && onReveal[id]) onReveal[id](el);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');
        const id = el.dataset.revealId;
        if (id && onReveal[id]) onReveal[id](el);
        observer.unobserve(el);
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
