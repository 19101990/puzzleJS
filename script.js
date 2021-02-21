const puzzleContainer = document.getElementById('puzzle')
const shuffleBtn = document.getElementById('shuffle-btn')
const changeBtn = document.getElementById('change-btn')
const a1 = document.getElementById('a1')
const a2 = document.getElementById('a2')
const b1 = document.getElementById('b1')
const b2 = document.getElementById('b2')
const squares = [a1, a2, b1, b2]
const pieces = ['a', 'b', 'c', 'd']
const solvableStates = [
    ['a', 'b', 'c', 'd'],
    ['a', 'd', 'c', 'b'],
    ['d', 'a', 'c', 'b'],
    ['c', 'a', 'd', 'b'],
    ['c', 'a', 'b', 'd'],
    ['c', 'd', 'b', 'a'],
    ['d', 'c', 'b', 'a'],
    ['b', 'c', 'd', 'a'],
    ['b', 'c', 'a', 'd'],
    ['b', 'd', 'a', 'c'],
    ['d', 'b', 'a', 'c'],
    ['a', 'b', 'd', 'c']
]


// Use Fisher-Yates algorithm to shuffle the array
function randomizePieces() {
    const randomPieces = pieces.slice()
        for (let i = randomPieces.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [randomPieces[i], randomPieces[rand]] = [randomPieces[rand], randomPieces[i]];
        }
        return randomPieces
}

// Remove classes from squares to prevent doubling
function resetClasses() {
    squares.forEach((square) => {
        square.className = ''
        square.classList.add('piece')
    })
    document.getElementById('container').classList.remove('container-disabled')
}

// Assign individual classes to each square in the new array
function assignClasses(array) {
    for(let i = 0; i <= squares.length-1; i++) {
        squares[i].classList.add(array[i])
    }
}

// Add classes to pieces in random order
function shuffle() {
    resetClasses()
    puzzleContainer.style.backgroundColor = 'white'
    const shuffled = randomizePieces()
    assignClasses(shuffled)
    // if the puzzle is solved, shuffle again
    if (isSolved()) {
        shuffle()
    }
    isSolvable(shuffled)
}

// Check if puzzle is solvable
function isSolvable(shuffledArr) {
    let solvable = 0
    solvableStates.forEach((array) => {
        if(JSON.stringify(array) === JSON.stringify(shuffledArr)) {
            solvable = 1
        }
    })
    if(!solvable) {shuffle()}
}

// Check if puzzle is solved
function isSolved() {
    if (a1.classList.contains('a') && a2.classList.contains('b') && b1.classList.contains('c')) {
        console.log('Solved')
        document.getElementById('container').classList.add('container-disabled')
        return true
    }
}

// EVENT LISTENERS
shuffleBtn.addEventListener('click', shuffle)
a1.addEventListener('click', () => {
    const classList = a1.className.split(' ')
    if (a2.classList.contains('d')) {
        a1.classList.remove(classList[1])
        a1.classList.add('d')
        a2.classList.remove('d')
        a2.classList.add(classList[1])
    } else if (b1.classList.contains('d')) {
        a1.classList.remove(classList[1])
        a1.classList.add('d')
        b1.classList.remove('d')
        b1.classList.add(classList[1])
    }
    isSolved()
})
a2.addEventListener('click', () => {
    const classList = a2.className.split(' ')
    if (a1.classList.contains('d')) {
        a2.classList.remove(classList[1])
        a2.classList.add('d')
        a1.classList.remove('d')
        a1.classList.add(classList[1])
    } else if (b2.classList.contains('d')) {
        a2.classList.remove(classList[1])
        a2.classList.add('d')
        b2.classList.remove('d')
        b2.classList.add(classList[1])
    }
    isSolved()
})
b1.addEventListener('click', () => {
    const classList = b1.className.split(' ')
    if (b2.classList.contains('d')) {
        b1.classList.remove(classList[1])
        b1.classList.add('d')
        b2.classList.remove('d')
        b2.classList.add(classList[1])
    } else if (a1.classList.contains('d')) {
        b1.classList.remove(classList[1])
        b1.classList.add('d')
        a1.classList.remove('d')
        a1.classList.add(classList[1])
    }
    isSolved()
})
b2.addEventListener('click', () => {
    const classList = b2.className.split(' ')
    if (a2.classList.contains('d')) {
        b2.classList.remove(classList[1])
        b2.classList.add('d')
        a2.classList.remove('d')
        a2.classList.add(classList[1])
    } else if (b1.classList.contains('d')) {
        b2.classList.remove(classList[1])
        b2.classList.add('d')
        b1.classList.remove('d')
        b1.classList.add(classList[1])
    }
    isSolved()
})

