const gameBoard = (() => {
    let array = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];

    const checkHorizontal = (row) => {
        for (let i = 0; i < 2; i++) {
            if (array[row][i] !== array[row][i + 1]) return false;
        }
        return true;
    };

    const checkVertical = (col) => {
        for (let i = 0; i < 2; i++) {
            if (array[i][col] !== array[i + 1][col]) return false;
        }
        return true;
    };

    const checkDiagonalTL = (val) =>
        array[0][0] == val && array[1][1] == val && array[2][2] == val;

    const checkDiagonalTR = (val) =>
        array[0][2] == val && array[1][1] == val && array[2][0] == val;

    const isWin = (val) => {
        for (let i = 0; i < 3; i++) {
            if (array[i][0] == val && checkHorizontal(i)) return true;
            if (array[0][i] == val && checkVertical(i))   return true;
        }
        return checkDiagonalTL(val) || checkDiagonalTR(val);
    };

    const place = (row, col, val) => {
        if (array[row][col] !== -1) return false;
        array[row][col] = val;
        return true;
    };

    const isFull = () => array.every(row => row.every(cell => cell !== -1));

    const reset = () => {
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 3; c++)
                array[r][c] = -1;
    };

    return { isWin, place, isFull, reset };
})();


function createPlayer(name, team) {
    return { name, score: 0, team };
}


const displayBoard = (() => {
    let playerOne    = null;
    let playerTwo    = null;
    let currentPlayer = null;
    let gameActive   = false;

    const cellIdToIndex = {
        "top-left":    [0, 0],
        "top-mid":     [0, 1],
        "top-right":   [0, 2],
        "mid-left":    [1, 0],
        "middle":      [1, 1],
        "mid-right":   [1, 2],
        "bottom-left": [2, 0],
        "bottom-mid":  [2, 1],
        "bottom-right":[2, 2],
    };

    const updateDisplay = (msg) => {
        document.querySelector("#display h2").textContent = msg;
    };

    const updateScoreboard = () => {
        const p1div = document.getElementById("p1-info");
        const p2div = document.getElementById("p2-info");
        if (p1div) p1div.textContent = `${playerOne.name} (${playerOne.team}): ${playerOne.score} pts`;
        if (p2div) p2div.textContent = `${playerTwo.name} (${playerTwo.team}): ${playerTwo.score} pts`;
    };

    const handleCellClick = (event) => {
        if (!gameActive) return;

        const button = event.target;
        if (button.querySelector("img")) return;

        const container = button.parentElement;
        const [row, col] = cellIdToIndex[container.id];
        const val = currentPlayer.team === "X" ? 1 : 0;

        if (!gameBoard.place(row, col, val)) return;

        const img = document.createElement("img");
        img.src = currentPlayer.team === "X"
            ? "images/an-illustration-of-on-transparent-background-png.webp"
            : "images/circle-png-8.png";
        img.style.width  = "80%";
        img.style.height = "80%";
        img.style.pointerEvents = "none";
        button.appendChild(img);

        if (gameBoard.isWin(val)) {
            currentPlayer.score++;
            updateDisplay(`${currentPlayer.name} (${currentPlayer.team}) wins!`);
            updateScoreboard();
            gameActive = false;
            return;
        }

        if (gameBoard.isFull()) {
            updateDisplay("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        updateDisplay(`${currentPlayer.name}'s turn (${currentPlayer.team})`);
    };

    const startGame = () => {
        playerOne    = createPlayer(prompt("Player 1, enter your name:"), prompt("Player 1, enter your team (X or O):").toUpperCase());
        playerTwo    = createPlayer(prompt("Player 2, enter your name:"), prompt("Player 2, enter your team (X or O):").toUpperCase());
        currentPlayer = playerOne;
        gameActive   = true;

        gameBoard.reset();

        const display = document.getElementById("display");
        display.innerHTML = "<h2></h2>";
        const p1div = document.createElement("div");
        p1div.id = "p1-info";
        const p2div = document.createElement("div");
        p2div.id = "p2-info";
        display.appendChild(p1div);
        display.appendChild(p2div);
        updateScoreboard();

        document.querySelectorAll(".grid-item button").forEach(b => b.innerHTML = "");
        updateDisplay(`${currentPlayer.name}'s turn (${currentPlayer.team})`);
    };

    const restartGame = () => {
        if (!playerOne) return;

        gameBoard.reset();
        gameActive    = true;
        currentPlayer = playerOne;

        document.querySelectorAll(".grid-item button").forEach(b => b.innerHTML = "");
        updateDisplay(`${currentPlayer.name}'s turn (${currentPlayer.team})`);
    };

    const init = () => {
        document.getElementById("start").addEventListener("click", startGame);
        document.getElementById("restart").addEventListener("click", restartGame);
        document.querySelectorAll(".grid-item button").forEach(btn => {
            btn.addEventListener("click", handleCellClick);
        });
        updateDisplay("Press Start to play!");
    };

    return { init };
})();

displayBoard.init();