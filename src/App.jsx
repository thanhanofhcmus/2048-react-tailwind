import { React, useState, useEffect } from "react";
import Title from "./Title";
import {
    makeGrid,
    moveTitles,
    pushUp,
    pushDown,
    pushLeft,
    pushRight,
    isGameOver,
    isGridsEqual
} from './Grids'
import useKeypress from "react-use-keypress";

const App = () => {
    const [grid, setGrid] = useState(makeGrid(4));
    const [lastGrid, setLastGrid] = useState(grid);
    const [score, setScore] = useState(0);

    const moveGrid = moveFunc => {
        const movedGrid = moveFunc(grid);
        if (! isGridsEqual(grid, movedGrid)) {
            setLastGrid(grid);
            setGrid(moveTitles(grid, moveFunc));
        }
    }

    useEffect(() => {
        setScore(grid.reduce((a, r) => a + r.reduce((b, v) => b + v), 0));
        if (isGameOver(grid)) {
            alert(`GAME OVER!! SCORE: ${score}`);
        }
    }, [grid, score]);

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
        }
    })
    return (
        <div>
            <p className="text-3xl px-3 font-bold text-red-400">Score: {score}</p>
            <div className="bg-gray-200 p-2 grid grid-cols-4 grid-rows-4 w-fit mx-auto shadow rounded-xl">
                {grid.flat().map((c, i) => <Title key={i} content={c} />)}
            </div>
        </div>
    );
};

export default App;
