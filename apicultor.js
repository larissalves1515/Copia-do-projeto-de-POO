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

    // ===== HITBOX AJUSTADA =====
    const margemX = 45;
    const margemY = 30;

    const hitboxX = this.x - 15 + margemX / 2;
    const hitboxY = this.y + 25 + margemY / 2 - 8; // sobe
    const hitboxW = this.larguraDesejada - margemX;
    const hitboxH = this.alturaDesejada - margemY + 12; // mais alto

    // // Debug
    // noFill();
    // stroke("red");
    // rect(hitboxX, hitboxY, hitboxW, hitboxH);

    // Hitbox real
    this.hitboxOffsetX = hitboxX - this.x;
    this.hitboxOffsetY = hitboxY - this.y;
    this.hitboxWidth = hitboxW;
    this.hitboxHeight = hitboxH;
  }
}



