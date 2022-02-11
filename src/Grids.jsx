const makeGrid = size => {
  const grid = new Array(size);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(size).fill(0);
  }
  return generateNewTitle(grid)
}

const transpose = grid => grid[0].map((_, i) => grid.map(r => r[i]));

const rotateCW = grid => transpose(grid).map(r => r.reverse());

const rotateCCW = grid => transpose(grid).reverse();

const mergeRow = row => {
  const len = row.length;
  row = row.filter(v => v !== 0);
  let i = 0;
  while (i < row.length) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row.splice(i + 1, 1);
    }
    i += 1;
  }
  return row.concat(new Array(len - row.length).fill(0));
}

const pushLeft = grid => deepCopy(grid).map(row => mergeRow(row));
const pushRight = grid => deepCopy(grid).map(row => mergeRow(row.reverse()).reverse())
const pushUp = grid => rotateCW(pushLeft(rotateCCW(grid)));
const pushDown = grid => rotateCCW(pushLeft(rotateCW(grid)));

const generateNewTitle = grid => {
  const randInt = max => Math.floor(Math.random() * max);
  let x = 0;
  let y = 0;
  do {
    x = randInt(grid.length);
    y = randInt(grid[0].length);
  } while (grid[x][y] !== 0);
  grid[x][y] = 2;
  return grid;
}

const deepCopy = grid => grid.map(row => row.map(v => v));

// dirty way of comparing 2 arrays
const isGridsEqual = (g1, g2) => JSON.stringify(g1) === JSON.stringify(g2);

const moveTitles = (grid, moveFunc) => {
  const bk = moveFunc(deepCopy(grid));
  return (isGridsEqual(grid, bk)) ? grid : generateNewTitle(bk)
}

const isWon = grid => grid.some(row => row.some(val => val >= 2048));

const isGameOver = grid =>
  isGridsEqual(grid, moveTitles(deepCopy(grid), pushLeft)) &&
  isGridsEqual(grid, moveTitles(deepCopy(grid), pushRight)) &&
  isGridsEqual(grid, moveTitles(deepCopy(grid), pushUp)) &&
  isGridsEqual(grid, moveTitles(deepCopy(grid), pushDown))

export {
  makeGrid,
  moveTitles,
  pushLeft,
  pushRight,
  pushUp,
  pushDown,
  isWon,
  isGameOver,
  isGridsEqual
}