/**
 * Counting sheep
 * 10 -> 10 '' 9 '' 8 '' ... 1 ''
 */

const countingSheep = (numSheep) => {
  if (numSheep < 1) return console.log("All sheep jumped over the fence");

  console.log(`${numSheep} Another sheep jumps over the fence`);
  numSheep--;
  return countingSheep(numSheep);
};
//countingSheep(3);

/**
 * Power calculator
 *
 * 10 2 -> 100
 * 10 -1 -> exponent should be >= 0
 */

const powerCalculator = (base, exp) => {
  if (!base) return base;
  if (exp < 1) return "exponent should be >= 0";
  if (exp === 1) return base;

  exp--;
  return base * powerCalculator(base, exp);
};
//console.log(powerCalculator(10, 2));

/**
 * Reverse String
 * 'string' -> 'gnirts'
 * '' -> ''
 */
const reverseString = (string, length = string.length) => {
  if (length === 0) return "";

  const lastChar = string.charAt(length - 1);
  return lastChar + reverseString(string, length - 1);
};
//console.log(reverseString('string'));

/**
 * nth Triangular number
 * 4 -> 10
 * 1 -> 1
 */
const nthTriangularNumber = (n) => {
  if (n <= 1) return n;

  return n + nthTriangularNumber(n - 1);
};
//console.log(nthTriangularNumber(4));

/**
 * String splitter
 * 10/10/2020 -> ['10', '10', '2020']
 */
const stringSplitter = (string, separator, idx = 0, splitted = []) => {
  let i = idx;
  while (i !== string.length) {
    if (string.charAt(i) === separator) {
      splitted.push(string.slice(idx, i));
      splitted = stringSplitter(string, separator, i + 1, splitted);
      break;
    }
    i++;
  }
  if (i === string.length) splitted.push(string.slice(idx, i));
  return splitted;
};
//console.log(stringSplitter('10/10/2020', '/'));

/**
 * Fibonacci
 * 7 -> 1 1 2 3 5 8 13
 */
const fibonacci = (n, first = 0, second = 1) => {
  if (n === 0) return;
  console.log(second);
  fibonacci(n - 1, second, first + second);
};
//fibonacci(7);

/**
 * Factorial
 * 5 -> 120
 */
const factorial = (n) => {
  if (n === 0) return 1;
  if (n > 0) {
    return n * factorial(n - 1);
  } else {
    return n * factorial(Math.abs(n + 1));
  }
};
//console.log(factorial(5));

/**
 * getPath
 * [' ', ' ', ' ', '*', ' ', ' ', ' '],
 * ['*', '*', ' ', '*', ' ', '*', ' '],
 * [' ', ' ', ' ', ' ', ' ', ' ', ' '], -> RRDDLLDDRRRRRR
 * [' ', '*', '*', '*', '*', '*', ' '],
 * [' ', ' ', ' ', ' ', ' ', ' ', 'e']
 */
const getOpenPaths = (maze, visited, i, j) => {
  const open = [];
  for (let [x, y] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
    if (i + x >= 0 && i + x < maze.length) {
      if (
        (
          maze[i + x][j + y] === ' ' ||
          maze[i + x][j + y] === 'e'
        ) && !visited[`${i + x}${j + y}`]) {
        // add node with parent node
        open.push([[i + x, j + y], [i, j]]);
      }
    }
  }
  return open;
};

const getMazeSolution = (maze, i = 0, j = 0, toVisit = [], currentPath = [], visited = {}) => {
  if (maze[i][j] === 'e') {
    currentPath.push([i, j]);
    return currentPath;
  }

  // get open path
  visited[`${i}${j}`] = true;
  currentPath.push([i, j]);
  const open = getOpenPaths(maze, visited, i, j);

  // delete path until parent of next node to visit
  if (open.length === 0) {
    let [x, y] = toVisit[toVisit.length - 1][1]; // parent
    for (let idx = currentPath.length - 1; idx >= 0; idx--) {
      if (currentPath[idx][0] === x && currentPath[idx][1] === y) break;
      else currentPath.pop();
    }
  }

  // visit the next node
  toVisit = [...toVisit, ...open];
  [i, j] = toVisit.pop()[0];
  return getMazeSolution(maze, i, j, toVisit, currentPath, visited);
};

