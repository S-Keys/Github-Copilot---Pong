let bolaImagem;
let jogadorImagem;
let oponenteImagem;

class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 120;
        }
    update() {
        // se for o jogador 1 
        if (this.x < width / 2) {
            // movimento da raquete
            if (keyIsDown(UP_ARROW)) {
                this.y -= 10;
            }
            if (keyIsDown(DOWN_ARROW)) {
                this.y += 10;
            }
        } else {
            // se a bola estiver acima da raquete, move para cima
            if (bola.y < this.y + this.h / 2) {
                this.y -= 5;
            }
            // se a bola estiver abaixo da raquete, move para baixo
            if (bola.y > this.y + this.h / 2) {
                this.y += 5;
            }
        }

        // impede que a raquete saia da tela
        this.y = constrain(this.y, 0, height - this.h);
    }
    desenha() {
        // se a raquete for do jogador
        if (this.x < width / 2) {
            image(jogadorImagem, this.x, this.y, this.w, this.h);
        } else {
            image(oponenteImagem, this.x, this.y, this.w, this.h);
        }

        fill(color(255, 255, 255));
        rect(this.x, this.y, this.w, this.h);
    }
}

class Bola {
    constructor() {
        this.r = 20;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() * 4-7 - 1;
        this.vy = Math.random() * 4-7 - 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.r || this.x > width - this.r) {
            this.reset();
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }
        // verifica se a bola bateu na raquete do oponente
        if (this.x + this.r > oponente.x &&
            this.y - this.r < oponente.y + oponente.h &&
            this.y + this.r > oponente.y) {
            this.vx *= -1;
        }
        
        // verifica se a bola bateu na raquete
        if (this.x - this.r < jogador.x + jogador.w &&
            this.y - this.r < jogador.y + jogador.h &&
            this.y + this.r > jogador.y) {
            this.vx *= -1;
        // aumenta a velocidade da bola
            this.vx *= 1.1;
        }
    }

    desenha() {
        // desenha a bola
        image(bolaImagem, this.x, this.y, this.r * 2, this.r * 2);
        fill(color(255, 0, 0))
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

let bola;
let jogador;
let oponente;

function preload() {
    bolaImagem = loadImage('bola.png');
    jogadorImagem = loadImage('barra01.png');
    oponenteImagem = loadImage('barra02.png');
}

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(10);
    oponente = new Raquete(width - 10 - 10);
}

function draw() {
    background(color(0, 0, 0));
    bola.update();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    oponente.update();
    oponente.desenha();
}