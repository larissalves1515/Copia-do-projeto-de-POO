class Apicultor extends Base { //herda de base
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

    
    // Margens para reduzir o hitbox
    const margemX = 45;
    const margemY = 30;

    //Posição-hitbox
    const hitboxX = this.x - 15 + margemX / 2;
    const hitboxY = this.y + 25 + margemY / 2 - 8;
    //Tamanho-hitbox
    const hitboxW = this.larguraDesejada - margemX;
    const hitboxH = this.alturaDesejada - margemY + 12; 

    // Configuração da hitbox
    this.hitboxOffsetX = hitboxX - this.x;
    this.hitboxOffsetY = hitboxY - this.y;
    this.hitboxWidth = hitboxW;
    this.hitboxHeight = hitboxH;
  }
}



