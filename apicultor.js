class Apicultor extends Base {
  constructor(x, y, tamanho, altura, largura, vel, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.status = 0;
    this.vel = vel;
    this.sentido = 0;
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

  mostrar() {
    image(this.img, this.x - 15, this.y + 25, this.larguraDesejada, this.alturaDesejada);
    
    const margemX = 45;
    const margemY = 35;
    noFill();
    // stroke("red");
    rect(
      this.x - 15 + margemX / 2,
      this.y + 25 + margemY / 2,
      this.larguraDesejada - margemX,
      this.alturaDesejada - margemY
    );
  }
}