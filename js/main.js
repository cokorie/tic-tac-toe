const playerMoveLookup = {
  'null': '',
  '1': 'X',
  '-1': 'O'
};

let board;
let turn;
let winner;

const winnerLogic = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const playerEls = document.querySelector('#board > div');
const msgEl = document.querySelector('h1');
const btnEl = document.querySelector('button');

document.getElementById('board').addEventListener('click', playerMove);

btnEl.addEventListener('click', init);

init();

function init() {
  board = [
    null, null, null,
    null, null, null,
    null, null, null
  ];
  turn = 1;
  winner = null;
  render();
}

function render() {
  renderBoard();
  renderMsg();
  btnEl.style.visibility = winner ? 'visible' : 'hidden';
}

function playerMove(evt) {
  let idx = parseInt(evt.target.id);
  // switch players
  if (board[idx] !== null) {
    return;
  }
  board[idx] = turn;
  turn *= -1;
  // check for game winner
  winner = getWinner();
  renderMsg();
  render();
}

function renderMsg() {
  if (winner === 'T') {
    msgEl.innerHTML = "It's a Tie!";
  } else if (winner) {
    msgEl.textContent = `${playerMoveLookup[winner]} Wins!`;
  } else {
    msgEl.textContent = `${playerMoveLookup[turn]}'s Turn`;
  }
}

function renderBoard() {
  board.forEach(function (cell, index) {
    document.getElementById(`${index}`).textContent = playerMoveLookup[cell];
  })
}

function getWinner() {
  for (let win of winnerLogic) {
    let total = board[win[0]] + board[win[1]] + board[win[2]];
    if (Math.abs(total) === 3) return turn *= -1;
  };
  if (board.includes(null)) return null;
  return 'T';
}