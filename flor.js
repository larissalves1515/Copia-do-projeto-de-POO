class Flor extends Base {
  constructor(x, y, altura, largura, img, vel) {
    super(x, y, altura, largura, img);
    this.vel = vel;
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

  mostrar() {
  // Posição real da imagem
  const imgX = this.x - 15;
  const imgY = this.y + 25;

  image(this.img, imgX, imgY, this.larguraDesejada, this.alturaDesejada);

 
   const margemX = 60;
   const margemY = 25; 

  const hitboxX = this.x - 15 + margemX / 2;
  const hitboxY = this.y + 25 + margemY / 2 - 8; 
  const hitboxW = this.larguraDesejada - margemX;
  const hitboxH = this.alturaDesejada - margemY + 10; 


  // Debug visual
  // noFill();
  // stroke("red");
  // rect(hitboxX, hitboxY, hitboxW, hitboxH);

  this.hitboxOffsetX = hitboxX - this.x;
  this.hitboxOffsetY = hitboxY - this.y;
  this.hitboxWidth = hitboxW;
  this.hitboxHeight = hitboxH;
}

}