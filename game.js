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
console.log(starting_position);
console.log(starting_position.split("/"));

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

function setup() {
    canvas = createCanvas(width, height);
    canvas.mousePressed(set_highlightSquare);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    print(canvas.oncontextmenu);
    black = color(0, 0, 0);
    white = color(255, 255, 255);
    size = 30;
}

function draw() {
    background(220);
    noStroke();
    
    draw_board();

    // desenhar quadrado destaque
    fill("RED");
    if (highlight) {
        rect(destaque_x, destaque_y, x_size, y_size);
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
