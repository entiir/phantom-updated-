import { useCallback, useEffect, useRef, useState } from "react";

// Keep a closing surface mounted for its exit. Opening remains synchronous,
// including Safari's user-gesture-dependent search/keyboard focus.
export default function useMotionState(initial, selector) {
  const [value, setValue] = useState(initial);
  const current = useRef(initial);
  const pending = useRef(null);
  const stop = useCallback(() => {
    const exit = pending.current;
    if (!exit) return;
    pending.current = null;
    clearTimeout(exit.timer);
    exit.animation?.cancel();
    exit.node.inert = exit.wasInert;
  }, []);
  const update = useCallback(nextValue => {
    const next = typeof nextValue === "function" ? nextValue(current.current) : nextValue;
    stop();
    const commit = () => { current.current = next; setValue(next); };
    // Search closes immediately so keyboard/focus cleanup stays synchronous.
    if (next !== initial || current.current === initial || current.current === "search" ||
        typeof document === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { commit(); return; }
    const node = document.querySelector(selector);
    if (!node?.animate) { commit(); return; }
    const exit = { node, wasInert: node.inert, timer: null, animation: null };
    const finish = () => { if (pending.current !== exit) return; stop(); commit(); };
    try {
      const transform = window.getComputedStyle(node).transform;
      node.inert = true;
      pending.current = exit;
      exit.animation = node.animate([
        { opacity: 1, transform },
        { opacity: 0, transform: (transform === "none" ? "" : transform) + " translateY(28px)" },
      ], { duration: 170, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" });
      exit.timer = setTimeout(finish, 220);
      exit.animation.finished.then(finish, finish);
    } catch { stop(); commit(); }
  }, [initial, selector, stop]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (media.matches && pending.current) { stop(); current.current = initial; setValue(initial); }
    };
    media.addEventListener?.("change", onChange);
    return () => { media.removeEventListener?.("change", onChange); stop(); };
  }, [initial, stop]);
  return [value, update];
}
