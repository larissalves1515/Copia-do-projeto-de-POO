class Homem extends Base {
  constructor(x, y, tamanho, altura, largura, vel, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.vel = vel;
    this.img.resize(0, this.img.height * 0.6);
  }

  mostrar() {
    // Desenha o homem na posição atual (que se move com o mundo)
    image(this.img, this.x - 15, this.y + 25);
    
    // Hitbox (opcional - para debug)
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
  }
}











  