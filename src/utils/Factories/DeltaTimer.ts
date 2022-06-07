export default function DeltaTimer(
  onTimerEnd: (time: number) => void,
  interval: number
) {
  let timeout: NodeJS.Timeout, lastTime: number;

  function loop() {
    const currTime = Date.now();
    const deltaTime = currTime - lastTime;
    const delay = Math.max(interval - deltaTime, 0);
    timeout = setTimeout(loop, delay);
    lastTime = currTime + delay;
    onTimerEnd(currTime);
  }

  return {
    start: () => {
      timeout = setTimeout(loop, 0);
      lastTime = Date.now();
    },
    stop: () => {
      clearTimeout(timeout);
    }
  };
}
