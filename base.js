class Base {
  constructor(x, y, altura, largura, img) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;
    this.img = img;
  }

  // Método base que pode ser sobrescrito pelas classes filhas
  mostrar() {
    // Desenha a imagem na posição (x, y) com o tamanho especificado
    image(this.img, this.x, this.y, this.largura, this.altura);
  }

  // Método para debug (hitbox)
  mostrarHitbox(cor = "red") {
    noFill();
    stroke(cor);
    rect(this.x, this.y, this.largura, this.altura);
  }
}


/*base.js
class Base {
  constructor(x, y, altura, largura, img) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;
    this.img = img;
  }

  mostrar() {
    // Esta será sobrescrita nas classes filhas com offset da câmera
    image(this.img, this.x - 15, this.y);
  }

  mostrarHitbox(cor = "red") {
    noFill();
    stroke(cor);
    rect(this.x, this.y, this.largura, this.altura);
  }
}


*/
