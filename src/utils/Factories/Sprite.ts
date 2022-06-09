export default function Sprite(sheet: { [key: string]: HTMLImageElement[] }) {
  type Action = keyof typeof sheet;

  let currAction: Action = 'idle';
  let spriteIdx = 0;

  return {
    get currSprite() {
      return sheet[currAction][spriteIdx];
    },
    get currAction() {
      return currAction;
    },
    updateAction(action: Action) {
      if (action !== currAction) this.resetSpriteIdx(true);
      currAction = action;
    },
    increaseSpriteIdx() {
      spriteIdx++;
    },
    resetSpriteIdx(override?: boolean) {
      if (spriteIdx === sheet[currAction].length - 1 || override) spriteIdx = 0;
    }
  };
}
