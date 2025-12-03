class Plataforma {
    constructor(x, y, tamanho, altura, largura, img){
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.altura = altura;
        this.largura = largura;
        this.img = img;

        this.img.resize(0, this.altura);
    }

    mostrar(){
    image(this.img, this.x - 15, this.y);

    
}
}