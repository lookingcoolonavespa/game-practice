export default function DeltaTimer(onTimerEnd: () => void, interval: number) {
  let timeout: NodeJS.Timeout, lastTime: number;

  function loop() {
    const currTime = Date.now();
    const elapsed = currTime - lastTime;
    const delay = Math.max(interval - elapsed, 0);
    timeout = setTimeout(loop, delay);
    onTimerEnd();
    lastTime = Date.now();
  }

  return {
    start: () => {
      timeout = setTimeout(loop, interval);
    },
    stop: () => {
      clearTimeout(timeout);
    }
  };
}
