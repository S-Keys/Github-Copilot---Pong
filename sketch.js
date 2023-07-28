// All sounds and musics from FiftySounds: Track: Electric Fields - by https://www.fiftysounds.com

let bolaImagem;
let jogadorImagem;
let oponenteImagem;
let mesaImagem;
let r1Som;
let r2Som;
let pontoSom;
let trilhaSonora;
let pontoP1 = 0;
let pontoCpu = 0;


class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 20;
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
                this.y -= 4;
            }
            // se a bola estiver abaixo da raquete, move para baixo
            if (bola.y > this.y + this.h / 2) {
                this.y += 4;
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
        //fill(color(255, 255, 255));
        //rect(this.x, this.y, this.w, this.h);
    }
}

class Bola {
    constructor() {
        this.r = 17;
        this.reset();
        // angulo de rebote da bola
        this.ang = 0;
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
        
        // bola gira de acordo com a velocidade
        this.ang += this.vx / 25;

        if (this.x < this.r || this.x > width - this.r) {
            if (this.x < this.r) {
                pontoCpu++;
            } else {
                pontoP1++;
            }
            pontoSom.play();
            falaPonto();
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
            r2Som.play();
        }
        
        // verifica se a bola bateu na raquete
        if (this.x - this.r < jogador.x + jogador.w &&
            this.y - this.r < jogador.y + jogador.h &&
            this.y + this.r > jogador.y) {
            this.vx *= -1;
            r1Som.play();
        // aumenta a velocidade da bola
            this.vx *= 1.1;            
        }
    }

    desenha() {
        // rotaciona antes de desenhar
        push();
        translate(this.x, this.y);
        rotate(this.ang);
        imageMode (CENTER);
        image(bolaImagem, 0, 0, this.r * 2, this.r * 2);
        pop();
    }
}

let bola;
let jogador;
let oponente;

function falaPonto() {
    // use speechapi
    if('speechSynthesis' in window) {
        const pontuacao = "Jogo" + pontoP1 + " a " + pontoCpu;
        const msg = new SpeechSynthesisUtterance(pontuacao);
        msg.lang = 'pt-BR';
        // controla a velocidade
        msg.rate = 1.5;
        window.speechSynthesis.speak(msg);
    }
}

function preload() {
    bolaImagem = loadImage('bola.png');
    jogadorImagem = loadImage('barra01.png');
    oponenteImagem = loadImage('barra02.png');
    mesaImagem = loadImage('mesa2.png');
    r1Som = loadSound('r1.mp3');
    r2Som = loadSound('r2.mp3');
    pontoSom = loadSound('pontosom.mp3');
    trilhaSonora = loadSound('trilha.mp3');
}

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(8);
    oponente = new Raquete(width - 10 - 7);
    trilhaSonora.loop();
}

function draw() {
    //background(color(0, 0, 0));
    image(mesaImagem, 0, 0, width, height);
    bola.update();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    oponente.update();
    oponente.desenha();
}