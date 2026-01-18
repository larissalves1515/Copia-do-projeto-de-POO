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


