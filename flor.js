class Flor extends Base {
  constructor(x, y, altura, largura, img, vel) {
    super(x, y, altura, largura, img);
    this.vel = vel; // Velocidade pode ser usada para animação
    this.img.resize(0, altura);
  }

  mostrar() {
  const margemX = 60; // diminui dos lados
  const margemY = 35; // diminui em cima e embaixo

  image(this.img, this.x - 15, this.y + 25);

  noFill();
  stroke("red");
  rect(
    this.x - 15 + margemX / 2,
    this.y + 25 + margemY / 2,
    this.img.width - margemX,
    this.img.height - margemY
  );
}
}