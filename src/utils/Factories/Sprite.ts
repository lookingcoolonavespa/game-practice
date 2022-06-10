export default function Sprite(sheet: {
  left: { [key: string]: HTMLImageElement[] };
  right: { [key: string]: HTMLImageElement[] };
}) {
  type Action = keyof typeof sheet.right;

  let currAction: Action = 'idle';
  let spriteIdx = 0;

  let direction: 'left' | 'right' = 'right';

  return {
    get currSprite() {
      return sheet[direction][currAction][spriteIdx];
    },
    get currAction() {
      return currAction;
    },
    updateAction(action: Action, wait?: boolean) {
      if (!wait) {
        if (action !== currAction) this.resetSpriteIdx(true);
        currAction = action;
      } else {
        if (spriteIdx === sheet[direction][currAction].length - 1)
          currAction = action;
      }
    },
    updateDirection(dir: 'left' | 'right') {
      direction = dir;
    },
    increaseSpriteIdx() {
      spriteIdx++;
    },
    resetSpriteIdx(override?: boolean) {
      if (spriteIdx === sheet[direction][currAction].length - 1 || override)
        spriteIdx = 0;
    },
    resolveAnimationEnd() {
      return spriteIdx === sheet[direction][currAction].length - 1;
    }
  };
}
