const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
//game winning index

const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')

const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-messagae-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn

/*
cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
}) */

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass();

    winningMessageElement.classList.remove('show')
}

function  handleClick(e) {
    /* 
    let clickedCell = e.target.classList

    clickedCell.add('x')

    console.log(clickedCell) */

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    // Place Mark
    placeMark(cell, currentClass)

    //Check For Win
    if (checkWin(currentClass)) {
        console.log("winner")
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    //check for draw

    //shitch turns
}

function endGame(draw) { // draw is equal to false
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        console.log("win!")
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

/**
    * ! add class {circle or x} when ever event has done
*/

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}


/**
    * ! switch true and false
*/
function swapTurns() {
    circleTurn = !circleTurn
}


/**
    * ! if circle turn is true add circle class to cell if false x
*/

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}


/**
    * !return true if the same class are in the index number of winningCombination
*/

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}