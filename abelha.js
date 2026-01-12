class Abelha extends Base {
  constructor(x, y, tamanho, velX, velY, img, topoPlat) {
    const largura = img.width * tamanho;
    const altura  = img.height * tamanho;

    super(x, y, altura, largura, img);

    this.tamanho = tamanho;
    this.velX = velX;
    this.velY = velY;
    this.gravidade = 0.5;
    this.impulso = -(velY * 2);
    this.topoPlat = topoPlat;

    // caixa de colisao proporcional ao personagem
    this.hitboxOffsetX = largura * 0.1;
    this.hitboxOffsetY = altura * 0.1;
    this.hitboxWidth  = largura * 0.8;
    this.hitboxHeight = altura * 0.8;
  }

  mostrar() {
    image(this.img, this.x - 15, this.y, this.largura, this.altura);
    noFill();
    stroke("red");
    rect(this.x + this.hitboxOffsetX, this.y + this.hitboxOffsetY, this.hitboxWidth, this.hitboxHeight);
  }

  moverHorizontal() {
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velX;
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velX;
    this.x = constrain(this.x, 0, width - this.largura);
  }

  moverVertical() {
    this.velY += this.gravidade;
    this.y += this.velY;

    if (keyIsDown(UP_ARROW)) this.velY = this.impulso; // pulo
    this.y = constrain(this.y, 0, this.topoPlat - this.altura);
  }

  colidiu(npc) {
    return (
      this.x + this.largura > npc.x &&
      this.y + this.altura > npc.y &&
      this.y < npc.y + npc.altura &&
      this.x < npc.x + npc.largura
    );
  }

  caiu() {
    return this.y >= this.topoPlat - this.altura;
  }
}
