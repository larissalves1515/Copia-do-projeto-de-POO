class Nuvem extends Base { //herda de base
  constructor(x, y, tamanho, img, velocidade) {
    const largura = img.width * tamanho;
    const altura = img.height * tamanho;
    
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.velocidade = velocidade;
   
  }

  mostrar() {
    image(this.img, this.x, this.y, this.largura, this.altura);
  }
}