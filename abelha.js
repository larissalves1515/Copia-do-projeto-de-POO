class Abelha extends Base {
  constructor(x, y, tamanho, velX, velY, img, topoPlat) {
    const largura = img.width * tamanho;
    const altura = img.height * tamanho;
    
    super(x, y, altura, largura, img);

    this.tamanho = tamanho;
    this.velX = velX; // Não usado no movimento horizontal
    this.velY = velY;
    this.gravidade = 0.5;
    this.impulso = -(velY * 2);
    this.topoPlat = topoPlat;

    this.hitboxOffsetX = largura * 0.1;
    this.hitboxOffsetY = altura * 0.1;
    this.hitboxWidth = largura * 0.8;
    this.hitboxHeight = altura * 0.8;
  }

  mostrar() {
    // Abelha desenha na posição FIXA da tela
    image(this.img, this.x - 15, this.y, this.largura, this.altura);
    
    // Hitbox (opcional)
    noFill();
    stroke("red");
    rect(this.x + this.hitboxOffsetX, this.y + this.hitboxOffsetY, 
         this.hitboxWidth, this.hitboxHeight);
  }

  moverVertical() {
    this.velY += this.gravidade;

    if (keyIsDown(UP_ARROW)) {
      this.velY += this.impulso * 0.15;
    }

    this.velY = constrain(this.velY, -8, 8);
    this.y += this.velY;

    // Limites
    if (this.y < 0) {
      this.y = 0;
      this.velY = 0;
    }

    if (this.y > this.topoPlat - this.altura) {
      this.y = this.topoPlat - this.altura;
      this.velY = 0;
    }
  }

  colidiu(npc) {
    // Colisão considera que abelha está fixa e NPC se move
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




/*abelha.js
class Abelha extends Base {
  constructor(x, y, tamanho, velX, velY, img, topoPlat, camera) {
    const largura = img.width * tamanho;
    const altura = img.height * tamanho;
    
    super(x, y, altura, largura, img);

    this.tamanho = tamanho;
    this.velX = velX; // Esta será a velocidade horizontal AUTOMÁTICA
    this.velY = velY;
    this.gravidade = 0.5;
    this.forcaVoo = 8;
    this.topoPlat = topoPlat;
    this.camera = camera;

    // caixa de colisao proporcional
    this.hitboxOffsetX = largura * 0.1;
    this.hitboxOffsetY = altura * 0.1;
    this.hitboxWidth = largura * 0.8;
    this.hitboxHeight = altura * 0.8;
    
    this.offsetParada = 10;
  }

  mostrar() {
    const xTela = this.x - this.camera.x;
    const yTela = this.y - this.camera.y;
    
    image(this.img, xTela - 15, yTela, this.largura, this.altura);
    noFill();
    stroke("red");
    rect(xTela + this.hitboxOffsetX, yTela + this.hitboxOffsetY, 
         this.hitboxWidth, this.hitboxHeight);
  }

  // TEMPORARIAMENTE substitua TODO o moverHorizontal() por:
/*moverHorizontal() {
  console.log("=== TESTE RADICAL ===");
  console.log("Frame count:", frameCount);
  console.log("Abelha.x INICIAL:", this.x);
  console.log("Camera.x INICIAL:", this.camera.x);
  console.log("width:", width);
  
  // 1. SIMPLESMENTE aumenta ambos
  this.x += 10;
  this.camera.x += 10;
  
  console.log("Abelha.x FINAL:", this.x);
  console.log("Camera.x FINAL:", this.camera.x);
  console.log("=====================");
}*/
/*
  moverVertical() {
    this.velY += this.gravidade;
    
    // Ainda controla o voo vertical com UP_ARROW
    if (keyIsDown(UP_ARROW)) {
      this.velY = -this.forcaVoo;
    }
    
    this.y += this.velY;
    
    // Parar mais para baixo com offsetParada
    if (this.y + this.altura >= this.topoPlat + this.offsetParada) {
      this.y = this.topoPlat + this.offsetParada - this.altura;
      this.velY = 0;
    }
    
    if (this.y < 0) {
      this.y = 0;
      this.velY = 0;
    }
  }
   atualizarVertical() {
    this.moverVertical();
  }

  atualizar() {
    
    this.atualizarVertical();
  }
  

  colidiu(npc) {
    return (
      this.x + this.hitboxOffsetX + this.hitboxWidth > npc.x &&
      this.y + this.hitboxOffsetY + this.hitboxHeight > npc.y &&
      this.y + this.hitboxOffsetY < npc.y + npc.altura &&
      this.x + this.hitboxOffsetX < npc.x + npc.largura
    );
  }

  caiu() {
    return this.y + this.altura >= this.topoPlat + this.offsetParada;
  }
}*/

/*class Abelha extends Base {
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
*/