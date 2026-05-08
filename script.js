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
    let playerTwo = null;;

    const addPlayer = (name, score, team) => {
        name = prompt("Enter Name:");
        team = prompt("Enter Team (X or O):");

        if (playerTwo == null){
            playerOne = createPlayer(name, 0 ,team);
        }

        if (playerOne == null){
            playerTwo = createPlayer(name, 0, team);
        }


        return player;
    }

    const placeX = () => {
        // Put DOM logic here
    }


    

})();


