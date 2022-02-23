import { React, useState, useEffect } from "react";
import Title from "./Title";
import {
	makeGrid, moveTitles, isWon, isGameOver, isGridsEqual, isFull,
	pushUp, pushDown, pushLeft, pushRight, generateNewTitle
} from './Grids'
import useKeypress from "react-use-keypress";

const buttonStyle = `text-xl mb-3 px-3 py-2 font-bold bg-gray-200 w-fit rounded-md drop-shadow-sm`

const App = () => {
	const [grid, setGrid] = useState(makeGrid(4));
	const [lastGrid, setLastGrid] = useState(grid);
	const [score, setScore] = useState(0);
	const [won, setWon] = useState(false);
	const [lost, setLost] = useState(false);
	const [size, setSize] = useState(4);

	const moveGrid = moveFunc => {
		const movedGrid = moveFunc(grid);
		if (!isGridsEqual(grid, movedGrid)) {
			setLastGrid(grid);
			let newGrid = moveTitles(grid, moveFunc);
			const maxTitle = grid.reduce((a, r) => Math.max(a, r.reduce((c, d) => Math.max(c, d), 0)), 0);
			const levels = [2048, 8192, 32786, 65536, 131072];
			levels.forEach(lv => { maxTitle >=  lv && !isFull(newGrid) && (newGrid = generateNewTitle(newGrid)); });
			setGrid(newGrid);
			setLost(isGameOver(newGrid));
			setWon(isWon(newGrid));
		}
	}

	useEffect(() => {
		setScore(grid.reduce((a, r) => a + r.reduce((b, v) => b + v), 0));
	}, [grid]);

	useEffect(() => {
		setGrid(makeGrid(size));
		setLost(false);
		setWon(false);
	}, [size])

	useKeypress([
		"ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
		"a", "d", "w", "s",
		"h", "j", "k", "l",
		"r", "z",
	], e => {
		e.preventDefault();
		const checkKey = (expected, func) => [].concat(expected).some(k => k === e.key) && func();
		checkKey(["ArrowLeft", "a", "h"], () => moveGrid(pushLeft));
		checkKey(["ArrowRight", "d", "l"], () => moveGrid(pushRight));
		checkKey(["ArrowUp", "w", "k"], () => moveGrid(pushUp));
		checkKey(["ArrowDown", "s", "j"], () => moveGrid(pushDown));
		checkKey("r", () => setGrid(makeGrid(4)));
		checkKey("z", () => {
			setGrid(lastGrid);
			setLost(isGameOver(lastGrid));
			setWon(isWon(lastGrid));
		});
	});

	return (
		<div>
			<div className="text-3xl mb-3 px-3 py-2
			font-bold text-red-500 bg-gray-200
			w-fit mx-auto rounded-md drop-shadow-sm">
				Score: {score}
			</div>
			<div className="flex justify-center space-x-4">
				<button className={`${buttonStyle} hover:scale-110`} onClick={() => setSize(size - 1)}>&nbsp;-&nbsp;</button>
				<div className={buttonStyle}> {size} </div>
				<button className={`${buttonStyle} hover:scale-110`} onClick={() => setSize(size + 1)}>+</button>
			</div>
			<div className="bg-gray-200 p-2 grid-cols-10
			w-fit mx-auto shadow rounded-xl"
				style={{
					display: "grid",
					gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
					gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
				}}>
				{grid.flat().map((c, i) => <Title key={i} content={c} size={size} />)}
			</div>

			<br />
			<div className="text-xl m-3 p-3 bg-gray-200 rounded-xl
			drop-shadow-sm w-fit mx-auto">
				<p>Use <code>WASD</code> or <code>&uarr;&larr;&darr;&rarr;</code> or <code>hjkl</code> to move titles.</p>
				<p>Use <code>R</code> to reset.</p>
				<p>Use <code>Z</code> to undo last move.</p>
			</div>
			{
				won &&
				<div className="text-xl m-3 p-3 bg-green-400 text-gray-100
								rounded-xl drop-shadow-sm w-fit mx-auto">
					<p>You reached 2048, you won!</p>
					<p>You can continue playing to reach even higher number</p>
					<p>The difficulty increased, more 2s will be spawned each turn</p>
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

		</div>
	);
};

export default App;