const getPath = (maze) => {
  const path = getMazeSolution(maze);
  const directionPath = [];

  let prevNode = path[0];
  let currNode;
  for (let i = 1; i < path.length; i++) {
    currNode = path[i];
    if (currNode[0] < prevNode[0]) directionPath.push('U');
    else if (currNode[0] > prevNode[0]) directionPath.push('D');
    else if (currNode[1] < prevNode[1]) directionPath.push('L');
    else if (currNode[1] > prevNode[1]) directionPath.push('R');
    prevNode = currNode;
  }
  return directionPath.join('');
};
// let maze = [
//   [' ', ' ', ' ', '*', ' ', ' ', ' '],
//   ['*', '*', ' ', '*', ' ', '*', ' '],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', '*', '*', '*', '*', '*', ' '],
//   [' ', ' ', ' ', ' ', ' ', ' ', 'e']
// ];
// console.log(getPath(maze));

/**
 * getAllPaths
 * RRDDLLDDRRRRRR
 * RRDDRRUURRDDDD
 * RRDDRRRRDD
 */
const getAllSolutions = (maze, i = 0, j = 0, toVisit = [], currentPath = [], visited = {}, paths = []) => {
  if (maze[i][j] === 'e') {
    currentPath.push([i, j]);
    paths.push([...currentPath]);

    // no more paths, return completed paths
    if (toVisit.length === 0)
      return paths;

    // delete path until parent of next node to visit
    let popped = toVisit.pop();
    let [x, y] = popped[1]; // parent
    [i, j] = popped[0]; // set current node to next node
    for (let idx = currentPath.length - 1; idx >= 0; idx--) {
      if (currentPath[idx][0] === x && currentPath[idx][1] === y)
        break;
      let deleted = currentPath.pop();
      visited[`${deleted[0]}${deleted[1]}`] = false;
    }
  }

  // get open path
  visited[`${i}${j}`] = true;
  currentPath.push([i, j]);
  const open = getOpenPaths(maze, visited, i, j);

  // delete path until parent of next node to visit
  if (open.length === 0) {
    let popped = toVisit[toVisit.length - 1];
    let [x, y] = popped[1]; // parent
    for (let idx = currentPath.length - 1; idx >= 0; idx--) {
      if (currentPath[idx][0] === x && currentPath[idx][1] === y)
        break;
      let deleted = currentPath.pop();
      visited[`${deleted[0]}${deleted[1]}`] = false;
    }
  }

  // visit the next node
  toVisit = [...toVisit, ...open];
  [i, j] = toVisit.pop()[0];
  return getAllSolutions(maze, i, j, toVisit, currentPath, visited, paths);
};

const getAllPaths = (maze) => {
  const paths = getAllSolutions(maze);
  const directionPaths = [];

  // turn each path in directional path
  for (const path of paths) {
    let directionPath = [];
    let prevNode = path[0];
    let currNode;
    for (let i = 1; i < path.length; i++) {
      currNode = path[i];
      if (currNode[0] < prevNode[0]) directionPath.push('U');
      else if (currNode[0] > prevNode[0]) directionPath.push('D');
      else if (currNode[1] < prevNode[1]) directionPath.push('L');
      else if (currNode[1] > prevNode[1]) directionPath.push('R');
      prevNode = currNode;
    }
    directionPaths.push(directionPath.join(''));
  }
  return directionPaths;
};
// console.log(getAllPaths(maze));

/**
 * Anagrams
 * east -> 24 permutations
 */
const anagrams = (word) => {
  if (word.length === 0) {
    return [];
  } else if (word.length === 1) {
    return [word];
  }

  let permutations = [];
  for (let i = 0; i < word.length; i++) {
    let rest = word.slice(0, i) + word.slice(i + 1, word.length);
    rest = anagrams(rest);
    for (const permutation of rest) 
      permutations.push(word.charAt(i) + permutation);
  }
  return permutations;
};
//console.log(anagrams('east'));

/**
 * Organization chart
 * {
 *  one: {       one
 *    two: {} =>  two
 *  }
 * }
 */
const organizeChart = (chart, space = '') => {
  for (const item in chart) {
    console.log(space + item);
    organizeChart(chart[item], space + '  ');
  }
};  
// let chart = {
//   one: {
//     two: {
//       three: {}
//     }
//   },
//   one1: {
//     two1: {}
//   }
// };
// organizeChart(chart);

/**
 * Binary representation
 */
const binaryRepresentation = (number) => {
  let lastBit = number % 2;
  if (number <= 1) return lastBit;
  return binaryRepresentation(number >> 1) + lastBit.toString();
};
//console.log(binaryRepresentation(25));