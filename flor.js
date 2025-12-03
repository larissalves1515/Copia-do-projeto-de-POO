class Flor {
  constructor(x, y, altura, largura, img, vel) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;
    this.img = img;
    this.vel = vel;

    this.img.resize(0, altura);
  }

  mostrar() {
    image(this.img, this.x - 15, this.y);
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
  }
}

