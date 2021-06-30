import React, { useState, useEffect } from 'react';
import Board from './Board';

const getSquares = (stepNo, gameCourses) => {
    let squares = Array(9).fill(null);
    if (stepNo > 0) {
        for (let i = 1; i <= stepNo; i++) {
            const item = gameCourses[i];
            squares[item.squareIdx] = item.player;
        }
    }

    return squares;
}

const getWinner = squares => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
            return squares[a];
        }
    }

    return null;
}

function Game() {
    const [stepNo, setStepNO] = useState(0);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [gameCourses, setGameCourses] = useState([{ player: 'O', squareIdx: -1 }]);

    useEffect(() => {
        setSquares(getSquares(stepNo, gameCourses));
    }, [stepNo]);

    const winner = getWinner(squares);
    const player = gameCourses[stepNo].player === 'X' ? 'O' : 'X';
    const status = winner ? 'Winner is ' + winner : 'Next Player is ' + player;
    const moves = gameCourses.map((course, step) => {
        const st = step ? 'Move to #' + step : 'Start Game';
        return (
            <li key={step}>
                <button onClick={() => setStepNO(step)}>
                    {st}
                </button>
            </li>
        );
    });

    const pickSqaure = idx => {
        if (!winner && !squares[idx]) {
            const player = stepNo % 2 === 0 ? 'X' : 'O';
            const newCourses = gameCourses.slice(0, stepNo + 1)
                .concat({ player: player, squareIdx: idx });
            setGameCourses(newCourses);
            setStepNO(stepNo + 1);
        }
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    onClick={(idx) => pickSqaure(idx)}
                    squares={squares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>{moves}</ul>
            </div>
        </div>
    )
}

export default Game;