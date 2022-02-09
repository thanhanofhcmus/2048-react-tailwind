import { React, useState } from "react";
import Title from "./Title";
import Button from "./Button";
import { makeGrid, moveUp, moveDown, moveLeft, moveRight } from './Grids'
import useKeypress from "react-use-keypress";

const App = () => {
    const [grid, setGrid] = useState(makeGrid(4))
    useKeypress([
        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
    ], e => {
        if (e.key === "ArrowLeft") {
            setGrid(moveLeft(grid));
        } else if (e.key === "ArrowRight") {
            setGrid(moveRight(grid))
        } else if (e.key === "ArrowUp") {
            setGrid(moveUp(grid))
        } else if (e.key === "ArrowDown") {
            setGrid(moveDown(grid))
        }
    })
    return (
        <div>
            <div className="bg-gray-200 p-2 grid grid-cols-4 grid-rows-4 w-fit mx-auto">
                {grid.flat().map((c, i) => <Title key={i} content={c} />)}
            </div>
            <div className="flex py-4 space-x-4 justify-center">
            <Button name="L" onClick={() => { setGrid(moveLeft(grid))}}/>
            <Button name="D" onClick={() => { setGrid(moveDown(grid))}}/>
            <Button name="U" onClick={() => { setGrid(moveUp(grid))}}/>
            <Button name="R" onClick={() => { setGrid(moveRight(grid))}}/>
            </div>
        </div>
    );
};

export default App;
