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
            board.squares[cont] = starting_position[i];
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

let cores = [
    ["#99c1f1", "#1a5fb4"],
    ["#8ff0a4", "#26a269"],
    ["#f9f06b", "#e5a50a"],
    ["#ffbe6f", "#e66100"],
    ["#f66151", "#a51d2d"],
    ["#dc8add", "#613583"],
    ["#cdab8f", "#63452c"],
    ["#ffffff", "#9a9996"],
    ["#77767b", "#3d3846"]
];
let a = 0;

function set_white(newWhite) {
    white = color(newWhite);
    document.getElementById("white").value = newWhite;
}

function set_black(newBlack) {
    black = color(newBlack);
    document.getElementById("black").value = newBlack;
}

function prev_color() {
    if (a > 0) {
        a--;
    }
    else {
        a = cores.length - 1;
    }

    set_white(cores[a][0]);
    set_black(cores[a][1]);
}

function next_color() {
    if (a < cores.length - 1) {
        a++;
    }
    else {
        a = 0;
    }
    set_white(cores[a][0]);
    set_black(cores[a][1]);
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

let wp, wb, wn, wr, wq, wk,
    bp, bb, bn, br, bq, bk;
let sprites;
function preload() {
    wp = loadImage("wp.png");
    wb = loadImage("wb.png");
    wn = loadImage("wn.png");
    wr = loadImage("wr.png");
    wq = loadImage("wq.png");
    wk = loadImage("wk.png");

    bp = loadImage("bp.png");
    bb = loadImage("bb.png");
    bn = loadImage("bn.png");
    br = loadImage("br.png");
    bq = loadImage("bq.png");
    bk = loadImage("bk.png");
    sprites = {
        P:wp, B:wb, N:wn, R:wr, Q:wq, K:wk,
        p:bp, b:bb, n:bn, r:br, q:bq, k:bk
    };
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.mousePressed(set_highlightSquare);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    white = color(cores[0][0]);
    black = color(cores[0][1]);
    size = 30;
}

function draw() {
    background(220);
    noStroke();
    
    draw_board();
    draw_highlightSquare();
    // desenhar peças
    for (piece in board.squares) {
        piece_type = board.squares[piece];
        if (piece_type != 0) {
            let piece_x = piece;
            let piece_y = 0;
            while (piece_x >= 8) {
                piece_x -= 8;
                piece_y++;
            }

            let x = piece_x * x_size;
            let y = piece_y * y_size;
            let sprite = sprites[piece_type];
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
