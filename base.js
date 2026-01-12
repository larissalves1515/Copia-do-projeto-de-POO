class Base {
  constructor(x, y, altura, largura, img) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;
    this.img = img;
  }

  mostrar() {
    image(this.img, this.x - 15, this.y);
  }

  mostrarHitbox(cor = "red") {
    noFill();
    stroke(cor);
    rect(this.x, this.y, this.largura, this.altura);
  }
}
