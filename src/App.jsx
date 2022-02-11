import { React, useState, useEffect } from "react";
import Title from "./Title";
import {
    makeGrid, moveTitles, isWon, isGameOver, isGridsEqual,
    pushUp, pushDown, pushLeft, pushRight,
} from './Grids'
import useKeypress from "react-use-keypress";

const App = () => {
    const [grid, setGrid] = useState(makeGrid(4));
    const [lastGrid, setLastGrid] = useState(grid);
    const [score, setScore] = useState(0);
    const [won, setWon] = useState(false);
    const [lost, setLost] = useState(false);

    const moveGrid = moveFunc => {
        const movedGrid = moveFunc(grid);
        if (!isGridsEqual(grid, movedGrid)) {
            setLastGrid(grid);
            setGrid(moveTitles(grid, moveFunc));
        }
    }

    useEffect(() => {
        setScore(grid.reduce((a, r) => a + r.reduce((b, v) => b + v), 0));
        if (!lost && isGameOver(grid)) {
            setLost(true);
        }
        if (!won && isWon(grid)) {
            setWon(true);
        }
    }, [grid, score, won, lost]);

    useKeypress([
        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
        "a", "d", "w", "s",
        "r", "z",
    ], e => {
        if (e.key === "ArrowLeft" || e.key === "a") {
            moveGrid(pushLeft);
        } else if (e.key === "ArrowRight" || e.key === "d") {
            moveGrid(pushRight);
        } else if (e.key === "ArrowUp" || e.key === "w") {
            moveGrid(pushUp);
        } else if (e.key === "ArrowDown" || e.key === "s") {
            moveGrid(pushDown);
        } else if (e.key === "r") {
            setGrid(makeGrid(4));
        } else if (e.key === "z") {
            setGrid(lastGrid);
            setLost(isGameOver(lastGrid));
            setWon(isWon(lastGrid));
        }
    })
    return (
        <div>
            <p className="text-3xl mb-3 px-3 py-2
            font-bold text-center text-red-500 bg-gray-200
            w-fit mx-auto rounded-md drop-shadow-sm">
                Score: {score}
            </p>
            <div className="bg-gray-200 p-2 grid grid-cols-4 grid-rows-4
            w-fit mx-auto shadow rounded-xl">
                {grid.flat().map((c, i) => <Title key={i} content={c} />)}
            </div>
            <br />
            {
                won &&
                <div className="text-xl m-3 p-3 bg-green-400 text-gray-100
                rounded-xl drop-shadow-sm w-fit mx-auto">
                    <p>You reached 2048, you won!</p>
                    <p>You can continue playing to reach even higher number</p>
                </div>
            }
            {
                lost &&
                <div className="text-xl m-3 p-3 bg-red-400 text-gray-100
                rounded-xl drop-shadow-sm w-fit mx-auto">
                    <p>Cannot make any more move, game over!</p>
                    <p>Press <code>R</code> to restart or press <code>Z</code> to undo last move</p>
                </div>
            }
            <div className="text-xl m-3 p-3 bg-gray-200 rounded-xl
            drop-shadow-sm w-fit mx-auto">
                <p>Use <code>WASD</code> or <code>&uarr;&larr;&darr;&rarr;</code> to move titles.</p>
                <p>Use <code>R</code> to reset.</p>
                <p>Use <code>Z</code> to undo last move.</p>
            </div>
        </div>
    );
};

export default App;
