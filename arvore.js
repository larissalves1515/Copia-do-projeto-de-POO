class Arvore extends Base { //herda de Base
  constructor(x, y, tamanho, altura, largura, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

mostrar() {
  image(this.img, this.x, this.y, this.larguraDesejada, this.alturaDesejada);

  // Margens para reduzir o hitbox
  const margemX = this.larguraDesejada * 0.6;
  const margemY = this.alturaDesejada * 0.18; 

  const hitboxX = this.x + margemX / 2;
  const hitboxY = this.y + margemY;
  const hitboxW = this.larguraDesejada - margemX;
  const hitboxH = this.alturaDesejada - margemY * 1.05;


  // Configuração da caixa de colisao
  this.hitboxOffsetX = margemX / 2;
  this.hitboxOffsetY = margemY;
  this.hitboxWidth = hitboxW;
  this.hitboxHeight = hitboxH;
}


}