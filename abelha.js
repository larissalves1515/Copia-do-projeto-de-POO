class Abelha extends Base {
  constructor(x, y, tamanho, velX, velY, img, topoPlat) {
    const largura = img.width * tamanho;
    const altura  = img.height * tamanho;

    super(x, y, altura, largura, img);

    this.tamanho = tamanho;
    this.velX = velX;
    this.velY = velY;
    this.gravidade = 0.5;
  

    this.topoPlat = topoPlat;
    // limite máximo que a abelha pode descer (acima da plataforma)
    this.limiteVooInferior = this.topoPlat - this.altura * 0.32;

    this.hitboxOffsetX = largura * 0.14;
    this.hitboxOffsetY = altura * 0.30;
    this.hitboxWidth  = largura * 0.7;
    this.hitboxHeight = altura * 0.5;
  }

  mostrar() {
    image(this.img, this.x, this.y, this.largura, this.altura);
    noFill();
    stroke("red");
    rect(this.x + this.hitboxOffsetX, this.y + this.hitboxOffsetY, this.hitboxWidth, this.hitboxHeight);
   }


moverVertical() {
  // gravidade sempre atua
  this.velY += this.gravidade;

  // limite de velocidade
  this.velY = constrain(this.velY, -7, 9);

  this.y += this.velY;

  // não sair da tela por cima
  if (this.y < 0) {
    this.y = 0;
    this.velY = 0;
  }
  if (this.y > this.limiteVooInferior) {
    this.y = this.limiteVooInferior;
    this.velY = 0;
  }
}

pular() {
  this.velY = -12; 
}

colidiu(npc) {
  const ax = this.x + this.hitboxOffsetX;
  const ay = this.y + this.hitboxOffsetY;
  const aw = this.hitboxWidth;
  const ah = this.hitboxHeight;

  const bx = npc.x + (npc.hitboxOffsetX || 0);
  const by = npc.y + (npc.hitboxOffsetY || 0);
  const bw = npc.hitboxWidth  || npc.largura;
  const bh = npc.hitboxHeight || npc.altura;

  return (
    ax < bx + bw &&
    ax + aw > bx &&
    ay < by + bh &&
    ay + ah > by
  );
}


caiu() {
  return this.y > height;
}
}