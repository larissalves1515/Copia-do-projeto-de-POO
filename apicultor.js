class Apicultor extends Base {
  constructor(x, y, tamanho, altura, largura, vel, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.status = 0;
    this.vel = vel;
    this.sentido = 0; // cima
    this.img.resize(0, this.img.height * 0.6);
  }

  mostrar() {
  const margemX = 45; // diminui dos lados
  const margemY = 35; // diminui em cima e embaixo

  image(this.img, this.x - 15, this.y + 25);

  noFill();
  // stroke("red");
  rect(
    this.x - 15 + margemX / 2,
    this.y + 25 + margemY / 2,
    this.img.width - margemX,
    this.img.height - margemY
  );
}
}