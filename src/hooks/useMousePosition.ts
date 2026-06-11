import { useState, useEffect, useRef } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          setMousePosition({ ...pending.current });
          rafId.current = null;
        });
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return mousePosition;
}

