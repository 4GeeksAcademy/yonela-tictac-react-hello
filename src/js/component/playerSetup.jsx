import React, { useState } from 'react';

export default function PlayerSetup({ onGameStart }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player1Mark, setPlayer1Mark] = useState('X');
  const [player2Mark, setPlayer2Mark] = useState('O');

  const handleStartGame = () => {
    if (player1 && player2) {
      onGameStart({ player1, player2, player1Mark, player2Mark });
    } else {
      alert("Por favor, ingrese los nombres de ambos jugadores.");
    }
  };

  const handleMarkChange = () => {
    setPlayer1Mark(player1Mark === 'X' ? 'O' : 'X');
    setPlayer2Mark(player2Mark === 'X' ? 'O' : 'X');
  };

  return (
    <div>
      <h2>Configuración de Jugadores</h2>
      <div>
        <label>
          Jugador 1:
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Jugador 2:
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </label>
      </div>
      <div>
        <p>
          {player1} jugará con: {player1Mark}
        </p>
        <p>
          {player2} jugará con: {player2Mark}
        </p>
        <button onClick={handleMarkChange}>
          Cambiar Símbolo
        </button>
      </div>
      <button onClick={handleStartGame}>Iniciar Juego</button>
    </div>
  );
}