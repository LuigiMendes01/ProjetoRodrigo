class Board {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;

        this.squares = new Array(this.cols * this.rows).fill(0);
    }
}

let board = new Board(8, 8);
board.squares[0] = "torre";
board.squares[1] = "cavalo";
board.squares[2] = "bispo";
board.squares[3] = "rainha";
board.squares[4] = "rei";
board.squares[5] = "bispo";
board.squares[6] = "cavalo";
board.squares[7] = "torre";
board.squares[8] = "peão";
board.squares[9] = "peão";
board.squares[10] = "peão";
board.squares[11] = "peão";
board.squares[12] = "peão";
board.squares[13] = "peão";
board.squares[14] = "peão";
board.squares[15] = "peão";

board.squares[48] = "peão";
board.squares[49] = "peão";
board.squares[50] = "peão";
board.squares[51] = "peão";
board.squares[52] = "peão";
board.squares[53] = "peão";
board.squares[54] = "peão";
board.squares[55] = "peão";
board.squares[56] = "torre";
board.squares[57] = "cavalo";
board.squares[58] = "bispo";
board.squares[59] = "rainha";
board.squares[60] = "rei";
board.squares[61] = "bispo";
board.squares[62] = "cavalo";
board.squares[63] = "torre";

let width = 400;
let height = 400;

let black, white;
let x_size = width/8;
let y_size = height/8;

let highlight_x = 0;
let highlight_y = 0;
let highlight = false;

let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let starting_position = fen.split(" ")[0];

function set_white(White) {
    white = color(White);
}
function set_black(Black) {
    black = color(Black);
}

function draw_board() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if ((x+y) % 2 == 0) { c = white; }
            if ((x+y) % 2 == 1) { c = black; }

            fill(c);
            rect(x * x_size, y * y_size, x_size, y_size);
        }
    }
}

function draw_highlightSquare() {
    fill("RED");
    if (highlight) {
        rect(destaque_x, destaque_y, x_size, y_size);
    }
}

let peao, bispo, cavalo, torre, rainha, rei;
function preload() {
    peao = loadImage("peao.png");
    bispo = loadImage("bispo.png");
    cavalo = loadImage("cavalo.png");
    torre = loadImage("torre.png");
    rainha = loadImage("rainha.png");
    rei = loadImage("rei.png");
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.mousePressed(set_highlightSquare);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    black = color(0, 0, 0);
    white = color(255, 255, 255);
    size = 30;
}

function draw() {
    background(220);
    noStroke();
    
    draw_board();
    draw_highlightSquare();
    // desenhar peças
    for (piece in board.squares) {
        if (board.squares[piece] != 0) {
            let piece_x = piece;
            let piece_y = 0;
            while (piece_x >= 8) {
                piece_x -= 8;
                piece_y++;
            }

            let x = piece_x * x_size;
            let y = piece_y * y_size;
            let sprite;
            
            switch(board.squares[piece]) {
                case "peão":
                    sprite = peao;
                    break;
                case "bispo":
                    sprite = bispo;
                    break;
                case "cavalo":
                    sprite = cavalo;
                    break;
                case "torre":
                    sprite = torre;
                    break;
                case "rainha":
                    sprite = rainha;
                    break;
                case "rei":
                    sprite = rei;
                    break;
                default:
                    break;
            }

            image(sprite, x, y);
        }
    }
}

function set_highlightSquare() {
    switch (mouseButton) {
        case LEFT:
            highlight = true;
            destaque_x = Math.floor(mouseX/x_size) * x_size;
            destaque_y = Math.floor(mouseY/y_size) * y_size;
            break;
        case RIGHT:
            highlight = false;
            break;
        default:
            break;
    }
}
