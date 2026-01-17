class Arvore extends Base {
  constructor(x, y, tamanho, altura, largura, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    // Não redimensionamos aqui - fazemos no mostrar()
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

  mostrar() {
    // Desenha a imagem no tamanho desejado
    image(this.img, this.x, this.y, this.larguraDesejada, this.alturaDesejada);
    
    // Hitbox MENOR que a imagem visual (para facilitar a colisão)
    const margemX = this.larguraDesejada * 0.25; // MAIOR margem (era 0.1)
    const margemY = this.alturaDesejada * 0.4;  // MAIOR margem (era 0.2)
    noFill();
    stroke("green"); // Cor verde para diferenciar
    strokeWeight(2);
    rect(
      this.x + margemX / 2,
      this.y + margemY,
      this.larguraDesejada - margemX,
      this.alturaDesejada - margemY * 1.8 // MAIOR redução (era 1.5)
    );
    
    // Atualiza as propriedades de hitbox para a função colidiu() da abelha
    this.hitboxOffsetX = margemX / 2;
    this.hitboxOffsetY = margemY;
    this.hitboxWidth = this.larguraDesejada - margemX;
    this.hitboxHeight = this.alturaDesejada - margemY * 1.8;
  }
}