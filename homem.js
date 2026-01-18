class Homem extends Base {
  constructor(x, y, tamanho, altura, largura, vel, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.vel = vel;
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

  mostrar() {
    
    // Posição real da imagem na tela
    const imgX = this.x - 15;
    const imgY = this.y + 25;

    image(this.img, imgX, imgY, this.larguraDesejada, this.alturaDesejada);

    // Margens para reduzir o hitbox
    const margemX = this.larguraDesejada * 0.32; 
    const margemY = this.alturaDesejada * 0.18; 

    const hitboxX = imgX + margemX / 2;
    const hitboxY = imgY + margemY / 2;
    const hitboxW = this.larguraDesejada - margemX;
    const hitboxH = this.alturaDesejada - margemY * 0.85; 

    // // // Debug
    // noFill();
    // stroke("red");
    // rect(hitboxX, hitboxY, hitboxW, hitboxH);

    //hitbox real usado na colisão
    this.hitboxOffsetX = hitboxX - this.x;
    this.hitboxOffsetY = hitboxY - this.y;
    this.hitboxWidth = hitboxW;
    this.hitboxHeight = hitboxH;
  }

}