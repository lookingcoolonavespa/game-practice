import { useRef } from 'react';
import Player from './components/Player';

import './styles/global.scss';

export default function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Player />
    </div>
  );
}
