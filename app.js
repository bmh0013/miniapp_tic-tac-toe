
$(document).ready(function() {
  $app = $('#app');

  $app.append('<div id="header" style="text-align: center; margin-left: 5%; margin-right: 5%;"></div>')
  $('#header').append('<button id="resetBtn">Reset Game</button>')

  var player1 = prompt('Name of Player 1: ') || 'Player 1';
  var player2 = prompt('Name of Player 2: ') || 'Player 2';

  var player1Wins = 0;
  var player2Wins = 0;

  $('#header').append(`<div style="float: left; width: 20%; height: 20px; overflow: hidden">${player1}: ${player1Wins}</div>`)
  $('#header').append(`<div style="float: right; width: 20%; height: 20px; overflow: hidden">${player2}: ${player2Wins}</div>`)

  $app.append('<div id="container" style="display: grid; grid-template-columns: repeat(3, minmax(200px, 1fr)); grid-template-rows: repeat(3, minmax(200px, 1fr));"></div>');

  $container = $('#container')
  $container.append('<div class="square" id="11" style="border-right: 5px solid black; border-bottom: 5px solid black;"></div>')
  $container.append('<div class="square" id="12" style="border-right: 5px solid black; border-bottom: 5px solid black;"></div>')
  $container.append('<div class="square" id="13" style="border-bottom: 5px solid black;"></div>')
  $container.append('<div class="square" id="21" style="border-right: 5px solid black; border-bottom: 5px solid black;"></div>')
  $container.append('<div class="square" id="22" style="border-right: 5px solid black; border-bottom: 5px solid black;"></div>')
  $container.append('<div class="square" id="23" style="border-bottom: 5px solid black;"></div>')
  $container.append('<div class="square" id="31" style="border-right: 5px solid black;"></div>')
  $container.append('<div class="square" id="32" style="border-right: 5px solid black"></div>')
  $container.append('<div class="square" id="33"></div>')

  var moves, moveGrid;

  function startGame() {
    setUpBoard();

    $('#container').find('div').one('click', placeMarker);
    $('#resetBtn').one('click', resetGame);
  }

  function resetGame() {
    $('.square').html('');
    $('.square').off();

    alert('Game has been reset.')
    startGame();
  }

  function setUpBoard() {
    moves = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    moveGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  function placeMarker(event) {
    if (moves.length !== 0) {
      let eventId = event.target.id;
      let move = moves.pop();

      let $square = $(`#${eventId}`);

      $square.append(`<h1 class="test">${move}</h1>`);
      moveGrid[eventId[0] - 1][eventId[1] - 1] = move;
      checkIfVictory(move);
    }
  }

  function checkIfVictory(move) {
    let victory = false;

    for (let row_col = 0; row_col < 3; row_col++) {
      if (moveGrid[row_col][0] === move && moveGrid[row_col][1] === move && moveGrid[row_col][2] === move) {
          victory = true;
          break;
      }
      if (moveGrid[0][row_col] === move && moveGrid[1][row_col] === move && moveGrid[2][row_col] === move) {
        victory = true;
        break;
      }
    }

    if (!victory) {
      if (moveGrid[0][0] === move && moveGrid[1][1] === move && moveGrid[2][2] === move) {
        victory = true;
      }
      if (moveGrid[0][2] === move && moveGrid[1][1] === move && moveGrid[2][0] === move) {
        victory = true;
      }
      if (moves.length === 0 && !victory) {
        setTimeout( function() {
          alert('Draw! Try again.')
        }, 10);
      }
    }

    if (victory) {
      alertVictory(move);
      $('.square').off();
    }
  }

  function alertVictory(move) {
    setTimeout( function() {
      alert(`Player ${move} has won!`)
    }, 10);
  }

  startGame();
})

