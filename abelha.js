class Abelha {
    constructor (x, y, tamanho, altura, largura, velX, velY, img, topoPlat){
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.altura = altura;
        this.largura = largura;
        this.img = img;
        this.status = 0;
        this.impulso = -(velY * 2);
        this.velX = velX;
        this.velY = velY;
        this.gravidade = 0.5;
        this.sentido = 0; //cima
        this.topoPlat = topoPlat;
        
        this.img.resize(0, this.img.height * 0.6);
    }

mostrar() {
    image(this.img, this.x - 15, this.y);
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
}


moverHorizontal(){

    this.x += this.velX;
}

gravidadeAbelha(){
  
  

}

colidiu(npc){
  return (
    /*
    this.x + this.largura < npc.x ||        //lado esquerdo
    this.x > npc.x + npc.largura ||         //lado direitw
    this.y + this.altura < npc.y ||         // em cima
    this.y > npc.y + npc.altura  
    */           //  abaixo 

    this.x + this.largura > npc.x && 
    this.y + this.altura > npc.y && 
    this.y < npc.y + npc.altura &&
    this.x < npc.x + npc.largura 
  );
}


moverVertical(){
  this.velY += this.gravidade;
  this.y += this.velY;
 
  if (keyIsDown(UP_ARROW)) {
    this.y += this.impulso;
    this.velY = 0;
  }
   if (this.y < 0) {
    this.y = 0;
    this.velY = 0;
  }
}

caiu(){
  return this.y > this.topoPlat - this.altura;
}


};







// function caiuAbelha(){
//   abelha.y < (height - plataforma.height);
//   abelhaCaiu = true;

// }

//direita
  // if (keyIsDown(RIGHT_ARROW)) {
    //this.x += this.vel;

 //esquerda
  //if (keyIsDown(LEFT_ARROW)) {
    //this.x -= this.vel;
 // }

 //gravidade - ok
 //colisão com os objetos
 //não ultrapassar a tela superior - ok