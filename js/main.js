const playerMoveLookup = {
    '0': 'white',
    '1': 'black',
    '-1': 'red'
};

let board;
let turn;
let winner;

const playerEls = [...document.querySelector('#space > div')];
const msgEl = document.querySelector('h1');
const btnEl = document.querySelector('button');

document.getElementById('players').addEventListener('click', playerMove);

btnEl.addEventListener('click', init);

init();

function init() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
turn = 1;
winner = null;
render();
}

function playerMove(evt)    {
    const colIdx = playerEls.indexOf(evt.target);
    if (colIdx === -1) return; 
    // access the column array
    const colArr = board[colIdx];
    // find the rowIdx for the first 0 in the colArr
    const rowIdx = colArr.indexOf(0);
    // update the board
    board[colIdx][rowIdx] = turn;
    // switch players
    turn *= -1;
    // check for winner
    winner = getWinner(colIdx, rowIdx);
    render();
}

function render() {
    renderBoard();
    renderMsg();
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
}

function renderMsg() {
    if (winner) {
      msgEl.innerHTML = `<span style="color: ${colorLookup[winner]}">${colorLookup[winner].toUpperCase()}</span> Wins!`;
    } else {
      msgEl.innerHTML = `<span style="color: ${colorLookup[turn]}">${colorLookup[turn].toUpperCase()}</span>'s Turn`;
    }
  }

  function renderBoard() {
    board.forEach(function(colArr, colIdx) {
      colArr.forEach(function(cell, rowIdx) {
        const cellDiv = document.getElementById(`r${rowIdx}c${colIdx}`);
        cellDiv.style.backgroundColor = colorLookup[cell];
      });
    });
  }