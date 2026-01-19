class Plataforma extends Base { //herda de base
  constructor(x, y, tamanho, altura, largura, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
  }

  mostrar() {
    
    image(this.img, this.x, this.y, this.largura, this.altura);
  }
}


