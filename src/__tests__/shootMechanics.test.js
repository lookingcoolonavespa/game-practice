const { default: GameState } = require('../utils/Factories/GameState');
const { default: levels } = require('../utils/levels');

describe('player shots', () => {
  test('works in close range', () => {
    const gameState = GameState(levels.one(974));
  });
});
