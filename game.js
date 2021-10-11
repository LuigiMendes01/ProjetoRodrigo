class Board {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;

        this.squares = new Array(this.cols * this.rows).fill(0);
    }
}

let board = new Board(8, 8);

function load_fen(fen) {
    let starting_position = fen.split(" ")[0].replaceAll("/", "");
    let cont = 0;
    for (var i = 0; i < starting_position.length; i++) {
        if (isNaN(starting_position[i])) {
            board.squares[cont] = starting_position[i].toLowerCase();
            cont++;
        }
        else {
            cont += Number(starting_position[i]);
        }
    }
}

load_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

let width = 400;
let height = 400;

let black, white;
let x_size = width/8;
let y_size = height/8;

let highlight_x = 0;
let highlight_y = 0;
let highlight = false;

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
                case "p":
                    sprite = peao;
                    break;
                case "b":
                    sprite = bispo;
                    break;
                case "n":
                    sprite = cavalo;
                    break;
                case "r":
                    sprite = torre;
                    break;
                case "q":
                    sprite = rainha;
                    break;
                case "k":
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
