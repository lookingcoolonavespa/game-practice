export default function IFrames() {
  let active = false;
  let count = 0;

  return {
    get active() {
      return active;
    },
    get count() {
      return count;
    },
    increaseCount() {
      count++;
    },
    resetCount() {
      count = 0;
    },
    setActive(val: boolean) {
      active = val;
    }
  };
}
