export default function DeltaTimeout(onTimerEnd: () => void, interval: number) {
  let timeout: NodeJS.Timeout;

  return {
    start: () => {
      timeout = setTimeout(onTimerEnd, interval);
    },
    stop: () => {
      clearTimeout(timeout);
    }
  };
}
