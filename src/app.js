import "bootstrap";
import "./style.css";

function getIndexes(board) {
    let flatBoard = board.flat()
    let indexes = []
    for(let i = 0; i < flatBoard.length; i++){
        if(flatBoard[i] === 1){
            indexes.push(i)
        }
    }
    return indexes
}

function placeShips(board, ships) {
    function getRandomNum(maxRows, length) {
        return [
            Math.floor(Math.random()*maxRows), 
            Math.floor(Math.random()*(maxRows - length + 1))
        ]
    }
    
    function transpose(matrix){
        let copy = matrix
        return copy.map((_, i) => matrix.map( row => row[i] ))
    }

    for (const ship of ships){
        let cont = 0
        while (cont < ships.length){
            if (Math.random() < 0.5) { board = transpose(board) }
            let [randRow, randStart] = getRandomNum(9, ship.length)
            let slice = board[randRow].slice(randStart, randStart+ship.length)
            if (!slice.includes(1)){
                board[randRow].splice(randStart, ship.length, ...ship)
                cont++
                break
            }
        }
    }

    return board
}

function fireTorpedo(board, divs, index) {
    let flat = board.flat()
    let value = flat[index]
    if (value === 0) { 
        divs[index].style.backgroundColor = "gray" 
    } else if (value === 1) {
        divs[index].style.backgroundColor = "red" 
    }
}

function showShips (board, divs) {
    let indexes = getIndexes(board)
    for(let i = 0; i < indexes.length; i++){
        divs[indexes[i]].style.border = "4px solid yellow"
    }   
}

function resetBoard (board) {
    return board = board.map(rwo => rwo.map(n => n = 0))
}

window.onload = function() {
  
    let gameBoard = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]

    const ships = [
        [1,1,1,1,1], 
        [1,1,1,1], 
        [1,1,1], 
        [1,1,1], 
        [1,1]
    ]

    let divs = document.querySelectorAll("div.wrapper > div")
    let reset = false
    const btnStart = document.getElementById("start")
    const btnShowShips = document.getElementById("show-ships")
    const btnFire = document.getElementById("fire")
    const divFirePosition = document.getElementById("fire-position")
    const btnConfirmCoor = document.getElementById("confirm-coor")

    const inputX = document.getElementById("x-coor")
    const inputY = document.getElementById("y-coor")

    btnConfirmCoor.addEventListener("click", function () {
        const x = parseInt(inputX.value)
        const y = parseInt(inputY.value)
        const index = (x-1) + (y-1)*10
        fireTorpedo(gameBoard, divs, index)  
    })

    btnStart.addEventListener("click", function () { 
        if(reset) {
            gameBoard = resetBoard(gameBoard)
            divs.forEach(div => div.style.border = "thin solid lightslategray")
            reset = false
        }
        gameBoard = placeShips(gameBoard, ships) 
        btnShowShips.style.display = "block"
        btnFire.style.display = "block"
        reset = true
    })

    btnShowShips.addEventListener("click", function () {
        showShips(gameBoard, divs)
    })

    btnFire.addEventListener("click", function() {
        divFirePosition.style.display = "block"
    })

    divs.forEach( (div, i) => {
        div.addEventListener("click", function () {
            fireTorpedo(gameBoard, divs, i)
        })
    })
    
}

