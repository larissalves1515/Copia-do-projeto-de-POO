class Flor extends Base {
  constructor(x, y, altura, largura, img, vel) {
    super(x, y, altura, largura, img);
    this.vel = vel;
    // Não redimensionamos aqui - fazemos no mostrar()
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

  mostrar() {
    // Desenha a imagem no tamanho desejado sem modificar a original
    image(this.img, this.x - 15, this.y + 25, this.larguraDesejada, this.alturaDesejada);
    
    // Hitbox
    const margemX = 60;
    const margemY = 35;
    noFill();
    stroke("red");
    rect(
      this.x - 15 + margemX / 2,
      this.y + 25 + margemY / 2,
      this.larguraDesejada - margemX,
      this.alturaDesejada - margemY
    );
  }
}