class Homem {
    constructor(x, y, tamanho, altura, largura, vel, img){
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.altura = altura;
        this.largura = largura;
        this.vel = vel;
        this.img = img;

        this.img.resize(0, this.img.height * 0.6);
    }

    mostrar(){
    image(this.img, this.x - 15, this.y + 25);
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
    }

    
}