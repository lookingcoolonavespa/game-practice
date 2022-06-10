const { default: GameState } = require('../utils/Factories/GameState');
const { default: levels } = require('../utils/levels');

describe('handlePlayerCollision works', () => {
  test('handlePlayerCollision doesnt brick', () => {
    const gameState = GameState(levels.one(974));

    const { player, platforms } = gameState;

    player.setPosition({
      x: 69,
      y: player.y
    });

    gameState.handleKeyPress(
      {
        up: {
          pressed: false,
          timer: null
        },
        left: { pressed: true },
        right: { pressed: false },
        space: { pressed: false }
      },
      200,
      950
    );

    gameState.handlePlayerCollision();
  });
});
