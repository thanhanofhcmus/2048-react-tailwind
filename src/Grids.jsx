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

const pushLeft = grid => grid.map(row => mergeRow(row));
const pushRight = grid => grid.map(row => mergeRow(row.reverse()).reverse())
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

const moveTitles = (grid, moveFunc) => {
  const deepCopy = grid => grid.map(row => row.map(v => v));
  const bk = moveFunc(deepCopy(grid));
  // dirty way of comparing 2 arrays
  return (JSON.stringify(grid) === JSON.stringify(bk))
    ? grid
    : generateNewTitle(bk)
}

const moveLeft = grid => moveTitles(grid, pushLeft);
const moveRight = grid => moveTitles(grid, pushRight);
const moveUp = grid => moveTitles(grid, pushUp);
const moveDown = grid => moveTitles(grid, pushDown);

export {
  makeGrid,
  moveLeft,
  moveRight,
  moveUp,
  moveDown
}