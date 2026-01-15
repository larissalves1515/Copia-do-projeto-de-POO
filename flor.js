class Flor extends Base {
  constructor(x, y, altura, largura, img, vel) {
    super(x, y, altura, largura, img);
    this.vel = vel; // Velocidade pode ser usada para animação
    this.img.resize(0, altura);
  }

  mostrar() {
    // Desenha a flor na posição atual (que se move com o mundo)
    image(this.img, this.x - 15, this.y + 17);
    
    // Hitbox (opcional - para debug)
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
  }
}


/*class Flor {
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
    image(this.img, this.x - 15, this.y + 17);
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
  }
}
*/