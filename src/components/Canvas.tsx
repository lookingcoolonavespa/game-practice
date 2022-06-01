import { useEffect, useRef } from 'react';
import useGame from '../utils/hooks/useGame';
import Modal from './Modal';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    newGame,
    startNewGame,
    drawPlayer,
    drawPlatforms,
    drawEnemies,
    update,
    playerPosition
  } = useGame(canvasRef.current);

  useEffect(
    function draw() {
      if (!canvasRef.current) return;
      const c = canvasRef.current?.getContext('2d');
      if (!c) return;
      const { width, height } = canvasRef.current;

      c.clearRect(0, 0, width, height);

      c.fillStyle = '#B33B44';
      c.fillRect(0, 0, width, height);

      c.fillStyle = 'black';
      c.fillRect(0, 0, width, 160);

      drawPlatforms(c);
      drawPlayer(c);
      drawEnemies(c);
    },
    [playerPosition]
  );

  const animate = () => {
    requestAnimationFrame(animate);

    update(canvasRef.current);
  };

  useEffect(function runAnime() {
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (newGame) window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') startNewGame();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [newGame]);

  return (
    <>
      {newGame && (
        <Modal>
          <div>
            <button type="button" onClick={startNewGame}>
              Start New Game
            </button>
          </div>
        </Modal>
      )}
      <canvas
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
      ></canvas>
    </>
  );
}
