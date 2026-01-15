class Plataforma extends Base {
  constructor(x, y, tamanho, altura, largura, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
  }

  mostrar() {
    // Desenha a plataforma na posição atual (que se move com o mundo)
    image(this.img, this.x, this.y, this.largura, this.altura);
  }
}


/*class Plataforma {
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
}*/