// nuvem.js - VERSÃO CORRIGIDA
class Nuvem extends Base {
  constructor(x, y, tamanho, img, velocidade) {
    // IMPORTANTE: Multiplicar pelo tamanho para ficar pequeno
    const largura = img.width * tamanho;
    const altura = img.height * tamanho;
    
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.velocidade = velocidade;
    
    console.log(`NUVEM: tamanho=${tamanho}, largura=${largura.toFixed(0)}px, altura=${altura.toFixed(0)}px`);
  }

  mostrar() {
    // Desenha SEM redimensionar a imagem original
    image(this.img, this.x, this.y, this.largura, this.altura);
  }
}