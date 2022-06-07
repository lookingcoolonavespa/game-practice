import { KeyPressInterface } from '../../types/interfaces';
import { KeyPressType } from '../../types/types';
import DeltaTimer from './DeltaTimer';

export default function KeyPress(): KeyPressInterface {
  const keyPress: KeyPressType = {
    up: {
      pressed: false,
      timer: null
    },
    left: { pressed: false },
    right: { pressed: false },
    space: { pressed: false }
  };

  return {
    ...keyPress,
    setPressed: (key: keyof typeof keyPress) => {
      keyPress[key].pressed = true;
    },
    setReleased: (key: keyof typeof keyPress) => {
      keyPress[key].pressed = false;
    },
    setTimer: (cb: () => void, delay: number) => {
      if (keyPress.up.timer) return;

      keyPress.up.timer = DeltaTimer(cb, delay);
      keyPress.up.timer.start();
    },

    removeTimer: () => {
      keyPress.up.timer?.stop();
      keyPress.up.timer = null;
    }
  };
}
