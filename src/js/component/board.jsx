import React, { useState } from 'react';
import Square from './square';

export default function Board({ players }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // X siempre empieza
  const [victories, setVictories] = useState({
    [players.player1]: 0,
    [players.player2]: 0
  });
  const [playerSymbols, setPlayerSymbols] = useState({
    [players.player1]: 'X',
    [players.player2]: 'O'
  });
  const [nextPlayerStarts, setNextPlayerStarts] = useState(players.player1); // Quién empieza el siguiente juego

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squares) || squaresCopy[i]) return;

    squaresCopy[i] = xIsNext ? playerSymbols[players.player1] : playerSymbols[players.player2];
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squaresCopy);
    if (winner) {
      updateVictories(winner);
    }
  };

  const updateVictories = (winnerMark) => {
    setVictories(prevVictories => ({
      ...prevVictories,
      [winnerMark === playerSymbols[players.player1] ? players.player1 : players.player2]: prevVictories[winnerMark === playerSymbols[players.player1] ? players.player1 : players.player2] + 1
    }));
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  let status;
  if (winner) {
    status = `¡Ganador: ${winner === playerSymbols[players.player1] ? players.player1 : players.player2} con ${winner}!`;
  } else if (isBoardFull) {
    status = '¡Es un empate!';
  } else {
    status = `Siguiente jugador: ${xIsNext ? players.player1 : players.player2}`;
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    // Invertir los símbolos de los jugadores
    setPlayerSymbols(prevSymbols => {
      const newSymbols = {
        [players.player1]: prevSymbols[players.player2],
        [players.player2]: prevSymbols[players.player1]
      };
      // Invertir el turno inicial
      setNextPlayerStarts(prev => prev === players.player1 ? players.player2 : players.player1);
      // Asegurar que X siempre empieza
      setXIsNext(newSymbols[players.player1] === 'X');
      return newSymbols;
    });
  };

  // Ajustar el estado xIsNext según quién debería comenzar
  React.useEffect(() => {
    setXIsNext(nextPlayerStarts === players.player1);
  }, [nextPlayerStarts]);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        {(winner || isBoardFull) && (
          <button onClick={resetGame} className="reset-button">
            Volver a jugar
          </button>
        )}
      </div>
      <div style={{ marginLeft: '20px' }}>
        <h2>Conteo de victorias</h2>
        <p>{players.player1}: {victories[players.player1]}</p>
        <p>{players.player2}: {victories[players.player2]}</p>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
