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


moverVertical() {

  this.velY += this.gravidade;

  if (keyIsDown(UP_ARROW)) {
    this.velY = this.impulso;
  }


  this.velY = constrain(this.velY, -7, 9);

  this.y += this.velY;

  if (this.y < 0) {
    this.y = 0;
    this.velY = 0;
  }
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
  return this.y > height;
}
}

