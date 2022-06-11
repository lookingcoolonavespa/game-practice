export default function Sprite(sheet: {
  left: { [key: string]: HTMLImageElement[] };
  right: { [key: string]: HTMLImageElement[] };
}) {
  type Action = keyof typeof sheet.right;

  let currAction: Action = 'idle';
  let spriteIdx = 0;

  let direction: 'left' | 'right' = 'right';

  function resetSpriteIdx(override?: boolean) {
    if (spriteIdx === sheet[direction][currAction].length - 1 || override)
      spriteIdx = 0;
  }

  return {
    get currSprite() {
      return sheet[direction][currAction][spriteIdx];
    },
    get currAction() {
      return currAction;
    },
    resetSpriteIdx,
    updateAction(action: Action, wait?: boolean) {
      if (!wait) {
        if (action !== currAction) resetSpriteIdx(true);
        currAction = action;
      } else {
        if (spriteIdx === sheet[direction][currAction].length - 1) {
          if (action !== currAction) resetSpriteIdx(true);
          currAction = action;
        }
      }
    },
    updateDirection(dir: 'left' | 'right') {
      direction = dir;
    },
    increaseSpriteIdx() {
      spriteIdx++;
    },
    resolveAnimationEnd() {
      return spriteIdx === sheet[direction][currAction].length - 1;
    }
  };
}
