let interval: number | null = null;

export function initTimer(onTick: () => void, onExpire: () => void, tickMs = 1000) {
  if (interval) clearInterval(interval);
  const w = window as unknown as { __remaining?: number };
  if (typeof w.__remaining !== 'number') {
    w.__remaining = 45 * 60; // défaut
  }
  interval = window.setInterval(() => {
    w.__remaining!--;
    onTick();
    if (w.__remaining! <= 0) {
      clearInterval(interval!);
      onExpire();
    }
  }, tickMs);
}

export function setRemaining(seconds: number) {
  (window as any).__remaining = seconds;
}

export function getRemaining(): number {
  return (window as any).__remaining ?? 0;
}
