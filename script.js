const gameBoard = (() => {
    let array = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];

    const isXWin = (array) => {
        // Horizontal Wins
        for (let i = 0; i < 2; i++) {
            if (array[i][0] == 1){
                if (checkHorizontal(array, i)){
                    console.log("Horizontal win at row " + i);
                    return true;
                }
            }
        }

        // Vertical Win
        for (let i = 0; i < 2; i++){
            if (array[0][i] == 1){
                if (checkVertical(array, i) == true){
                    console.log("Vertical win at column " + i);
                    return true;
                }
            }
        }

        // Diagonal Win
        if (array[0][0] == 1){
            return checkDiagonalTL(array);
        }
        else if (array[2][0] == 1){
            return checkDiagonalTR(array);
        }

        return false;
    }

    const isOWin = (array) => {
        // Horizontal Wins
        for (let i = 0; i < 2; i++) {
            if (array[i][0] == 0){
                if (checkHorizontal(array, i)){
                    console.log("Horizontal win at row " + i);
                    return true;
                }
            }
        }

        // Vertical Win
        for (let i = 0; i < 2; i++){
            if (array[0][i] == 0){
                if (checkVertical(array, i) == true){
                    console.log("Vertical win at column " + i);
                    return true;
                }
            }
        }

        // Diagonal Win
        if (array[0][0] == 0){
            return checkDiagonalTL(array);
        }
        else if (array[2][0] == 0){
            return checkDiagonalTR(array);
        }

        return false;
    }

    const checkHorizontal = (array, row) => {
        let response = false;

        for (let i = 0; i < 2; i++) {
            if (array[row][i] == array[row][i+1]){
                response = true;
            }
            else return false;
        }

        return response;
    }

    const checkVertical = (array, col) => {
        let response = false;

        for (let i = 0; i < 2; i++) {
            if (array[i][col] == array[i+1][col]){
                response = true;
            }
            else return false;
        }

        return response;
    }

    const checkDiagonalTL = (array) => {
        // Top Left
        if (array[0][0] == array[1][1] && array[0][0] == array[2][2]){
            console.log("Diagonal top left win")
            return true;
        }
        return false;
    }

    const checkDiagonalTR = (array) => {
        // Top Right
        if (array[0][2] == array[1][1] && array[0][2] == array[2][0]){
            console.log("Diagonal top right win")
            return true;
        }
        return false;
    }

    return {isOWin, isXWin, array};
})();

function createPlayer(name, score, team){
    return {name, score, team};

}

const displayBoard = (() => {
    let playerOne = null;
    let playerTwo = null;

    const addPlayer = () => {
        let name = prompt("Enter Name:");
        let team = prompt("Enter Team (X or O):");

        if (playerOne == null){
            playerOne = createPlayer(name, 0 ,team);
        }

        if (playerOne != null){
            playerTwo = createPlayer(name, 0, team);
        }

        const div = document.createElement("div");
        div.id = name;
        div.innerHTML = name + ": " + team + ", " + score;

        const element = document.getElementById("display");

        element.appendChild(div);
    }


    const placeX = (array, event) => {
        const container = event.target.parentElement;
        array = gameBoard.array;

        const imageX = document.createElement("img");
        imageX.src = '/images/an-illustration-of-on-transparent-background-png.webp' // X image

        document.container.appendChild(container);

        if (container.id == "top-left") {array[0][0] == 1}
            else if (container.id == "top-mid") {array[0][1] == 1}
            else if (container.id == "top-right") {array[0][2] == 1};
        
        if (container.id == "mid-left") {array[1][0] == 1}
            else if (container.id == "middle") {array[1][1] == 1}
            else if (container.id == "mid-right") {array[1][2] == 1};

        if (container.id == "bottom-left") {array[2][0] == 1}
            else if (container.id == "bottom-mid") {array[2][1] == 1}
            else if (container.id == "bottom-right") {array[2][2] == 1};

        const button = event.target;
        button.addEventListener('click', placeX);
    }

    const placeO = (event) => {
        const container = event.target.parentElement;

        const imageO = document.createElement("img");
        imageO.src = '/images/circle-png-8.png' // O image

        document.container.appendChild(container);

        if (container.id == "top-left") {array[0][0] == 0}
            else if (container.id == "top-mid") {array[0][1] == 0}
            else if (container.id == "top-right") {array[0][2] == 0};
        
        if (container.id == "mid-left") {array[1][0] == 1}
            else if (container.id == "middle") {array[1][1] == 0}
            else if (container.id == "mid-right") {array[1][2] == 0};

        if (container.id == "bottom-left") {array[2][0] == 1}
            else if (container.id == "bottom-mid") {array[2][1] == 0}
            else if (container.id == "bottom-right") {array[2][2] == 0};

        const button = event.target;
        button.addEventListener('click', placeO);
    }

    const startGame = () => {
        addPlayer();
        addPlayer();

        const startButton = document.getElementById("start");
        startButton.addEventListener('click', startGame);
    }

    const restartGame = () => {
        document.querySelectorAll(".grid-item").forEach(element => {
            const element = document.querySelector("img");
            element.remove();
        })

        const restartButton = document.getElementById("restart");
        restartButton.addEventListener('click', restartGame);
    }

    return {placeX, placeO, startGame, restartGame};
})();


