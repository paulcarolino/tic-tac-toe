const gameBoard = (() => {

    const Player = (sign, name) => {
        this.sign = sign;
        this.name = name;
        return { sign, name };
    }
    var player1 = Player("X");
    var player2 = Player("O");
    var currPlayer = player1;

    var board = [['', '', ''], ['', '', ''], ['', '', '']];

    var gameOver = false;

    var resetButton = document.getElementById("reset");


    const resetGame = () => {
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                board[r][c] = "";
            }
        }
        Array.from(document.getElementById("board").children).forEach(tile => {
            tile.remove();
        });
        setGame();
        document.getElementById("title-announcement").classList.remove("blink_me");
        document.getElementById("title-announcement").innerHTML = "<h1>TIC TAC TOE</h1>";
        document.getElementById("board").style.opacity = "1";
        document.getElementById("reset").style.display = "none";

        gameOver = false
    }

    resetButton.addEventListener("click", resetGame);


    const setGame = () => {
        document.getElementById("board").style.cssText = "display:grid;"
        document.querySelector(".welcome-page").style.display = "none";
        player1.name = document.querySelector("#Player1").value
        player2.name = document.querySelector("#Player2").value


        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                let tile = document.createElement('div');
                tile.id = r.toString() + "-" + c.toString();
                tile.classList.add("tile");
                if (r == 0 || r == 1) {
                    tile.classList.add("horizontal-line");
                }
                if (c == 0 || c == 1) {
                    tile.classList.add("vertical-line");
                }
                tile.addEventListener("click", setTile);
                tile.addEventListener("mouseenter", setBackGroundColor);
                tile.addEventListener("mouseleave", setBackGroundColor);
                document.getElementById("board").append(tile);
            }
        }


    }



    function setBackGroundColor(evt) {
        if (gameOver) {
            this.style.backgroundColor = "";
            return;
        }
        if (evt.type == "mouseenter") {
            if (this.innerText == "") {
                if (currPlayer == player1) {
                    this.style.backgroundColor = "#94a3b8";
                } else if (currPlayer == player2) {
                    this.style.backgroundColor = "#34d399";
                }

            }
        }
        else if (evt.type == "mouseleave") {
            this.style.backgroundColor = ""
        }

    }



    function setTile() {
        if (gameOver) {

            return;
        }


        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);


        if (board[r][c] != '') {
            return;
        }



        board[r][c] = currPlayer.sign;
        this.innerText = currPlayer.sign;

        checkWinner();

        if (currPlayer == player1) {
            currPlayer = player2;

        } else {
            currPlayer = player1;

        }



    }

    const checkWinner = () => {
        //horizontally
        for (var r = 0; r < 3; r++) {
            if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != '') {
                for (var i = 0; i < 3; i++) {
                    var tile = document.getElementById(r.toString() + "-" + i.toString());
                    tile.classList.add(`winner-${currPlayer.sign}`);
                }
                gameOver = true;
            }
        }

        //vertically
        for (var c = 0; c < 3; c++) {
            if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != '') {
                for (var i = 0; i < 3; i++) {
                    var tile = document.getElementById(i.toString() + "-" + c.toString());
                    tile.classList.add(`winner-${currPlayer.sign}`);
                }
                gameOver = true;
            }
        }

        //diagonally
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
            for (var i = 0; i < 3; i++) {
                var tile = document.getElementById(i.toString() + "-" + i.toString());
                tile.classList.add(`winner-${currPlayer.sign}`);
            }
            gameOver = true;
        }

        //anti-diagonally
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '') {
            var tile = document.getElementById("0-2");
            tile.classList.add(`winner-${currPlayer.sign}`);

            tile = document.getElementById("1-1");
            tile.classList.add(`winner-${currPlayer.sign}`);

            tile = document.getElementById("2-0");
            tile.classList.add(`winner-${currPlayer.sign}`);
            gameOver = true;

        }

        //Check for DRAW
        if (!gameOver) {
            for (var r = 0; r < 3; r++) {
                for (var c = 0; c < 3; c++) {
                    if (board[r][c] == "") {
                        gameOver = false;
                        return;
                    } else {
                        gameOver = true;
                    }
                }
            }
        }


        if (gameOver) {

            document.getElementById("title-announcement").classList.add("blink_me");
            if (document.getElementsByClassName(`winner-${currPlayer.sign}`).length) {
                document.getElementById("title-announcement").innerText = currPlayer.name + " WINS!";

            } else {
                document.getElementById("title-announcement").innerText = "DRAW!";
            }
            document.getElementById("board").style.opacity = "0.5";
            document.getElementById("reset").style.display = "block";

            return;
        }
    }

    return { setGame };
})();


document.getElementById("start-game").addEventListener("click", gameBoard.setGame);

