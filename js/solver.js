// s represents square space in sudoku board
const s = null;

// Test Case #1
const emptyBoard = [
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s]
];

// Test Case #2
const noDuplicates = [
    [2, s, s, s, s, s, s, s, 5],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, 7, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, 1, s, s],
    [s, s, s, s, s, s, s, s, s],
    [s, 4, s, s, s, s, s, s, s],
    [s, s, s, s, s, s, s, s, 8]
];

// Test Case #3 (Should return false - Impossible Case)
const impossibleCase = [
    [1, 2, 3, 4, 5, 6, 7, 8, s],
    [s, s, s, s, s, s, s, s, 2],
    [s, s, s, s, s, s, s, s, 3],
    [s, s, s, s, s, s, s, s, 4],
    [s, s, s, s, s, s, s, s, 5],
    [s, s, s, s, s, s, s, s, 6],
    [s, s, s, s, s, s, s, s, 7],
    [s, s, s, s, s, s, s, s, 8],
    [s, s, s, s, s, s, s, s, 9]
];

function createAndSolveBoard() {
    let board = [[]];
    let j = 0;

    for(let i = 1; i <= 81; i++) {
        const val = document.getElementById(String(i)).value;

         if (val == ""){
            board[j].push(null)
        }
        else { 
            board[j].push(Number(val))
        }
        if (i % 9 == 0 && i < 81){
            board.push([])
            j++
        }
    }

    const isValid = isValidSudoku(board);
    if(!isValid) {
        invalidInput();
    }
    else {
        const solution = solveSudoku(board);
        updateHTML(solution, isValid);

    }
}

function solveSudoku(sudokuBoard) {
    if(sudokuSolved(sudokuBoard)) {
        return sudokuBoard;
    }
    else {
        const possibleBoards = generatePossibleBoards(sudokuBoard);

        const validSudokus = useValidBoards(possibleBoards);

        return findSolution(validSudokus);
    }
}

function findSolution(sudokuBoards) {
    if(sudokuBoards.length < 1) {
        return false;
    }
    else {
        // Incorporating backtracking to find valid sudoku

        let firstElement = sudokuBoards.shift();

        const currentPath = solveSudoku(firstElement);

        if(currentPath != false) {
            return currentPath;
        }
        else {
            return findSolution(sudokuBoards);
        }
    }
}

function sudokuSolved(sudokuBoard) {
    for (let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(sudokuBoard[i][j] == null) {
                return false;
            }
        }
    }

    return true;
}

function generatePossibleBoards(sudokuBoard) {
    let possibilities = [];

    // Finds first empty square
    const firstEmptySquare = searchEmptySquare(sudokuBoard);

    if(firstEmptySquare != undefined) {
        // Assuming x,y matrix for board
        const y = firstEmptySquare[0];
        const x = firstEmptySquare[1];

        for(let i = 1; i <= 9; i++) {
            let newSudoku = [...sudokuBoard];
            let row = [...newSudoku[y]];
            row[x] = i;
            newSudoku[y] = row;
            possibilities.push(newSudoku);
        }
    }

    return possibilities;
}

function searchEmptySquare(sudokuBoard) {
    // returns [y,x] coordinates of emtpy square

    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(sudokuBoard[i][j] == null) {
                return [i,j];
            }
        }
    }
}

// Filter function
function useValidBoards(sudokuBoards) {
    
    return sudokuBoards.filter((s) => isValidSudoku(s));
}

// Checks whether board passes conditions as a valid sudoku board
function isValidSudoku(sudokuBoard) {

    return validRows(sudokuBoard) && validCols(sudokuBoard) && validBoxes(sudokuBoard);
    
    // for(let i = 0; i < 9; i++) {
    //     let row = new Set();
    //     let col = new Set();
    //     let box = new Set();

    //     for(let j = 0; j < 9; j++) {
    //         let r = sudokuBoard[i][j];
    //         let c = sudokuBoard[j][i];
    //         let b = sudokuBoard[3*Math.floor(i/3)+Math.floor(j/3)][3*(i%3)+(j%3)];

    //         if(r != s) {
    //             if(row.has(r)) {
    //                 return false;
    //             }
    //             row.add(r);
    //         }

    //         if(c != s) {
    //             if(col.has(c)) {
    //                 return false;
    //             }
    //             col.add(c);
    //         }

    //         if(b != s) {
    //             if(box.has(b)) {
    //                 return false;
    //             }
    //             box.add(b);
    //         }
    //     }
    // }
    // return true;
}

function validRows(sudokuBoard) {
    for (let i = 0; i < 9; i++){
        let current = []
        for (let j = 0; j < 9; j++){
            if (current.includes(sudokuBoard[i][j])){
                return false;
            }
            else if (sudokuBoard[i][j] != null){
                current.push(sudokuBoard[i][j])
            }
        }
    }
    return true;
}

function validCols(sudokuBoard) {
    for (let i = 0; i < 9; i++){
        let current = []
        for (let j = 0; j < 9; j++){
            if (current.includes(sudokuBoard[j][i])){
                return false;
            }
            else if (sudokuBoard[j][i] != null){
                current.push(sudokuBoard[j][i])
            }
        }
    }
    return true;
}

function validBoxes(sudokuBoard) {
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]];
    
    for (let y = 0; y < 9; y += 3){
        for (let x = 0; x < 9; x += 3){
            let current = []
            for (let i = 0; i < 9; i++){
                let coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (current.includes(sudokuBoard[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (sudokuBoard[coordinates[0]][coordinates[1]] != null){
                    current.push(sudokuBoard[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true;
}

function updateHTML(sudokuBoard) {
    if(sudokuBoard == false) {
        for (i = 1; i <= 9; i++){
            document.getElementById("row " + String(i)).innerHTML = "NO SOLUTION EXISTS TO THE GIVEN BOARD"
        }
    }
    else {
        for (let i = 1; i <= 9; i++){
            let row = ""
            for (var j = 0; j < 9; j++){
                if (row == ""){
                    row = row + String(sudokuBoard[i - 1][j])
                }
                else {
                    row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(sudokuBoard[i - 1][j])
                }
            }
            document.getElementById("row " + String(i)).innerHTML = row
        }
    }
}

function invalidInput(){
    
    for (let i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = "BOARD IS INVALID OR CANNOT BE SOLVED!"
    }
}

console.log(solveSudoku(impossibleCase));