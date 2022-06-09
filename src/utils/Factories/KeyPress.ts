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
    setTimer: (key: keyof typeof keyPress, cb: () => void, delay: number) => {
      if (key !== 'up') return;
      if (keyPress[key].timer) return;

      keyPress[key].timer = DeltaTimer(cb, delay);
      keyPress[key].timer?.start();
    },

    removeTimer: () => {
      keyPress.up.timer?.stop();
      keyPress.up.timer = null;
    }
  };
}
