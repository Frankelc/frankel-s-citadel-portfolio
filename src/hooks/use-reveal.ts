import { useEffect, useRef } from "react";

/**
 * Marque l'élément `data-reveal="pending"` après le montage, puis `"shown"` quand il entre
 * dans l'écran. Sans JavaScript ou avec prefers-reduced-motion, le contenu reste visible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset["reveal"] = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset["reveal"] = "shown";
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
