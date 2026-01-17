// base.js - VERIFIQUE SE ESTÁ ASSIM
class Base {
  constructor(x, y, altura, largura, img) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;
    this.img = img;
    
    // NÃO fazer isso ↓ (remove se tiver)
    // this.img.resize(this.largura, this.altura);
  }

  mostrar() {
    // Usa this.largura e this.altura que já foram calculadas
    image(this.img, this.x, this.y, this.largura, this.altura);
  }

  mostrarHitbox(cor = "red") {
    noFill();
    stroke(cor);
    rect(this.x, this.y, this.largura, this.altura);
  }
}