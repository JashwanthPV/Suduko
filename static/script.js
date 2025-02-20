let originalBoard = [];

function fetchSudoku() {
    fetch("/generate")
        .then(response => response.json())
        .then(board => {
            originalBoard = board;
            displayBoard(board);
        });
}

function displayBoard(board) {
    const boardDiv = document.getElementById("sudoku-board");
    boardDiv.innerHTML = "";

    board.forEach((row, rowIndex) => {
        row.forEach((num, colIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (num !== 0) {
                cell.innerText = num;
            } else {
                cell.setAttribute("contenteditable", "true");
            }

            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
            boardDiv.appendChild(cell);
        });
    });
}

function validateSudoku() {
    const cells = document.querySelectorAll(".cell");
    let valid = true;

    cells.forEach(cell => {
        if (cell.getAttribute("contenteditable") === "true") {
            let value = cell.innerText.trim();
            if (value === "" || isNaN(value) || value < 1 || value > 9) {
                valid = false;
                cell.style.backgroundColor = "red";
            } else {
                cell.style.backgroundColor = "white";
            }
        }
    });

    document.getElementById("message").innerText = valid ? "✅ Looks Good!" : "❌ Invalid Entries!";
}

function resetBoard() {
    displayBoard(originalBoard);
    document.getElementById("message").innerText = "";
}

fetchSudoku(); // Load a new puzzle on page load
