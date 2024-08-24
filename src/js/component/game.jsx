import React, { useState } from 'react';
import Board from './board';
import PlayerSetup from './playerSetup';

export default function Game() {
  const [players, setPlayers] = useState(null);

  const handleGameStart = (players) => {
    setPlayers(players);
  };

  return (
    <div className="game">
      {players ? (
        <>
          <h2>{players.player1} vs {players.player2}</h2>
          <div className="game-board">
            <Board players={players} />
          </div>
        </>
      ) : (
        <PlayerSetup onGameStart={handleGameStart} />
      )}
    </div>
  );
}