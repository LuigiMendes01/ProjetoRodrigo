let width = 400;
let height = 400;

let black, white;
let x_size = width/8;
let y_size = height/8;

function setup() {
    createCanvas(width, height);
    black = color(0, 0, 0);
    white = color(255, 255, 255);
    size = 30;
}

function draw() {
    background(220);
    noStroke();
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if ((x+y) % 2 == 0) { c = white; }
            if ((x+y) % 2 == 1) { c = black; }

            fill(c);
            rect(x * x_size, y* y_size, x_size, y_size);
        }
    }

}